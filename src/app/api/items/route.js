// src/app/api/items/route.js
import clientPromise from "@/utils/db";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("simple_rest_api");
  const items = await db.collection("items").find({}).toArray();

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const { id, name, quantity, description } = await request.json();

  const client = await clientPromise;
  const db = client.db("simple_rest_api");
  await db.collection("items").insertOne({ id, name, quantity, description });

  return new Response(JSON.stringify({ message: "Item added!" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request) {
  const { id, name, quantity, description } = await request.json();

  const client = await clientPromise;
  const db = client.db("simple_rest_api");
  await db.collection("items").updateOne(
    { id },
    { $set: { name, quantity, description } }
  );

  return new Response(JSON.stringify({ message: "Item updated!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request) {
  const { id } = await request.json();

  const client = await clientPromise;
  const db = client.db("simple_rest_api");
  await db.collection("items").deleteOne({ id });

  return new Response(JSON.stringify({ message: "Item deleted!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
