import { db } from "@/lib/prisma";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { MovieCard } from "./MovieCard";


async function getData(userId: string) {
  const data = await db.movie.findMany({
    select: {
      id: true,
      overview: true,
      title: true,
      WatchLists: {
        where: {
          userId: userId,
        },
      },
      imageString: true,
      youtubeString: true,
      age: true,
      release: true,
      duration: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return data;
}

export default async function RecentlyAdded() {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user?.email as string);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 min-h-screen pb-6">
      {data.map((movie) => (
        <div key={movie.id} className="relative h-72  "> 
          <Image
            src={movie.imageString}
            alt="Movie"
            width={500}
            height={400}
            className="rounded-sm absolute w-full h-full object-cover"
          />

          <div className="h-full relative z-10 w-full transform transition duration-500 hover:scale-110  md:hover:scale-105  lg:hover:scale-125 opacity-0 hover:opacity-100"> {/* تقليل قيمة scale */}
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
              <Image
                src={movie.imageString}
                alt="Movie"
                width={800}
                height={800}
                className="absolute w-full h-full -z-10 rounded-lg object-cover"
              />

              <MovieCard
                movieId={movie.id}
                overview={movie.overview}
                title={movie.title}
                wachtListId={movie.WatchLists[0]?.id}
                youtubeUrl={movie.youtubeString}
                watchList={movie.WatchLists.length > 0 ? true : false}
                key={movie.id}
                age={movie.age}
                time={movie.duration}
                year={movie.release}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}