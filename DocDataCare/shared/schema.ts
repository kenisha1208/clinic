import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const patients = pgTable("patients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  contactNumber: text("contact_number"),
  visitDate: text("visit_date"),
  followupDate: text("followup_date"),
  diseaseSymptoms: text("disease_symptoms").notNull(),
  prescriptionTreatment: text("prescription_treatment"),
  dose: text("dose"),
  fee: decimal("fee", { precision: 10, scale: 2 }),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPatientSchema = createInsertSchema(patients).omit({
  id: true,
}).extend({
  name: z.string().min(1, "Patient name is required"),
  age: z.number().min(1, "Age must be greater than 0").max(150, "Age must be less than 150"),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),
  contactNumber: z.string().optional(),
  visitDate: z.string().optional(),
  followupDate: z.string().optional(),
  diseaseSymptoms: z.string().min(1, "Disease/Symptoms description is required"),
  prescriptionTreatment: z.string().optional(),
  dose: z.string().optional(),
  fee: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Patient = typeof patients.$inferSelect;
export type InsertPatient = z.infer<typeof insertPatientSchema>;
