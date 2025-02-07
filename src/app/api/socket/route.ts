// app/api/sales/route.ts
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  let intervalId: NodeJS.Timeout;

  // Create a ReadableStream to send SSE data
  const stream = new ReadableStream({
    start(controller) {
      // Send a sale record every 5 seconds
      intervalId = setInterval(() => {
        const sale = {
          id: Math.floor(Math.random() * 10000),
          item: ["Laptop", "Phone", "Tablet", "Headphones", "Monitor"][Math.floor(Math.random() * 5)],
          quantity: Math.floor(Math.random() * 5) + 1,
          price: (Math.random() * 1000).toFixed(2),
          timestamp: new Date().toLocaleString(),
        };

        // Format the data as an SSE message
        const data = `data: ${JSON.stringify(sale)}\n\n`;
        controller.enqueue(encoder.encode(data));
      }, 1000);
    },
    cancel() {
      // When the stream is cancelled (e.g. client disconnects), clear the interval
      clearInterval(intervalId);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
}
