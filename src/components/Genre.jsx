"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropTypes from "prop-types";

export default function Genre({ title }) {
  const [movieList, setMovieList] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // fetch movie api
    async function fetchMovies() {
      const key = import.meta.env.VITE_KEY;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&end_date=2023-11-13&page=1&start_date=2023-11-01`,
          { signal } // Pass the signal to the axios request
        );
        setMovieList(response.data.results);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchMovies();

    // Cleanup function
    return () => abortController.abort();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4.5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3.5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.5,
    },
  };

  return (
    <div className="w-full">
      <button className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {title}
      </button>
      {/*3rd party slider */}
      <Carousel
        center
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="ml-5"
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
      >
        {/* maping movie api with container */}
        {movieList.map((movie, index) => (
          <div key={index}>
            <img
              className="w-4/5 mt-0 shadow-md rounded-t"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="w-4/5 h-10 flex items-center shadow-md rounded-b text-xs p-2 bg-blue-500 text-white">
              {movie.title}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

Genre.propTypes = {
  title: PropTypes.func.isRequired,
};
