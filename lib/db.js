import mongoose from "mongoose";

const connString = process.env.MONGODB_URI;

if (!connString) {
  throw new Error("MONGODB_URI is missing in environment variables.");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    console.log("Using existing MongoDB connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then((mongoose) => {
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        console.log(`Connected to Database: ${mongoose.connection.name}`);
        return mongoose;
      })
      .catch((err) => {
        console.error(`MongoDB Connection Error: ${err.message}`);
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
