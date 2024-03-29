export const labels = {
  "ar-AE": "Arabic",
  "bg-BG": "Bulgarian",
  "bn-IN": "Bengali",
  "ca-ES": "Catalan",
  "cs-CZ": "Czech",
  "da-DK": "Danish",
  "de-DE": "German",
  "el-GR": "Greek",
  "en-AU": "English",
  "es-419": "Spanish (Latin)",
  "es-ES": "Spanish",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fr-FR": "French",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "ko-KR": "Korean",
  "lt-LT": "Lithuanian",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sk-SK": "Slovak",
  "sl-SI": "Slovenian",
  "sr-BA": "Bosnian",
  "sv-SE": "Swedish",
  "th-TH": "Thai",
  "tr-TR": "Turkish",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
};

export function createLocaleMap(locales: Array<keyof typeof labels>) {
  const map: Record<string, string> = {};

  for (const locale of locales) {
    map[locale] = labels[locale] ?? locale;
  }

  return map;
}

export function getSortedLabels(map: Record<keyof typeof labels, string>) {
  return Object.entries(map).sort(([_0, labelNameA], [_1, labelNameB]) =>
    labelNameA.localeCompare(labelNameB, "en")
  );
}
