import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieProvider';

  
export default function MovieSearch({title,data}) {  
  const {handleTrailer} = useContext(MovieContext);
  return (
    <div className='my-10 px-10 max-w-full '>
      <h2 className="text-xl uppercase mb-4 text-white">{title}</h2>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
      {data && data.length > 0 && data.map((movie) => (
          <div  onClick={()=>handleTrailer(movie.id)}
            key={movie.id}
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${
                movie.poster_path
              })`,
            }}
          >
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
            <div className="relative  p-4 flex flex-col items-center justify-end h-full">
              <h3 className="text-md uppercase text-white">
                {movie.name || movie.title || movie.original_title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
