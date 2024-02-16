import React from "react";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import classes from "@/components/posts/post-detail/post-content.module.css";

/**
 * md contents를 jsx로 변환하기 위한 용도
 */
const customComponents = {
  //markdown components의 img를 Image로 오버라이딩
  img(img: any) {
    const { src, alt } = img;
    return <Image src={src} alt={alt} width={600} height={300} />;
  },

  //단락 전체를 이미지를 포함한 div 태그로 대체
  p(paragraph: any) {
    const { node } = paragraph;
    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      return (
        <div className={classes.image}>
          <Image
            src={image.properties.src}
            alt={image.properties.alt}
            width={600}
            height={300}
          />
        </div>
      );
    }
    return <p>{paragraph.children}</p>;
  },

  //code내용을 syntaxhighlighter로 스타일 지정
  code(code: any) {
    const { className, children } = code;
    const language = className.split("-")[1];
    return (
      <SyntaxHighlighter style={atomDark} language={language}>
        {children}
      </SyntaxHighlighter>
    );
  },
};

export default customComponents;
