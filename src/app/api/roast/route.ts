import { NextRequest, NextResponse } from "next/server";
import { getAiDebateAndReport } from "@/lib/roast-engine";

export async function POST(req: NextRequest) {
  try {
    const { inputs, followUps, settings } = await req.json();

    if (!inputs || !followUps) {
      return NextResponse.json({ error: "Missing required inputs or follow-up answers" }, { status: 400 });
    }

    const report = await getAiDebateAndReport(inputs, followUps, settings || { mode: "offline" });
    return NextResponse.json(report);
  } catch (e: any) {
    console.error("API error in /api/roast:", e);
    return NextResponse.json({ error: e.message || "Failed to run startup debate and roast" }, { status: 500 });
  }
}
