import { type NextRequest } from "next/server";
// import { getAllPosts, getSearchResult } from "@/utils/post-utils";
// import { PostData } from "@/utils/post-utils";
import { Db, MongoClient, WithId } from "mongodb";
import { connectToDatabase } from "@/utils/connect-db";
/**
 *  /api/posts - local md 파일 읽기용도
 */
// export async function GET(request: NextRequest) {
//   let result: PostData[];
//   try {
//     result = await getAllPosts();
//     return new Response(JSON.stringify({ result }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     throw error;
//   }
// }

/**
 *  /api/posts?page= &limit=
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) ?? 1;
  const limit = Number(searchParams.get("limit")) ?? 10;

  if (page && limit) {
    let client: MongoClient;
    let db: Db | Response;
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

    //db에서 posts를 최신 순으로 페이지 단위로 가져온다
    const skip = (page - 1) * limit;
    let posts: WithId<{ [key: string]: any }>[];
    try {
      posts = await db
        .collection("post")
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
    } catch (error) {
      return new Response(JSON.stringify({ message: "Cannot fetch posts" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    /**
     * 정상
     */
    return new Response(JSON.stringify({ posts: posts }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
