export function getSafeReferrer(referrer: string): string {
  if (!referrer) {
    return "";
  }

  try {
    const url = new URL(referrer);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "";
    }

    return `${url.origin}${url.pathname}`.slice(0, 2000);
  } catch {
    return "";
  }
}
