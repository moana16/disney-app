import React, { useEffect, useState,useCallback } from 'react'
import axios from "../api/axios";
import './Row.css';
import MovieModal from './MovieModal';

export default function Row({title, id, fetchUrl}) {

    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSeleted, setMovieSeleted] = useState({});
    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
    }, [fetchUrl])
    console.log(movies);

    useEffect(() => {
        fetchMovieData();
    },[fetchMovieData]);


    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSeleted(movie);
    }
  return (
    <div>
        <h2>{title}</h2>
        <div className='slider'>
            <div className='slider_arrow_left'>
                <span className='arrow'
                onClick={() => {
                    document.getElementById(id).scrollLeft -= window.innerWidth - 80
                }}>
                {"<"}
                </span>
            </div>
            <div id={id} className='row_posters'>
                {movies.map((movie) => (
                    <img 
                        key={movie.id}
                        className='row_poster'
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.name}
                        onClick={()=>handleClick(movie)}
                    
                    />
                ))}

            </div>
            <div className='slider_arrow_right'>
                <span className='arrow'
                onClick={() => {
                    document.getElementById(id).scrollLeft += window.innerWidth - 80
                }}>
                {">"}
                </span>
            </div>
        </div>
        {modalOpen && (
            <MovieModal 
                {...movieSeleted}
                setModalOpen = {setModalOpen}
            />
        )}
    </div>
  )
}
