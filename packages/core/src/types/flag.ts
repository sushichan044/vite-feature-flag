import type { AnyZodObject, TypeOf } from "zod";

/**
 * Acceptable schema type for feature flag
 */
export type FlagSchema = AnyZodObject;

/**
 * Infer flag spec type from schema.
 */
export type InferFlagObject<T extends FlagSchema> = TypeOf<T>;

export type InferFlagKey<T extends FlagSchema> = keyof TypeOf<T>;
