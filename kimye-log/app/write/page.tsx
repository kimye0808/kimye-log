import MarkdownEditorWithPreview from "@/components/markdown-editor-with-preview/markdown-editor-with-preview";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write",
  description: "Software Engineer Kimye0808's Development Blog",
};

export default async function WritePostPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  } else {
    if (session.user?.name !== "kimye0808") {
      redirect("/signin");
    }
  }

  return (
    <>
      <main>
        <article>
          <MarkdownEditorWithPreview />
        </article>
      </main>
    </>
  );
}
