import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { NODE_ENV, PORT, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, COMPANY_NAME } =
  process.env;
