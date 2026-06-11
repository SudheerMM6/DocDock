import express from "express";
import cors from "cors";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import { getCorsOrigins } from "./config/env.js";

const app = express();
const corsOrigins = getCorsOrigins();

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if ((process.env.NODE_ENV !== "production" && corsOrigins.length === 0) || corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (_req, res) => {
  res.send("DocDock API is running");
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

export default app;
