import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  HTTP_PORT: z.string().default("3000"),
  ME_CONFIG_MONGODB_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

const env = _env.data;

export default env;