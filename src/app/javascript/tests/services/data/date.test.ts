import { test, expect } from "vitest";
import { dateFormat } from "@/services/data/date";

test("日付フォーマットができること", () => {
  const list = [
    ["2026-1-2 3:4:5", "all", "2026/01/02 (金) 03:04:05"],
    ["2026-1-2 3:4:5", "full", "2026/01/02 03:04:05"],
    ["2026-1-2 3:4:5", "date", "2026/01/02"],
  ];

  for (const row of list) {
    expect(dateFormat(new Date(row[0]), row[1])).toBe(row[2]);
  }
});