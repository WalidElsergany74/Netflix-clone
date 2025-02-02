"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addToWatchlist(formData: FormData) {
  const movieId = formData.get("movieId");
  const pathname = formData.get("pathname") as string;
  
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("You should sign in to add to the watchlist");
  }

  await db.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),
    },
  });

  revalidatePath(pathname);
}

export async function deleteFromWatchlist(formData: FormData) {
  const watchlistId = formData.get("watchlistId") as string;
  const pathname = formData.get("pathname") as string;
  

  const session = await getServerSession(authOptions);

  if (!session?.user) {

    throw new Error("You should sign in to add to the watchlist");
  }

  await db.watchList.delete({
    where: {
      id: watchlistId,
    },
  });


  revalidatePath(pathname);
}
