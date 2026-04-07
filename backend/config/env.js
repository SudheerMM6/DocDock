const REQUIRED_ENV_VARS = [
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "MONGO_URI",
  "CLOUDINARY_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_SECRET_KEY",
  "KEY_ID",
  "KEY_SECRET",
  "CURRENCY",
];

const getMissingEnvVars = () =>
  REQUIRED_ENV_VARS.filter((key) => !process.env[key] || !String(process.env[key]).trim());

const validateRequiredEnvVars = () => {
  const missing = getMissingEnvVars();

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(
        ", "
      )}. Add them to backend/.env before starting the server.`
    );
  }
};

const getCorsOrigins = () => {
  const raw = process.env.CORS_ORIGIN;
  if (!raw) return [];

  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export { REQUIRED_ENV_VARS, validateRequiredEnvVars, getCorsOrigins };
