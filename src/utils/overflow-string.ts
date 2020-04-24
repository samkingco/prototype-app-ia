export function overflowString(string: string, maxLength: number) {
  return string.length > maxLength
    ? `${string.slice(0, maxLength - 2)}…`
    : string;
}
