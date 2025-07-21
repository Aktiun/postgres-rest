CREATE OR REPLACE VIEW public."issueWorklogsView" AS
SELECT
 worklogs.author->>'active'                               AS "authorActive",
 worklogs.author->'avatarUrls'->>'32x32'                  AS "authorAvatar",
 worklogs.author->>'displayName'                          AS "authorName",
 worklogs.author->>'emailAddress'                         AS "emailAddress",
 worklogs.comment
         ->'content'->0
         ->'content'->0
         ->>'text'                                     AS comment,
 worklogs.started,
 worklogs.created,
 worklogs.updated,
 worklogs."timeSpent"                                     AS "timeSpent",
 worklogs."timeSpentSeconds"  / 3600.0                   AS "timeSpentHours"
FROM public.issue_worklogs AS worklogs