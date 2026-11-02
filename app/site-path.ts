// This preview is hosted below the existing GitHub Pages site.
export const previewBasePath = "/portfolio-preview";

export function sitePath(path: string): string {
  return `${previewBasePath}${path}`;
}
