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

/**
 * md파일을 읽어서 태그를 배열로 반환
 */
export async function getAllTags() {
  try {
    const postsFiles = await getPostFiles();

    const allPosts = await Promise.all(
      postsFiles.map(async (postFile) => {
        try {
          return await getPostData(postFile);
        } catch (error) {
          return null;
        }
      })
    );
    // 중복을 제거하기 위해 Set을 사용하여 모든 태그를 하나의 Set에 모음
    const allTagsSet = new Set<string>();
    allPosts.forEach((post) => {
      if (post && post.data.tags) {
        post.data.tags.forEach((tag: string) => {
          allTagsSet.add(tag);
        });
      }
    });

    // Set을 다시 배열로 변환하여 객체에 유니코드를 추가하여 반환
    const allTags = Array.from(allTagsSet).map((tag, index) => ({
      id: String.fromCharCode(65 + index), // 'A'부터 시작하여 유니코드를 생성
      tag,
    }));
    return allTags;
  } catch (error) {
    return [];
  }
}
