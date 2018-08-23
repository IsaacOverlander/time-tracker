CREATE TABLE "entries" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"date" VARCHAR(15) NOT NULL,
	"time" INTEGER NOT NULL
);

INSERT INTO "entries" ("task", "date", "time")
VALUES ('created entries table', '8/24/2018', '30');