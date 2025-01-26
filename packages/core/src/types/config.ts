import type { FlagSchema, InferFlagObject } from "./flag";
import type { ViteModeType } from "./vite";

export interface UserConfig<
  FLAG_SCHEMA extends FlagSchema = FlagSchema,
  VITE_MODE extends ViteModeType = ViteModeType,
> {
  /**
   * Feature flag spec to each Vite Mode
   *
   */
  // We expect `VITE_MODE` to be inferred from `viteMode` arg, so we use `NoInfer` to prevent the inference from key of `flag`.
  flag: Record<NoInfer<VITE_MODE>, InferFlagObject<FLAG_SCHEMA>>;
  /**
   * Zod schema of feature flag
   */
  schema: FLAG_SCHEMA;
  /**
   * Vite Mode to be used as environment in feature flag
   *
   * @see
   * {@link https://vite.dev/guide/env-and-mode#modes}
   * @default
   * ["development", "production"]
   */
  viteMode: VITE_MODE[];
}
