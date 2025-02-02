import MovieVideo from '@/components/MovieVideo'
import RecentlyAdded from '@/components/RecentlyAdded'
import React from 'react'

const Home = () => {
  return (
 
   <main className="">
   <MovieVideo/>
    <h1 className="text-3xl font-bold  mt-5 lg:mt-0 ">Recently Added</h1>
    <RecentlyAdded/>
   </main>
   
  )
}

export default Home