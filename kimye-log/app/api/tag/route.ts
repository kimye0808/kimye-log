import { type NextRequest } from "next/server";
// import { getSearchResult } from "@/utils/post-utils";
// import { PostData } from "@/utils/post-utils";
import { Db, MongoClient } from "mongodb";
import { connectToDatabase } from "@/utils/connect-db";
// /**
//  *  /api/tag?tag=태그이름
//  */
// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const query = searchParams.get("tag");
//   if (query) {
//     let result: PostData[];
//     try {
//       result = await getSearchResult(query as string);
//       return new Response(JSON.stringify({ result }), {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     } catch (error) {
//       throw error;
//     }
//   }
// }

/**
 *  태그로 검색하는 기능
 *  /api/tag?tag=태그이름&page=페이지번호&limit=페이지당_결과_수
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag = searchParams.get("tag");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  if (!tag) {
    return new Response(
      JSON.stringify({ message: "Query parameter 'tag' is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

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

  try {
    const skip = (page - 1) * limit;
    const posts = await db
      .collection("post")
      .find({
        tags: { $regex: tag, $options: "i" }, // Case-insensitive search for the tag
      })
      .sort({ date: -1 }) // Sort by date in descending order (latest first)
      .skip(skip)
      .limit(limit)
      .toArray();

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error searching posts" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
