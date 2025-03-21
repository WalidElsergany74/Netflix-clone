"use client";

import { Heart, PlayCircle } from "lucide-react";
import PlayVideoModal from "./PlayVideoModal";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { addToWatchlist, deleteFromWatchlist } from "@/server/_actions/whishList";
import { toast } from "@/hooks/use-toast";
import {  useSession } from "next-auth/react"; 

interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  watchList: boolean;
  wachtListId: string;
  youtubeUrl: string;
  year: number;
  age: number;
  time: number;
}

export function MovieCard({
  movieId,
  overview,
  title,
  wachtListId,
  watchList,
  youtubeUrl,
  age,
  time,
  year,
}: iAppProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession(); // استخدام useSession للحصول على بيانات الجلسة
  const pathName = usePathname();

  const handleAddToWatchlist = async (formData: FormData) => {
    if (!session?.user) { // تحقق من أن المستخدم مسجل دخول
      toast({
        title: "You should sign in to add to the watchlist",
      });
      return;
    }

    try {
      await addToWatchlist(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button>

      <div className="right-5 top-5 absolute z-10">
        {watchList && session?.user ? (
          <form action={deleteFromWatchlist}>
            <input type="hidden" name="watchlistId" value={wachtListId} />
            <input type="hidden" name="pathname" value={pathName} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        ) : (
          <form action={handleAddToWatchlist}>
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="pathname" value={pathName} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>

      
      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{year}</p>
          <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm">
            {age}+
          </p>
          <p className="font-normal text-sm">{time}h</p>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {overview}
        </p>
      </div>

      <PlayVideoModal
        youtubeUrl={youtubeUrl}
        key={movieId}
        title={title}
        overview={overview}
        state={open}
        changeState={setOpen}
        age={age}
        duration={time}
        release={year}
      />
    </>
  );
}
