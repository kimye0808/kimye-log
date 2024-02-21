import { type NextRequest } from "next/server";
import { getSearchResult } from "@/utils/post-utils";
import { PostData } from "@/utils/post-utils";
/**
 *  /api/search?q=검색어
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // console.log(request.nextUrl);
  const query = searchParams.get("q");
  if (query) {
    let result: PostData[];
    try {
      result = await getSearchResult(query as string);
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
}
