import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database connected"));
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  const hasDatabaseName = new URL(mongoUri).pathname.replace("/", "").length > 0;
  await mongoose.connect(hasDatabaseName ? mongoUri : `${mongoUri}/docdock`);
};

export default connectDB
