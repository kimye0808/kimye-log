import SignIn from "@/components/signin/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Software Engineer Kimye0808's Development Blog",
};

export default function SignInPage() {
  return (
    <main>
      <article>
        <SignIn />
      </article>
    </main>
  );
}
