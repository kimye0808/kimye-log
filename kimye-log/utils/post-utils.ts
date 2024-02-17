import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

interface PostData {
  slug: string;
  data: { [key: string]: any };
  content: string;
}

// posts dir 경로
const postsDirectory = path.join(process.cwd(), "posts");

//동기로 해도 되지만 lazy loading 해볼려고 비동기
/**
 * 해당 경로에 있는 모든 파일 및 하위 디렉토리의 이름을 배열로 반환하는 비동기 함수
 */
export async function getPostFiles() {
  try {
    const files = await fs.readdir(postsDirectory);
    return files;
  } catch (error) {
    // console.error("Error reading post files:", error);
    return [];
  }
}

/**
 * md파일을 읽어와서 데이터를 반환하는 비동기 함수
 */
export async function getPostData(
  postIdentifier: string
): Promise<PostData | null> {
  try {
    const postSlug = postIdentifier.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const postData = { slug: postSlug, data: data, content: content };
    return postData;
  } catch (error) {
    // console.error(`Error reading post data for ${postIdentifier}:`, error);
    return null;
  }
}

function makeDelay() {
  "use-client";
  setTimeout(() => {
    console.log("tt");
  }, 3000);
}
/**
 * 모든 post를 가져와서 정렬하여 반환하는 비동기 함수
 */
export async function getAllPosts() {
  try {
    const postsFiles = await getPostFiles();

    const allPosts = await Promise.all(
      postsFiles.map(async (postFile) => {
        try {
          return await getPostData(postFile);
        } catch (error) {
          // console.error(`Error getting post data for ${postFile}:`, error);
          return null; // 실패한 경우 null 반환
        }
      })
    );

    // null 값을 필터링하여 정렬
    const sortedPosts = allPosts
      .filter((post) => post !== null)
      .sort((postA, postB) => (postA!.data > postB!.data ? -1 : 1));

    return sortedPosts;
  } catch (error) {
    // console.error("Error getting all posts:", error);
    return [];
  }
}
