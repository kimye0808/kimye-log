import { type NextRequest } from "next/server";
import { getSearchResult } from "@/utils/post-utils";

/**
 *  /api/tag?tag=태그이름
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("tag");
  if (query) {
    const result: any = await getSearchResult(query as string);
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
