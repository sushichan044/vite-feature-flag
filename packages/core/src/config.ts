import { loadConfig } from "c12";
import { isEmpty } from "es-toolkit/compat";

import type { UserConfig } from "./types/config";

import { DEFAULT_CONFIG_NAME } from "./constants/config";
import { isZodSchema } from "./utils/zod";

interface ResolveConfigOptions {
  /**
   * Config file name to be loaded.
   *
   * If not provided, it will try to load `vite-feature-flag.config.{extension}` file.
   */
  configFile: string;
}

export const resolveConfig = async (
  options: Partial<ResolveConfigOptions> = {},
) => {
  const { configFile } = options;

  const { config: loadedUserConfig } = await loadConfig<UserConfig>({
    configFile: configFile,
    jitiOptions: {
      // remove json
      extensions: [".js", ".mjs", ".cjs", ".ts", ".mts", ".cts"],
    },
    name: DEFAULT_CONFIG_NAME,
    omit$Keys: true,
    rcFile: false,
  });

  const config = loadedUserConfig ?? {};

  if (isEmpty(config)) {
    throw new Error(
      `❌ Missing config: unable to load config from ${configFile}`,
    );
  }

  if (!("schema" in config)) {
    throw new Error(
      "❌ Missing schema in config: what schema should we use to validate flags?",
    );
  }

  if (!isZodSchema(config.schema)) {
    throw new Error(
      `❌ Invalid schema in config: schema must be a Zod schema.`,
    );
  }

  if (!("flag" in config)) {
    throw new Error("❌ Missing flag in config: what flags should we use?");
  }

  const parsedFlag = await config.schema.safeParseAsync(config.flag);
  if (!parsedFlag.success) {
    throw new Error(
      `❌ Flag does not match schema: ${parsedFlag.error.toString()}`,
    );
  }

  return config;
};
