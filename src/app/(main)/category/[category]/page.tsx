import { MovieCard } from "@/components/MovieCard";
import { db } from "@/lib/prisma";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";


async function getData(category: string, userId: string) {
  return await db.movie.findMany({
    where: { category },
    select: {
      age: true,
      duration: true,
      id: true,
      title: true,
      release: true,
      imageString: true,
      overview: true,
      youtubeString: true,
      WatchLists: { where: { userId } },
    },
  });
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (!params || !params.category) {
    return <div className="text-center text-xl font-bold">Category not found</div>;
  }

  const genre = decodeURIComponent(params.category);
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;

  const data = await getData(genre, userId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6 pb-6">
      {data.length === 0 ? (
        <p className="text-center col-span-full text-xl">No movies found in this category.</p>
      ) : (
        data.map((movie) => (
          <div key={movie.id} className="relative h-60">
            <Image
              src={movie.imageString}
              alt={movie.title}
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />
            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src={movie.imageString}
                  alt={movie.title}
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />
                <MovieCard
                  key={movie.id}
                  age={movie.age}
                  movieId={movie.id}
                  overview={movie.overview}
                  time={movie.duration}
                  title={movie.title}
                  wachtListId={movie.WatchLists[0]?.id}
                  watchList={movie.WatchLists.length > 0}
                  year={movie.release}
                  youtubeUrl={movie.youtubeString}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
