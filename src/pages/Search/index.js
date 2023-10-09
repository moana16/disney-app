import React,{useEffect, useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from "../../api/axios";
import './SearchPage.css';
import useDebounce from '../../hooks/useDebounce';


export default function SearchPage() {
    const [searchResults, setSearchResults] =useState([]);
    const navigate = useNavigate();


    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(query.get("q"),500);

    useEffect(() => {
        if(debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    },[debouncedSearchTerm]);

    const fetchSearchMovie = async (searchTerm)=> {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            );
            setSearchResults(request.data.results);

        }
        catch (e){
            console.log("erorr", e);
        }
    }
    if(searchResults.length > 0){
        return (
            <section className='search_container'>
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person" ) {
                        const movieImageUrl = 
                        "https://images.tmdb.org/t/p/w500"+movie.backdrop_path;
                        return (
                            <div className='movie' key={movie.id}>
                                <div 
                                    className='movie_column_poster'
                                    onClick={()=> navigate(`/${movie.id}`)}>
                                    <img 
                                        src={movieImageUrl}
                                        alt='movie'
                                        className='movie_poster'
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </section>
          )

    }
    else {
        return (
            <section className='no_results'>
                <div className='no_results_text'>
                    <p>
                        찾고자하는 검색어 "{searchTerm}"에 해당하는 영화가 없습니다.
                    </p>
                </div>
            </section>
        )
    }
  
}
