import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie'; // Import the Movie component

function Myplaylist() {
    const authUser = JSON.parse(localStorage.getItem("userData"));
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/playlist/${authUser._id}`);
                setMovies(response.data.playlist);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };

        fetchPlaylist();
    }, [authUser._id]);

    return (
        <div>
            <h1 className='text-center text-5xl mb-10 text-orange-400'>My Playlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {movies.map((movie, index) => ( 
                    <Movie movie={movie} key={index} />
                ))}
            </div>
        </div>
    );
}

export default Myplaylist;
