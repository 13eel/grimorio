import { z } from "zod";

const EditionEnum = z.enum(["tb", "bmr", "snv", "special"]);

export const Role = z.object({
  id: z.string(),
  edition: EditionEnum.optional(),
});

export type Role = z.infer<typeof Role>;
