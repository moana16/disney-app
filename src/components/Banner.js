import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

export default function Banner() {
  const [movie, setMovie] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const req = await axios.get(requests.fetNowPlaying);
    const movieId =
      req.data.results[Math.floor(Math.random() * req.data.results.length)].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };
  if (isClicked) {
    return (
        <Container>
            <HomeContainer>
                <Iframe
                src={
                    `https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1`
                }
                width="640"
                height="360"
                frameBorder="0"
                allow="autoplay; fullscreen"/>
                
            </HomeContainer>
            <button onClick={()=>setIsClicked(false)}>
                X
            </button>
        </Container>
    )
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner_buttons">
            {movie.videos?.results[0]?.key ? (
              <button
                className="banner_button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            ) : null}
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
        <div className="banner_fadeBottom" />
      </header>
    );
  }
}

const Container = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    width : 100%;
    height : 100vh;
`;
const HomeContainer = styled.div`
    width : 100%;
    height : 100%;
`;
const Iframe = styled.iframe`
    width : 100%;
    height : 100%;
    z-index : -1;
    opacity : 0.65;
    border : none;

    &:after {
        content : "";
        position : absolute;
        top : 0;
        left : 0;
        width : 100%;
        height : 100%;
    }
`;