import { ZodType } from "zod";

export interface PageHead {
  title?: string;
  description?: string;
  favicon?: string;
  [key: string]: any;
}

export interface PageOptions<T extends PageHead = PageHead> {
  head?: T;
  ui: () => UIElement;
  headSchema?: ZodType<T>;
}

export function Page<T extends PageHead = PageHead>(
  options: PageOptions<T>
): {
  head: T;
  ui: () => UIElement;
};
