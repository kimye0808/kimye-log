import React from "react";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import classes from "@/components/posts/post-detail/post-content.module.css";
import { Span } from "next/dist/trace";

// 커스텀 스타일
const customStyle = {
  'code[class*="language-"]': {
    display: "inline-block",
    backgroundColor: "var(--bg-inline-code)",
    fontSize: "95%",
    padding: "0.2em 0.4em",
    borderRadius: "3px",
  },
  'pre[class*="language-"]': {
    display: "inline",
  },
};

/**
 * md contents를 jsx로 변환하기 위한 용도
 */
const customComponents = {
  //markdown components의 img를 Image로 오버라이딩
  img(img: any) {
    const { src, alt } = img;
    console.log(src);
    return (
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className={classes.image}
      />
    );
  },

  //단락 전체를 이미지를 포함한 div 태그로 대체
  p(paragraph: any) {
    const { node } = paragraph;
    // console.log(node);
    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      return (
        <div>
          <Image
            className={classes.image}
            src={image.properties.src}
            alt={image.properties.alt}
            width={300}
            height={300}
          />
        </div>
      );
    }
    return <p>{paragraph.children}</p>;
  },

  /**
   * code내용을 syntaxhighlighter로 스타일 지정,
   * code 및 linenumber에서 span으로 보여줘서 block 스타일 inline으로 지정해야함
   */
  code(code: any) {
    const { className, children } = code;
    const isInline = className ? false : true;
    let language;
    if (!isInline) {
      language = className?.split("-")[1];
    }
    return (
      <code className={classes.code}>
        {isInline ? (
          <SyntaxHighlighter style={customStyle} PreTag="span">
            {children}
          </SyntaxHighlighter>
        ) : (
          <SyntaxHighlighter
            style={atomDark}
            language={language}
            showLineNumbers
            lineNumberContainerStyle={{ paddingRight: 0 }}
            lineNumberStyle={{ display: "inline" }}
          >
            {String(children)}
          </SyntaxHighlighter>
        )}
      </code>
    );
  },
};

export default customComponents;
