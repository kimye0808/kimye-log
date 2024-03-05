import { type NextRequest } from "next/server";
import { getSearchResult } from "@/utils/post-utils";
import { PostData } from "@/utils/post-utils";
import { connectToDatabase } from "@/utils/connect-db";
import { Db, MongoClient } from "mongodb";
// /**
//  *  /api/search?q=검색어
//  */
// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   // console.log(request.nextUrl);
//   const query = searchParams.get("q");
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
 *  /api/search?q=검색어&page=페이지번호&limit=페이지당_결과_수
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  if (!query) {
    return new Response(
      JSON.stringify({ message: "Query parameter 'q' is required" }),
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
        $or: [
          { title: { $regex: query, $options: "i" } }, // Case-insensitive search
          { contents: { $regex: query, $options: "i" } },
          { summary: { $regex: query, $options: "i" } },
        ],
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
