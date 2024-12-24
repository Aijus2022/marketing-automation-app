export async function GET(req) {
    // Simulate fetching analytics data
    const data = {
      users: 120,
      posts: 45,
      likes: 300,
    };
  
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  
