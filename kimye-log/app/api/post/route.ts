import { type NextRequest } from "next/server";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { formatFilePath, isValidDateFormat } from "@/utils/format-file";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { deleteImageFromStorage } from "@/utils/storage-util";
/**
 *  /api/post
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  //not authenticated user 불가
  const session = await getServerSession(authOptions);
  if (!session || session.user?.name !== process.env.MONGODB_USERNAME) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const title = formData.get("title");
  const tags = formData.get("tags");
  const contents = formData.get("contents");
  const thumbnail = formData.get("thumbnail");
  const summary = formData.get("summary");
  const date = formData.get("date");

  if (
    !title ||
    String(title).trim() === "" ||
    !contents ||
    String(contents).trim() === "" ||
    !isValidDateFormat(String(date))
  ) {
    return new Response(JSON.stringify({ message: "Invalid input" }), {
      status: 422,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //db에 connect
  let client: MongoClient;
  const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.7z6drok.mongodb.net/`;
  try {
    client = await MongoClient.connect(connectionString);
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
  const db = client.db();

  // 썸네일을 올린다
  let formatPath: string = "";
  if (thumbnail instanceof File) {
    formatPath = formatFilePath(thumbnail?.name);
    const fileRef = ref(storage, "images/" + formatPath);
    try {
      await uploadBytes(fileRef, thumbnail);
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Fail to store a thumbnail" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  //db에 저장할 data
  const newPost: any = {
    title,
    tags,
    thumbnail: formatPath,
    contents,
    summary,
    date,
  };
  //mongodb collection 'post'에 추가
  try {
    const result = await db.collection("post").insertOne(newPost);
    newPost.id = result.insertedId;
  } catch (error) {
    client.close();
    await deleteImageFromStorage(formatPath);
    return new Response(JSON.stringify({ message: "Fail to store a post" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  client.close();

  /**
   * 정상
   */
  return new Response(JSON.stringify({ message: newPost }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
