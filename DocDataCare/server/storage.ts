import { type User, type InsertUser, type Patient, type InsertPatient } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Patient operations
  getPatient(id: string): Promise<Patient | undefined>;
  getAllPatients(): Promise<Patient[]>;
  createPatient(patient: InsertPatient): Promise<Patient>;
  updatePatient(id: string, patient: Partial<InsertPatient>): Promise<Patient | undefined>;
  deletePatient(id: string): Promise<boolean>;
  searchPatients(query: string): Promise<Patient[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private patients: Map<string, Patient>;

  constructor() {
    this.users = new Map();
    this.patients = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPatient(id: string): Promise<Patient | undefined> {
    return this.patients.get(id);
  }

  async getAllPatients(): Promise<Patient[]> {
    return Array.from(this.patients.values()).sort((a, b) => {
      // Sort by visit date (newest first), then by name
      if (a.visitDate && b.visitDate) {
        return new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime();
      }
      return a.name.localeCompare(b.name);
    });
  }

  async createPatient(insertPatient: InsertPatient): Promise<Patient> {
    const id = randomUUID();
    const patient: Patient = { 
      ...insertPatient, 
      id,
      contactNumber: insertPatient.contactNumber || null,
      visitDate: insertPatient.visitDate || null,
      followupDate: insertPatient.followupDate || null,
      prescriptionTreatment: insertPatient.prescriptionTreatment || null,
      dose: insertPatient.dose || null,
      fee: insertPatient.fee || null,
    };
    this.patients.set(id, patient);
    return patient;
  }

  async updatePatient(id: string, patientData: Partial<InsertPatient>): Promise<Patient | undefined> {
    const existingPatient = this.patients.get(id);
    if (!existingPatient) {
      return undefined;
    }
    
    const updatedPatient: Patient = { ...existingPatient, ...patientData };
    this.patients.set(id, updatedPatient);
    return updatedPatient;
  }

  async deletePatient(id: string): Promise<boolean> {
    return this.patients.delete(id);
  }

  async searchPatients(query: string): Promise<Patient[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.patients.values()).filter(patient =>
      patient.name.toLowerCase().includes(lowercaseQuery) ||
      patient.contactNumber?.toLowerCase().includes(lowercaseQuery) ||
      patient.diseaseSymptoms.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();
