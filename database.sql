CREATE TABLE "entries" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"date" VARCHAR(15) NOT NULL,
	"hours" INTEGER NOT NULL,
	"minutes" INTEGER NOT NULL
);

CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50),
	"date_id"
);

INSERT INTO "projects" ("name")
VALUES('Time Tracker');

INSERT INTO "entries" ("task", "date", "time")
VALUES ('created entries table', '8/24/2018', '30');

SELECT * FROM "entries" JOIN "projects" ON "projects"."id" = "entries"."project_id";
DELETE FROM "entries" WHERE "id" = 23;

SELECT "projects"."name", "entries"."project_id", SUM("entries"."hours") as hours, SUM("entries"."minutes") as minutes FROM "entries"
JOIN "projects" ON "projects"."projectid" = "entries"."project_id" GROUP BY "projects"."name";