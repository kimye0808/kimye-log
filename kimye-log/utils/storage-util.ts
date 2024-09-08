import { storage } from "@/firebase/firebase";
import { ref, deleteObject } from "firebase/storage";
/**
 *  image 경로 추출
 */
export function getImagePath(imageUrl: string) {
  return imageUrl.split("/o/images")[1].split("?")[0].replace(/%2F/g, "/");
}

/**
 *  ![*](url)형태에 맞는 내용 추출해서 markdown 배열 리턴
 */
export function getMarkdownImagesFromContents(contents: string) {
  const imagePattern = /!\[.*?\]\((.*?)\)/g;
  return contents.match(imagePattern);
}

/**
 *  ![*](url) markdown 배열 형태에서 url 추출
 */
export function getImageUrlsFromMarkdowon(
  markdownArrays: RegExpMatchArray | null
) {
  if (!markdownArrays) return [];
  const imageUrls = markdownArrays
    .map((link) => {
      const match = link.match(/\((.*?)\)/);
      if (match && match.length === 2) {
        return match[1];
      } else {
        return null;
      }
    })
    .filter((url) => url !== null) as string[];
  return imageUrls;
}
/**
 *  스토리지에서 해당 이미지 삭제하고 프로미스 리턴
 */
export async function deleteImageFromStorage(imagePath: string) {
  const imageRef = ref(storage, "images" + imagePath);
  try {
    await deleteObject(imageRef);
  } catch (error) {
    throw new Error("Error to delete an image in storage");
  }
}

/**
 *  이미지 url 양식에 맞는 모든 이미지를 스토리지에서 삭제한다
 */
export async function deleteAllImagesInContents(images: string[]) {
  const imagesUrl = images.map((image) => getImagePath(image));
  if (!imagesUrl || imagesUrl.length === 0) return;
  for (const image of imagesUrl) {
    await deleteImageFromStorage(image);
  }
}
