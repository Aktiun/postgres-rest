'use strict';

const { Pool } = require('pg');
const config = require('./config.json');
const pg_types = require('pg-types')
const { invert } = require('lodash');
const connectionString = `postgresql://${config.pgUser}:${config.pgPassword}@${config.pgServer}:` +
  `${config.pgPort}/postgres`;
const pool = new Pool({
    connectionString: connectionString,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});
const regexDeny = new RegExp(
    '(?:^|\\W)' +
    '(update|delete|insert|create|revoke|grant|alter|drop)' +
    '(?:$|\\W)', 'i'
);

require('make-promises-safe'); // installs an 'unhandledRejection' handler
const fastify = require('fastify')({
    bodyLimit: 999999999,
    logger: true
});

fastify.register(require('fastify-cors'), {
    origin: '*'
});

fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
    try {
        let json = JSON.parse(body);

        done(null, json);
    } catch (err) {
        err.statusCode = 400;
        done(err, undefined);
    }
});

fastify.get('/schemas', async (request, reply) => {
    try {
        let client = await pool.connect();

        try {
            const res = await client.query('select distinct table_schema as schema ' +
            'from information_schema.tables ' +
            'where table_schema not in (\'pg_catalog\', \'information_schema\') ' +
			'and table_schema not like \'pg_toast%\''),
			schema = res.rows.map(r => {return {name: r.schema}}); // eslint-disable-line

            return JSON.stringify(schema);
        } catch (err) {
            console.log(err);
            return JSON.stringify(err);
        } finally {
            await client.release();
        }
    } catch (err) {
        console.log(err);
        return JSON.stringify(err);
    }
});

fastify.get('/schemas/:schema/tables', async (request, reply) => {
    try {
        let client = await pool.connect();
        let schema = request.params.schema;

        if (!schema) {
            reply.code(417).type('text/html').send('Expectation Failed. Schema is required.');
        }
        try {
            const res = await client.query('SELECT table_name FROM information_schema.tables ' +
				`WHERE table_schema=\'${schema}\';`),
				tables = res.rows.map(r => {return {name: r.table_name}}); // eslint-disable-line

            return JSON.stringify(tables);
        } catch (err) {
            console.log(err);
            return JSON.stringify(err);
        } finally {
            await client.release();
        }
    } catch (err) {
        console.log(err);
        return JSON.stringify(err);
    }
});

fastify.get('/schemas/:schema/tables/:table', async (request, reply) => {
    try {
        let client = await pool.connect(),
            schema = request.params.schema,
            table = request.params.table;

        if (!schema || !table) {
            reply.code(417).type('text/html').send('Expectation Failed. Schema and Table are required.');
        }

        try {
            const res = await client.query('SELECT column_name as name, data_type as type ' +
                `FROM information_schema.columns WHERE table_schema = '${schema}' and table_name = '${table}';`);

            return JSON.stringify({
                name: table,
                schema: {
                    type: 'struct',
                    fields: res.rows
                }
            });
        } catch (err) {
            console.log(err);
            return JSON.stringify(err);
        } finally {
            await client.release();
        }
    } catch (err) {
        console.log(err);
        return JSON.stringify(err);
    }
});

fastify.post('/query', async (request, reply) => {
    try {
        let client = await pool.connect(),
            query = request && request.body && request.body.query;

        if (!query) {
            reply.code(417).type('text/html').send('Expectation Failed. Query is required.');
            return null;
        }

        if (regexDeny.test(query)) {
            reply.code(403).type('text/html').send('Forbidden. Not allowed delete, insert, update, ' +
                'create, grant, etc.');
            return null;
        }

        try {
            const res = await client.query(query);
            const types = invert(pg_types.builtins);
            const schema = res.fields.map(f => {
              return { name: f.name, type: types[f.dataTypeID] }
            })

            return JSON.stringify({ data: res.rows, schema });
        } catch (err) {
            console.log(err);
            return JSON.stringify(err);
        } finally {
            await client.release();
        }
    } catch (err) {
        console.log(err);
        return JSON.stringify(err);
    }
});

const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
