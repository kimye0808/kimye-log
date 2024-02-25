"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import classes from "./singin.module.css";
import { FaGithub } from "react-icons/fa";
import { redirect } from "next/navigation";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function SignIn() {
  const { data: session } = useSession();
  // const router = useRouter();

  if (session) {
    redirect("/");
  } else {
    return (
      <>
        <section className={`${classes.section} `}>
          <div className={classes.wrapper}>
            <FaGithub size={100} />
            <h2>Sign in with Github</h2>
            <div className={classes["button-wrapper"]}>
              <button
                className={`${classes.submit} btn btn-secondary`}
                onClick={() => signIn("github")}
              >
                submit
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }
}
