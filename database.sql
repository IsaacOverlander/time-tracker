-- entries queries
CREATE TABLE "entries" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"date" VARCHAR(15) NOT NULL,
	"time" INTEGER NOT NULL
);

INSERT INTO "entries" ("task", "date", "time")
VALUES ('created entries table', '8/24/2018', '30');

SELECT * FROM "entries";

DELETE FROM "entries" WHERE "id" = 1;

-- projects queries
CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50)
);

INSERT INTO "projects" ("name")
VALUES('Time Tracker');