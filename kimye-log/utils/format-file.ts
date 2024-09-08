import { ref } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import { getDownloadURL } from "firebase/storage";
import { ObjectId } from "mongodb";
import crypto from "crypto";

export interface RawPostData {
  _id: ObjectId;
  slug: string;
  title: string;
  tags: string;
  thumbnail: string;
  contents: string;
  summary: string;
  date: string;
}

export interface PostData {
  _id: string;
  slug: string;
  title: string;
  tags: string[];
  thumbnail: string;
  contents: string;
  summary: string;
  date: string;
}

export interface TagData {
  id: string;
  tag: string;
  count: number;
}
/**
 * 날짜 형식 'YYYY-MM-DD'로 변환하여 string 리턴
 */
export function formatDate(time: Date): string {
  const year = time.getFullYear();
  const month = ("0" + (time.getMonth() + 1)).slice(-2);
  const day = ("0" + time.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

/**
 * 정규표현식을 사용하여 날짜 형식이 'YYYY-MM-DD'인지 확인
 */
export function isValidDateFormat(dateString: string) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormat.test(dateString);
}

/**
 * firebase storage에 저장하는 용도의 파일 path + 파일명 리턴
 */
export function formatFilePath(fileName: string): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const formattedFileName = `${year}/${month}/${day}/${hours}${minutes}${seconds}_img_${fileName}`;
  return formattedFileName;
}

/**
 *
 * @param data db에서 가져온 raw Post data
 * @returns render하기 쉽게 format 변환된 Post data
 */
export async function formatPostData(data: RawPostData) {
  let url: string = "";
  if (data?.thumbnail !== "") {
    const fileRef = ref(storage, "images/" + data.thumbnail);
    url = await getDownloadURL(fileRef);
  }
  let newData: PostData = {
    _id: data._id.toString(),
    slug: data.slug,
    title: data.title,
    tags: JSON.parse(data.tags),
    thumbnail: url,
    contents: data.contents,
    summary: data.summary,
    date: data.date,
  };

  return newData;
}

/**
 *
 * @param tagCounts post 컬렉션에서 추출한 태그+카운트 형태
 * @returns 렌더용 태그 리턴
 */
export function formatTags(tagCounts: { [tag: string]: number }): any[] {
  return Object.keys(tagCounts).map((tag) => {
    const tagId = crypto.createHash("sha1").update(`${tag}`).digest("hex");
    return {
      id: tagId,
      tag: tag,
      count: tagCounts[tag],
    };
  });
}
