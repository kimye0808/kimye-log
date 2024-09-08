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
  const contents = useAppSelector((state) => {
    return state.write.contents;
  });

  /**
   *  contents를 markdown blocks로 parsing한다. code 블록에 초점을 맞춘다.
   *  prevParsedContents는 변경 전 parsedContents, 변경 index 체크용도
   *  isChanged는 onRowsRendered가 수시로 일어나는 것 방지용도
   *   ->내용 입력하지 않을때도 scroll이 가능하도록
   */
  const [parsedContents, setParsedContents] = useState([""]);
  const [prevParsedContents, setPrevParsedContents] = useState([""]);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    const newParsedContents = parseMarkdown(contents);
    setParsedContents((prevParsedContent) => {
      if (prevParsedContent.join("") !== newParsedContents.join("")) {
        setIsChanged(true);

        setPrevParsedContents(prevParsedContent);
        return newParsedContents;
      } else {
        setIsChanged(false);
        return prevParsedContent;
      }
    });
  }, [contents]);
  useEffect(() => {
    let timer: number;
    if (isChanged) {
      timer = window.setTimeout(() => {
        setIsChanged((prev) => !prev);
      }, 1000);
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [isChanged]);

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
                <MarkdownEditor.Markdown source={"&nbsp;"} />
              )}
            </div>
          );
        }}
      </CellMeasurer>
    );
  };

  /**
   *  계속 화면에 render되는 시작 index와 끝 index 기반
   *   화면에 안보이면 scroll
   */
  function onRowsRendered(startIndex: number, stopIndex: number) {
    if (!isChanged) return;
    if (listRef.current) {
      let changedIndex = parsedContents.findIndex(
        (content, index) => content !== prevParsedContents[index]
      );
      if (changedIndex !== -1) {
        if (!(changedIndex >= startIndex && changedIndex <= stopIndex))
          listRef.current.scrollToRow(changedIndex);
      }
    }
  }

  //security for XSS <- code highlighting error
  // const rehypePlugins = [rehypeSanitize];

  return (
    <article className={classes.box}>
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
              onRowsRendered={({ startIndex, stopIndex }) => {
                onRowsRendered(startIndex, stopIndex);
              }}
            />
          )}
        </AutoSizer>
      </div>
    </article>
  );
}
