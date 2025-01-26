import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: [
    "src/index.ts",
    "src/types/config.ts",
    "src/types/flag.ts",
  ],
  rollup: {
    emitCJS: true,
  },
});
