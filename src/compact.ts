export function compact(text: string) {
    return text.replaceAll("\n", "").replaceAll("\t", "").replaceAll(" ", "");
}