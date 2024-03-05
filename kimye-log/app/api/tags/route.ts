import { type NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/connect-db";
import { MongoClient, Db } from "mongodb";
import { formatTags } from "@/utils/format-file";

/**
 *  /api/tags
 */
export async function GET(request: NextRequest) {
  let client: MongoClient;
  let db: Db | Response;
  console.log("hi");

  try {
    const connection = await connectToDatabase();
    client = connection.client;
    db = connection.db;
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Cannot connect to database" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  console.log("hi");

  try {
    // post 컬렉션에서 태그를 가져옴
    const posts = await db.collection("post").find().toArray();

    // 태그를 카운트할 객체 생성
    const tagCounts: { [tag: string]: number } = {};

    // 각 포스트의 태그를 반복하면서 카운트
    posts.forEach((post) => {
      const tags = JSON.parse(post.tags);
      tags.forEach((tag: string) => {
        if (!tagCounts[tag]) {
          tagCounts[tag] = 1;
        } else {
          tagCounts[tag]++;
        }
      });
    });

    // 태그에 대한 ID 생성 및 결과 포맷 설정
    const formattedTags = formatTags(tagCounts);
    // 정상적인 응답 생성
    return new Response(JSON.stringify({ tags: formattedTags }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Cannot fetch tags" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
