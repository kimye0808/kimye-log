import Markdown from "react-markdown";
import Image from "next/image";
import customComponents from "@/components/common/customComponents";
import classes from "./post-content.module.css";

interface PostContetType {
  slug: string;
  image: string;
  content: string;
}

export default function PostContent({ slug, image, content }: PostContetType) {
  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <>
      <section className={`${classes.section} section`}>
        <div className={`${classes.container} container`}>
          {image && (
            <Image
              className={classes.image}
              src={imagePath}
              alt={`${slug} image`}
              width={300}
              height={300}
            />
          )}
          <Markdown components={customComponents}>{content}</Markdown>
        </div>
      </section>
    </>
  );
}
