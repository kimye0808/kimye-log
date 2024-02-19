import classes from "./search-tags.module.css";
import SearchBar from "./search-bar";

/**
 * posts 페이지에 보여주는 검색바 + 태그 부분
 */
export default function SearchTagsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className={classes.section}>
        <div className={classes.container}>
          <h2 className={`${classes} headline headline-2 section-title`}>
            <span className={`${classes} span`}>Search</span>
          </h2>
          <SearchBar />
        </div>
        {children}
      </section>
    </>
  );
}
