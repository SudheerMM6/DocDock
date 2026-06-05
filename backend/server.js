import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import { validateRequiredEnvVars } from "./config/env.js";
import app from "./app.js";

const port = process.env.PORT || 4000;
const host = "0.0.0.0";

const startServer = async () => {
  try {
    validateRequiredEnvVars();
    await connectDB();
    await connectCloudinary();

    app.listen(port, host, () => console.log(`Server started on http://${host}:${port}`));
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();


