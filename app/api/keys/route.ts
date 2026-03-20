import { NextRequest, NextResponse } from "next/server";
import { getSessionApp } from "../../../lib/session-app";
import { prisma } from "../../../lib/prisma";
import { generateApiKey, hashApiKey } from "../../../lib/api-auth";

// Get all API keys for current user
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionApp();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKeys = await prisma().apiKey.findMany({
      where: { userId: session.userId },
      select: {
        id: true,
        name: true,
        lastUsedAt: true,
        createdAt: true,
        // Never return the keyHash or actual key
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ apiKeys });
  } catch (error) {
    console.error("API keys fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

// Create a new API key
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionApp();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    // Generate new API key
    const plaintextKey = generateApiKey();
    const keyHash = hashApiKey(plaintextKey);

    // Store hashed key
    const apiKey = await prisma().apiKey.create({
      data: {
        userId: session.userId,
        keyHash,
        name: name || "Unnamed API Key",
      },
    });

    // Return the plaintext key (only shown once!)
    return NextResponse.json({
      id: apiKey.id,
      key: plaintextKey, // Only time this is returned
      name: apiKey.name,
      createdAt: apiKey.createdAt,
      warning: "Save this key securely. It will not be shown again.",
    });
  } catch (error) {
    console.error("API key creation error:", error);
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500 }
    );
  }
}
