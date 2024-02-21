import { type NextRequest } from "next/server";
import { getAllPosts, getSearchResult } from "@/utils/post-utils";
import { PostData } from "@/utils/post-utils";
/**
 *  /api/posts
 */
export async function GET(request: NextRequest) {
  let result: PostData[];
  try {
    result = await getAllPosts();
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
}
