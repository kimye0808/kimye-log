"use client";
import classes from "./markdown-renderer.module.css";
import rehypeSanitize from "rehype-sanitize";
import { useAppSelector } from "@/lib/hooks";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useEffect, useRef, useState } from "react";
import "react-virtualized/styles.css";
import {
  WindowScroller,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  List,
  ListRowProps,
} from "react-virtualized";

export default function MarkdownRenderer() {
  const listRef = useRef<List | null>(null);
  const autoScrollRef = useRef<HTMLDivElement>(null);
  const contents = useAppSelector((state) => {
    return state.write.contents;
  });
  const lastLine = useAppSelector((state) => {
    return state.write.lastLine;
  });

  useEffect(() => {
    // 마지막 줄로 스크롤
    if (autoScrollRef.current) {
      autoScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [lastLine]); // contents가 변경될 때마다 스크롤

  const [parsedContents, setParsedContents] = useState([""]);
  useEffect(() => {
    // Markdown 내용을 파싱하여 블록으로 분할
    setParsedContents(parseMarkdown(contents));
  }, [contents]);

  const parseMarkdown = (markdown: string) => {
    const blocks: string[] = [];
    let isCodeBlock = false;
    let currentBlock = "";
    let currentLanguage = "";
    const lines = markdown.split("\n");
    lines.forEach((line) => {
      if (line.startsWith("```")) {
        if (isCodeBlock) {
          blocks.push("```" + currentLanguage + "\n" + currentBlock + "```\n");
          currentBlock = "";
          currentLanguage = "";
        } else {
          if (currentBlock) {
            blocks.push(currentBlock);
            currentBlock = "";
          }
          // 코드 블록이 열릴 때 언어 태그 파싱
          const languageMatch = line.match(/^```(.*)/);
          if (languageMatch && languageMatch[1]) {
            currentLanguage = languageMatch[1];
          }
        }
        isCodeBlock = !isCodeBlock;
      } else {
        if (isCodeBlock) {
          currentBlock += line + "\n";
        } else {
          currentBlock += line + "\n";
          blocks.push(currentBlock);
          currentBlock = "";
        }
      }
    });
    if (currentBlock) {
      blocks.push(currentBlock);
    }
    return blocks;
  };

  //security for XSS
  const rehypePlugins = [rehypeSanitize];

  console.log(parsedContents);
  //cache for preventing large re-redering
  const cache = new CellMeasurerCache({
    defaultWidth: 100,
    fixedWidth: true,
  });

  return (
    <div className={classes.box}>
      <div className={classes.wrapper}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={listRef}
              height={height}
              width={width}
              rowCount={parsedContents.length}
              overscanRowCount={3}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
              rowRenderer={({ index, key, parent, style }: ListRowProps) => {
                return (
                  <CellMeasurer
                    cache={cache}
                    parent={parent}
                    key={key}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    {({ registerChild, measure }) => {
                      // 이미지를 정규표현식으로 탐지
                      const isImage = /!\[.*\]\(.*\)/.test(
                        parsedContents[index]
                      );
                      return (
                        <div
                          style={style}
                          ref={(element): void => {
                            if (element && registerChild) {
                              return registerChild(element);
                            }
                          }}
                        >
                          {/* 이미지인 경우에만 measure 이벤트 추가 */}
                          {parsedContents[index] !== "\n" ? (
                            isImage ? (
                              <div onLoad={measure}>
                                <MarkdownEditor.Markdown
                                  source={parsedContents[index]}
                                  rehypePlugins={rehypePlugins}
                                />
                              </div>
                            ) : (
                              <MarkdownEditor.Markdown
                                source={parsedContents[index]}
                                rehypePlugins={rehypePlugins}
                              />
                            )
                          ) : (
                            <div>&nbsp;</div>
                          )}
                        </div>
                      );
                    }}
                  </CellMeasurer>
                );
              }}
            />
          )}
        </AutoSizer>

        <div ref={autoScrollRef}></div>
      </div>
    </div>
  );
}
