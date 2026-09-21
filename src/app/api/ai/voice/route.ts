import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { transcript, provider, apiKey } = await req.json();

    if (!transcript || !apiKey) {
      return NextResponse.json({ error: "Missing transcript or API key" }, { status: 400 });
    }

    const systemPrompt = `You are an expense parsing assistant for a group. Extract the following from the transcribed voice note: 
    - desc (string: short description of what was bought)
    - amount (number: total cost)
    - paidBy (string: name of the person who paid, if not clear default to "Alice")
    - category (string: choose from: 'API Costs', 'SaaS Hosting', 'Office Rent', 'Meals', 'Travel', 'Other')
    Return ONLY a valid JSON object with these exact keys. No markdown formatting.`;

    if (provider === 'gemini') {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + "\\n\\nTranscript: " + transcript }] }],
          generationConfig: { response_mime_type: "application/json" }
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      const parsedText = data.candidates[0].content.parts[0].text;
      const result = JSON.parse(parsedText);
      return NextResponse.json(result);

    } else {
      // Default to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: transcript }
          ]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      const result = JSON.parse(data.choices[0].message.content);
      return NextResponse.json(result);
    }
  } catch (error: any) {
    console.error("Voice NLP API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process transcript" }, { status: 500 });
  }
}
