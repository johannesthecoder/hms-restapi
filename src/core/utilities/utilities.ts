export const datetimeString = (
  date: Date = new Date(),
  style: "full" | "long" | "medium" | "short" = "medium"
): string => date.toLocaleString("en-US", { dateStyle: style, timeStyle: style, hour12: false });

export const timeStampString = (date: Date = new Date()): number => date.getTime();
