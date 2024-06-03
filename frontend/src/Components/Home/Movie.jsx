import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
    console.log(movie);
    const authData = JSON.parse(localStorage.getItem("userData"));
    const handleAddMovie = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/add/${authData._id}`, { movie });
            console.log(response);
        } catch (error) {
            console.error("Error adding movie to playlist:", error);
        }
    };
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={movie.Poster} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.Title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.Year}</p>
                <button onClick={() => handleAddMovie()} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add To Playlist
                </button>
                <Link to={`/show/${movie.imdbID}`} className="ml-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Show
                </Link>
            </div>
        </div>
    );
};
export default Movie;
