import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import "@total-typescript/ts-reset";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
