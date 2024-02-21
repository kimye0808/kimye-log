"use client";
import { useEffect, useState } from "react";
import classes from "./search-tags.module.css";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  /**
   * input change handler
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    if (event.target.value.trim() === "") {
      router.push("/posts");
    } else {
      router.push(`/posts?q=${event.target.value}`);
    }
  }

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
