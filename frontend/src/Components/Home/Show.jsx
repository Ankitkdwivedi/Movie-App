import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

const Show = () => {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=6a4ebfb`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching the movie details:", error);
            }
        };

        fetchMovie();
    }, [imdbID]);

    if (!movie) return <div className='text-center text-5xl'>Loading...</div>;

    return (
        <>
            <Nav/>
            <div className="mt-10 max-w-4xl mx-auto p-4">
                <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="w-full md:w-1/3 rounded-t-lg md:rounded-t-none md:rounded-l-lg" src={movie.Poster} alt={movie.Title} />
                    <div className="p-5">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{movie.Title}</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-400">{movie.Year}</p>
                        <p className="mt-3 text-gray-700 dark:text-gray-400">{movie.Plot}</p>
                        <p className="mt-3 text-gray-700 dark:text-gray-400"><strong>Director:</strong> {movie.Director}</p>
                        <p className="mt-3 text-gray-700 dark:text-gray-400"><strong>Cast:</strong> {movie.Actors}</p>
                        <p className="mt-3 text-gray-700 dark:text-gray-400"><strong>Genre:</strong> {movie.Genre}</p>
                        <p className="mt-3 text-gray-700 dark:text-gray-400"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                        <button 
                    onClick={() => navigate(-1)} 
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Back
                </button>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default Show;
