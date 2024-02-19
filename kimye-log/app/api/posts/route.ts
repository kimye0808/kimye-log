import { type NextRequest } from "next/server";
import { getAllPosts, getSearchResult } from "@/utils/post-utils";

/**
 *  /api/posts
 */
export async function GET(request: NextRequest) {
  const result: any = await getAllPosts();
  return new Response(JSON.stringify({ result }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
