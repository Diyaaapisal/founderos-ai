import { NextRequest, NextResponse } from "next/server";
import { getAiFollowUpQuestions } from "@/lib/roast-engine";

export async function POST(req: NextRequest) {
  try {
    const { inputs, settings } = await req.json();

    if (!inputs) {
      return NextResponse.json({ error: "Missing inputs in request body" }, { status: 400 });
    }

    const questions = await getAiFollowUpQuestions(inputs, settings || { mode: "offline" });
    return NextResponse.json(questions);
  } catch (e: any) {
    console.error("API error in /api/questions:", e);
    return NextResponse.json({ error: e.message || "Failed to generate follow-up questions" }, { status: 500 });
  }
}
