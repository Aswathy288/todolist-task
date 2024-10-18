// src/utils/db.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development to preserve the MongoClient
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
