import type { UserConfig } from "./types/config";
import type { FlagSchema } from "./types/flag";
import type { ViteModeType } from "./types/vite";

export const defineConfig = <
  FLAG_SCHEMA extends FlagSchema,
  VITE_MODE extends ViteModeType,
>(
  config: UserConfig<FLAG_SCHEMA, VITE_MODE>,
) => config;
