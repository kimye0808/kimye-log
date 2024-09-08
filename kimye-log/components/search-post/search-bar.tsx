"use client";
import { useMemo, useState } from "react";
import classes from "./search-tags.module.css";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  /**
   * input change handler
   */
  const throttleInputChange = useMemo(
    () =>
      debounce((event) => router.push(`/posts?q=${event.target.value}`), 300),
    [router]
  );
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    if (event.target.value.trim() === "") {
      router.push("/posts");
    } else {
      throttleInputChange(event);
    }
  }

  /**
   * return
   */
  return (
    <>
      <div className={classes["search-bar"]}>
        <input
          type="text"
          placeholder="포스트를 검색하세요"
          value={searchQuery}
          onChange={handleChange}
        />
        <FiSearch size={20} color="grey" className={classes.icon} />
      </div>
    </>
  );
}
