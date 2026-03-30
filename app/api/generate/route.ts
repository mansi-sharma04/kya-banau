import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

const prompt = `
You are an Indian nutrition expert.

STRICT RULES:
- Only Indian food
- Match region
- Easy home recipes
- Do NOT leave any field empty
- Return ONLY valid JSON (no text)

Format EXACTLY like this:

{
  "monday": {
    "breakfast": { "name": "poha", "recipe": "cook poha with onions and spices" },
    "lunch": { "name": "dal roti", "recipe": "make dal and serve with roti" },
    "dinner": { "name": "vegetable khichdi", "recipe": "cook rice with dal and vegetables" },
    "snacks": { "name": "fruit salad", "recipe": "mix seasonal fruits" }
  },
  "tuesday": {
    "breakfast": { "name": "", "recipe": "" },
    "lunch": { "name": "", "recipe": "" },
    "dinner": { "name": "", "recipe": "" },
    "snacks": { "name": "", "recipe": "" }
  },
  "wednesday": {
    "breakfast": { "name": "", "recipe": "" },
    "lunch": { "name": "", "recipe": "" },
    "dinner": { "name": "", "recipe": "" },
    "snacks": { "name": "", "recipe": "" }
  },
  "thursday": {
    "breakfast": { "name": "", "recipe": "" },
    "lunch": { "name": "", "recipe": "" },
    "dinner": { "name": "", "recipe": "" },
    "snacks": { "name": "", "recipe": "" }
  },
  "friday": {
    "breakfast": { "name": "", "recipe": "" },
    "lunch": { "name": "", "recipe": "" },
    "dinner": { "name": "", "recipe": "" },
    "snacks": { "name": "", "recipe": "" }
  },
  "saturday": {
    "breakfast": { "name": "", "recipe": "" },
    "lunch": { "name": "", "recipe": "" },
    "dinner": { "name": "", "recipe": "" },
    "snacks": { "name": "", "recipe": "" }
  },
  "sunday": {
    "breakfast": { "name": "", "recipe": "" },
    "lunch": { "name": "", "recipe": "" },
    "dinner": { "name": "", "recipe": "" },
    "snacks": { "name": "", "recipe": "" }
  }
}

User:
Age: ${body.age}
Weight: ${body.weight}
Height: ${body.height}
Disease: ${body.disease}
Food Preference: ${body.preference}
Region: ${body.region}
`;

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content || "";

    return Response.json({
      result: text,
    });

  } catch (error: any) {
    console.error("API ERROR:", error);

    return Response.json({
      result: JSON.stringify({
        breakfast: { name: "Error", recipe: "Try again" },
        lunch: { name: "Error", recipe: "Try again" },
        dinner: { name: "Error", recipe: "Try again" },
        snacks: { name: "Error", recipe: "Try again" },
      }),
    });
  }
}