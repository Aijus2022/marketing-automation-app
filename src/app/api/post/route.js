export async function POST(req) {
    const content = await req.json();
    const status = { platform: "Twitter", status: "Success", content };
    return new Response(JSON.stringify(status), { status: 200 });
  }
  
