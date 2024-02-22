import StoreProvider from "@/app/StoreProvider";
import classes from "./live-editor.module.css";

import MarkdownEditor from "./markdown-editor";
import MarkdownRenderer from "./markdown-renderer";
import Publisher from "./publisher";

export default function LiveEditor() {
  return (
    <section className={classes.section}>
      <div className={`${classes.container} container`}>
        <StoreProvider>
          <MarkdownEditor />
          <MarkdownRenderer />
        </StoreProvider>
      </div>
      <Publisher />
    </section>
  );
}
