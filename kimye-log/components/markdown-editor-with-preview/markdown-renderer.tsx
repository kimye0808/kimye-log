"use client";
import classes from "./markdown-renderer.module.css";
// import rehypeSanitize from "rehype-sanitize";
import { useAppSelector } from "@/lib/hooks";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useEffect, useRef, useState } from "react";
import "react-virtualized/styles.css";
import {
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
  }, [lastLine]);

  /**
   *  contents를 markdown blocks로 parsing한다. code 블록에 초점을 맞춘다.
   */
  const [parsedContents, setParsedContents] = useState([""]);
  useEffect(() => {
    setParsedContents(parseMarkdown(contents));
  }, [contents]);

  const parseMarkdown = (markdown: string) => {
    const blocks: string[] = [];
    let isCodeBlock = false;
    let currentBlock = "";
    let currentCodeLanguage = "";
    const lines = markdown.split("\n");
    lines.forEach((line) => {
      if (line.startsWith("```")) {
        if (isCodeBlock) {
          blocks.push(
            "```" + currentCodeLanguage + "\n" + currentBlock + "```\n"
          );
          currentBlock = "";
          currentCodeLanguage = "";
        } else {
          if (currentBlock) {
            blocks.push(currentBlock);
            currentBlock = "";
          }
          const languageMatch = line.match(/^```(.*)/);
          if (languageMatch && languageMatch[1]) {
            currentCodeLanguage = languageMatch[1];
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

  //cache for preventing large re-redering 무분별한 사이즈 재측정 방지
  const cache = new CellMeasurerCache({
    defaultWidth: 100,
    fixedWidth: true,
  });
  /**
   *  범위로 정해진 부분만 보여주고 virtualized
   *  row 줄 하나
   *  parsedContents 블록 단위로 자동으로 사이즈 측정해서 Markdown Preview로 보냄
   *  이미지는 로드되면 다시 사이즈 측정
   */
  const renderRow = ({ index, key, parent, style }: ListRowProps) => {
    return (
      <CellMeasurer
        cache={cache}
        parent={parent}
        key={key}
        columnIndex={0}
        rowIndex={index}
      >
        {({ registerChild, measure }) => {
          const isImage = /!\[.*\]\(.*\)/.test(parsedContents[index]);
          return (
            <div
              style={style}
              ref={(element): void => {
                if (element && registerChild) {
                  return registerChild(element);
                }
              }}
            >
              {parsedContents[index] !== "\n" ? (
                isImage ? (
                  <div onLoad={measure}>
                    <MarkdownEditor.Markdown
                      source={parsedContents[index]}
                      // rehypePlugins={rehypePlugins}
                    />
                  </div>
                ) : (
                  <MarkdownEditor.Markdown
                    source={parsedContents[index]}
                    // rehypePlugins={rehypePlugins}
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
  };

  //security for XSS <- code highlighting error
  // const rehypePlugins = [rehypeSanitize];

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
              rowRenderer={renderRow}
            />
          )}
        </AutoSizer>

        <div ref={autoScrollRef}></div>
      </div>
    </div>
  );
}
