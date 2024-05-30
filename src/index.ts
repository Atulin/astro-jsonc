import type { AstroIntegration, DataEntryType, HookParameters } from "astro";

type SetupHookParams = HookParameters<"astro:config:setup"> & {
	addDataEntryType: (dataEntryType: DataEntryType) => void;
};

export default function createIntegration(): AstroIntegration {
	return {
		name: "astro-jsonc",
		hooks: {
			"astro:config:setup": (params) => {
				const { addDataEntryType } = params as SetupHookParams;

				addDataEntryType({
					extensions: [".jsonc"],
					getEntryInfo: ({ contents }: { fileUrl: URL; contents: string }) => {
						const lines = contents.split(/\r?\n/).map((l) => l.trim());

						const newLines: string[] = [];
						let comment = false;

						for (const line of lines) {
							if (line.startsWith("//")) {
								continue;
							}
							if (line.startsWith("/*")) {
								comment = true;
								continue;
							}
							if (line.endsWith("*/")) {
								comment = false;
								continue;
							}
							if (comment) {
								continue;
							}
							newLines.push(line);
						}

						const clean = newLines.join("\n");

						const data = JSON.parse(clean);
						return {
							data,
							rawData: contents,
						};
					},
				});
			},
		},
	};
}
