import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle POST request (save hospital data)
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Save to MongoDB using Prisma
    const hospital = await prisma.hospital.create({
      data,
    });

    return NextResponse.json(hospital, { status: 201 });
  } catch (error) {
    console.error("Error saving hospital:", error);
    return NextResponse.json(
      { error: "Failed to save hospital data" },
      { status: 500 }
    );
  }
}
