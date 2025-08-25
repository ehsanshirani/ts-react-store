export const shortenTiTle = (title: string | null | undefined): string => {
  if (typeof title === "string" && title.length > 0) {
    return title.split(" ").slice(0, 3).join(" ");
  }
  return "";
};

export const shortenDesc = (
  text: string | null | undefined,
  maxLength = 30
): string => {
  if (typeof text === "string" && text.length > 0) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }
  return "";
};
