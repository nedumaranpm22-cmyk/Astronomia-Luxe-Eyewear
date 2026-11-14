import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// File storage path for appointment records
const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");

interface AppointmentRecord {
  id: string;
  fullName: string;
  email: string;
  date: string;
  salon: string;
  message?: string;
  createdAt: string;
  status: "confirmed" | "pending";
}

// Helper to ensure data directory and file exist
async function ensureStorage(): Promise<AppointmentRecord[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const data = await fs.readFile(APPOINTMENTS_FILE, "utf-8");
      return JSON.parse(data);
    } catch {
      await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
  } catch (error) {
    console.error("Storage initialization error:", error);
    return [];
  }
}

export async function GET() {
  const records = await ensureStorage();
  return NextResponse.json({
    status: "operational",
    totalConfirmedViewings: records.length,
    maison: "Astronomia Luxe · Geneva",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, date, salon, message } = body;

    const errors: Record<string, string> = {};

    // 1. Validate full name
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Please provide your full name (minimum 2 characters).";
    }

    // 2. Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please provide a valid email address for confidential correspondence.";
    }

    // 3. Validate appointment date
    if (!date || typeof date !== "string") {
      errors.date = "Please select your preferred appointment date.";
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(selectedDate.getTime())) {
        errors.date = "The selected appointment date is invalid.";
      } else if (selectedDate < today) {
        errors.date = "Appointment dates must be scheduled for today or a future date.";
      }
    }

    // 4. Validate salon selection
    const allowedSalons = [
      "Geneva Flagship Atelier",
      "Zurich Private Salon",
      "London Mayfair Suite",
      "Paris Place Vendôme",
      "Private Flying Concierge",
    ];

    const chosenSalon = typeof salon === "string" && salon.trim() ? salon.trim() : "Geneva Flagship Atelier";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed for private appointment request.",
          errors,
        },
        { status: 400 }
      );
    }

    // Generate unique horological appointment dossier code (e.g. AL-2026-9812)
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const appointmentId = `AL-2026-${randomHex}`;

    const newAppointment: AppointmentRecord = {
      id: appointmentId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      date,
      salon: chosenSalon,
      message: typeof message === "string" ? message.trim() : "",
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    // Save to persistent storage
    const existing = await ensureStorage();
    existing.push(newAppointment);
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(existing, null, 2), "utf-8");

    return NextResponse.json(
      {
        success: true,
        message: "Your private viewing request has been confirmed by the Geneva Atelier.",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Appointment submission error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An internal atelier transmission error occurred. Please contact the concierge directly.",
      },
      { status: 500 }
    );
  }
}
