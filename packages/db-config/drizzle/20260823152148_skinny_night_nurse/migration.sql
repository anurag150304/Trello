CREATE TABLE "organisations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "organisations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(30) NOT NULL,
	"website" varchar(20),
	"created_by" integer NOT NULL,
	"creared_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fisrtname" varchar(30) NOT NULL,
	"lastname" varchar(30),
	"email" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
