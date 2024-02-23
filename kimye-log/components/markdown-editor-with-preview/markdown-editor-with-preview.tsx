import StoreProvider from "@/app/StoreProvider";
import classes from "./markdown-editor-with-preview.module.css";

import PostEditor from "./post-editor";
import MarkdownRenderer from "./markdown-renderer";
import Publisher from "./publisher";
import PublisherModal from "./publisher-modal";

export default function MarkdownEditorWithPreview() {
  return (
    <section className={classes.section}>
      <div className={`${classes.container} container`}>
        <StoreProvider>
          <PostEditor />
          <MarkdownRenderer />
          <Publisher />
          <PublisherModal />
        </StoreProvider>
      </div>
    </section>
  );
}
