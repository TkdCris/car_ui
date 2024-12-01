export const phoneFormat = "(99) 9999-9999";
export const cellphoneFormat = "(99) 99999-9999";
export const cnpjFormat = "99.999.999/9999-99";
export const cpfFormat = "999.999.999-99";
export const birthdateFormat = "99/99/9999";
export const ieFormat = [
  "999.999.999",
  "999.999.999.999",
  "99.999.999.999.999",
]
export const imFormat = [
  "999.999.99",
  "999.999.999",
  "999.999.999-99",
]

export function numberToMaskFormat(value: string, pattern: string | string[]): string {
  const chars = value.split("");

  // Se o pattern for um array, seleciona o padrão mais adequado com base no comprimento
  const selectedPattern =
    Array.isArray(pattern)
      ? pattern.find((p) => p.replace(/[^9]/g, "").length >= value.length) || pattern[pattern.length - 1]
      : pattern;

  // Aplica o padrão selecionado
  return selectedPattern.replace(/9/g, () => chars.shift() || "");
}
