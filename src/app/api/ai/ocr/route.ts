import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { imageBase64, provider, apiKey } = await req.json();

    if (!imageBase64 || !apiKey) {
      return NextResponse.json({ error: "Missing image or API key" }, { status: 400 });
    }

    const systemPrompt = `You are a receipt parsing assistant. Extract the following from the receipt image: 
    - merchant (string)
    - amount (number)
    - tax (number)
    - category (string, choose from: 'API Costs', 'SaaS Hosting', 'Office Rent', 'Meals', 'Travel', 'Other')
    Return ONLY a valid JSON object with these keys. No markdown formatting.`;

    if (provider === 'gemini') {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: systemPrompt },
              { inline_data: { mime_type: "image/jpeg", data: imageBase64.split(',')[1] || imageBase64 } }
            ]
          }],
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
            {
              role: "user",
              content: [
                { type: "text", text: systemPrompt },
                { type: "image_url", image_url: { url: imageBase64.includes('data:image') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}` } }
              ]
            }
          ]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      const result = JSON.parse(data.choices[0].message.content);
      return NextResponse.json(result);
    }
  } catch (error: any) {
    console.error("OCR API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process image" }, { status: 500 });
  }
}
