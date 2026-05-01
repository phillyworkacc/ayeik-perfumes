import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const subscribersTable = pgTable("subscribers", {
   id: serial("id").primaryKey(),
   subscriberId: text("subscriber_id").notNull(),
   email: text("email").notNull(),
   phoneNumber: text("phone_number").notNull(),
   dateJoined: text("date_joined").notNull(),
});

export const automationsTable = pgTable("automations", {
   id: serial("id").primaryKey(),
   automationId: text("automation_id").notNull(),
   welcomeText: text("welcome_text").notNull(),
});

export const campaignsTable = pgTable("campaigns", {
   id: serial("id").primaryKey(),
   campaignId: text("sms_campaign_id").notNull(),
   name: text("name").notNull(),
   message: text("message").notNull(),
   sent: boolean("sent").notNull(),
   sentOn: text("sent_on"),
   dateCreated: text("date_created").notNull(),
});
