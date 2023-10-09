import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "../../api/axios";


export default function DetailPage() {
  let {movieId} = useParams();
  const [movie, setMovie] = useState({});

  useEffect(()=> {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`
      );
      setMovie(request.data);
    }
    fetchData();
  },[movieId]);

  if(!movie) return null;
  return (
    <section>
      <img
        className='modal_poster_img'
        src={`https://images.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='modal'
      />
    </section>
  )
}
