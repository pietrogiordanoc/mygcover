export const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type UtmParams = Record<(typeof utmKeys)[number], string>;

export const emptyUtmParams: UtmParams = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

const STORAGE_KEY = "mygcover-utm";

function readStoredUtmParams(): UtmParams {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...emptyUtmParams };
    }

    const parsed = JSON.parse(stored) as Partial<UtmParams>;
    return utmKeys.reduce(
      (params, key) => ({ ...params, [key]: typeof parsed[key] === "string" ? parsed[key] : "" }),
      { ...emptyUtmParams },
    );
  } catch {
    return { ...emptyUtmParams };
  }
}

// Captura los UTM presentes en la URL actual y los fusiona con los ya guardados en la sesión,
// para que se conserven aunque el usuario navegue sin volver a incluirlos en la URL.
export function captureUtmParams(search: string): UtmParams {
  const currentUtmParams = readStoredUtmParams();
  const urlParams = new URLSearchParams(search);
  let hasNewUtmParams = false;

  for (const key of utmKeys) {
    const value = urlParams.get(key);
    if (value) {
      currentUtmParams[key] = value;
      hasNewUtmParams = true;
    }
  }

  if (hasNewUtmParams) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentUtmParams));
  }

  return currentUtmParams;
}
