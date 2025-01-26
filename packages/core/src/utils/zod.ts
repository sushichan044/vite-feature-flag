import { ZodSchema } from "zod";

export const isZodSchema = (input: unknown): input is ZodSchema =>
  input instanceof ZodSchema;
