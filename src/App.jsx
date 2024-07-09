import { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieProvider";

function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

  const handleSearch = async (searchValue) => {
    setMovieSearch([]);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=vi-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();
      setMovieSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const url1 =
        "https://api.themoviedb.org/3/movie/popular?language=vi-US&page=1";
      const url2 =
        "https://api.themoviedb.org/3/movie/top_rated?language=vi-US&page=1";

      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      setMovie(data1.results);
      setMovieRate(data2.results);
    };
    fetchMovie();
  }, []);

  return (
    <>
      <MovieProvider>
        <div className="bg-black pb-10">
          <Header onSearch={handleSearch} />
          <Banner />
          {movieSearch.length > 0 ? (
            <div>
              <MovieSearch title={"Kết quả tìm kiếm"} data={movieSearch} />
            </div>
          ) : (
            <div>
              <MovieList title={"Phim Hot"} data={movie} />
              <MovieList title={"Phim đề xuất"} data={movieRate} />
            </div>
          )}
        </div>
        <div>
          <p>Liên Hệ Bản Quyền: nguyennhat082004@gmail.com</p>
        </div>
      </MovieProvider>
    </>
  );
}

export default App;
