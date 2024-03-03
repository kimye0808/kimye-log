/**
 *  포스트 본문을 150자 내로 알아서 요약
 */
export function makeSummary(contents: string) {
  let pureText = contents.replace(/```[^```]*```/g, "");
  pureText = pureText.replace(/`[^`]*`/g, "");
  pureText = pureText.replace(/\[.*?\]\(.*?\)/g, "");
  pureText = pureText.replace(/^>\s+.+/gm, "");
  pureText = pureText.replace(/^\d+\.\s+.+/gm, "");
  pureText = pureText.replace(/^- \[ \].+/gm, "");
  pureText = pureText.replace(/^- \[x\].+/gm, "");
  pureText = pureText.replace(/^\|.*?\|$/gm, "");
  pureText = pureText.replace(/^#+\s+.+/gm, "");
  pureText = pureText.replace(/!\[.*?\]\(.*?\)/g, "");
  pureText = pureText.replace(/\*\*[^*]*\*\*/g, "");
  pureText = pureText.replace(/\*[^*]*\*/g, "");
  pureText = pureText.replace(/~~[^~]*~~/g, "");
  pureText = pureText.trim();
  return pureText.substring(0, 150);
}
