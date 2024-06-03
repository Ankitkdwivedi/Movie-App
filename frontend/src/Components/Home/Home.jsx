import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Myplaylist from './Myplaylist';
import AllplayLists from './AllplayLists';
import Movie from './Movie';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [url, setUrl] = useState(''); // Initial URL
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authUser = localStorage.getItem('userData');
        setIsAuthenticated(!!authUser);
    }, []);

    const fetchMovies = async () => {
        if (url === '') return;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.Search);
            setMovies(data.Search);
        } catch (error) {
            console.error("Error fetching the movie data:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [url]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl(`https://www.omdbapi.com/?s=${searchText}&apikey=b50827e8`);
    };

    return (
        <div>
            <Nav/>
            <form className="mt-20 max-w-md mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies..." required value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {movies.map((movie, index) => (
                    <Movie key={index} movie={movie} />
                ))}
            </div>

            {isAuthenticated ? (
                <>
                    <Myplaylist />
                    <AllplayLists />
                </>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-xl font-bold text-red-600">Please log in to view your playlists and all public playlists.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
