"use server";

import {getDbUserId} from "@/actions/user.actions";
import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function createPost(content:string, image:string) {
  try {
    const userId = await getDbUserId();

    const post = await prisma.post.create({
      data:{
        content,
        image,
        authorId: userId,
      },
    });

    revalidatePath("/"); // purge the cache for the homepage
    return { success: true, post };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}