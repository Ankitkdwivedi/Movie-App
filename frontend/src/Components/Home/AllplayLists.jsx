import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie'; // Import the Movie component

function AllplayLists() {
    const [allPlaylists, setAllPlaylists] = useState([]);

    useEffect(() => {
        const fetchAllPlaylists = async () => {
            try {
                const response = await axios.get('http://localhost:8080/playlists');
                setAllPlaylists(response.data);
            } catch (error) {
                console.error('Error fetching all playlists:', error);
            }
        };

        fetchAllPlaylists();
    }, []);

    return (
        <div>
            <h1 className='text-center text-5xl mb-10 text-orange-400'>All Playlists</h1>
            {allPlaylists.map((userPlaylist) => (
                <div key={userPlaylist.userId}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {userPlaylist.playlist.map((movie, index) => (
                            <Movie key={index} movie={movie} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllplayLists;
