# @angius/astro-jsonc

This is a very simple Astro Integration to allow you to use JSON with comments files as `data` collections.

## Quick Installation

```sh
# global
astro add @angius/astro-jsonc
# or npm
npx astro add @angius/astro-jsonc
# or yarn
yarn dlx astro add @angius/astro-jsonc
# or pnpm
pnpm dlx astro add @angius/astro-jsonc
# or bun
bunx astro add @angius/astro-jsonc
```

## Manual Installation

First, install the `@angius/astro-jsonc` package using your package manager.

```sh
# or npm
npm install @angius/astro-jsonc
# or yarn
yarn add @angius/astro-jsonc
# or pnpm
pnpm add @angius/astro-jsonc
# or bun
bun i @angius/astro-jsonc
```

Next, add the integration to your `astro.config.*` file. There is currently no set of configuration options.

```typescript
import { defineConfig } from "astro/config";
import jsonc from "@angius/astro-jsonc";

export default defineConfig({
  // ...
  integrations: [jsonc()],
});
```

## Usage

JSON with comment files can only be used within content collections of the `data` type. Add entries to any content collection using the .jsonc extension:

```
src/content/my-stuff/
  data-1.jsonc
  data-2.jsonc
```

Define a collection and its schema in your `content/config.ts` file.

```typescript
import { z, defineCollection } from "astro:content";

const jsoncCollection = defineCollection({
  // MUST BE 'data'. 'content' will not work.
  type: "data",
  // Schema must match what is in your TOML files.
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = {
  // ...
  'my-stuff': jsoncCollection,
};
```

```astro
---
import { getEntryBySlug } from 'astro:content';

const entry = await getEntryBySlug('my-stuff', 'data-1');
---

<!--Access frontmatter properties with `data`-->
<h1>{entry.data.title}</h1>
```
