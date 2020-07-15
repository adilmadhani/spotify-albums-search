import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const accessToken = //[token];

function App() {
    const [query, setQuery] = useState("kanye");
    const [albums, setAlbums] = useState([]);
    
    useEffect(() => {
        fetchAlbum();
    }, []);

    function fetchAlbum() {
        let url = `https://api.spotify.com/v1/search?q=${query}&type=album`;
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(resp => resp.json())
            .then(data => setAlbums(data.albums.items));
    }

    function handleSumbit(e) {
        e.preventDefault();
        fetchAlbum();
    }

    return (
        <div className="min-h-screen bg-teal-300 px-10 flex justify-center items-center flex-col">
            <h1 className="text-5xl mb-5">Search Spotify Albums!</h1>
            <h3 className="text-3xl mb-5">Use the search box below to search for albums on Spotify!</h3>
            {/* Search Box */}
            <form className="mb-10 flex" onSubmit={handleSumbit}>
                <input
                    type="text"
                    className="p-2 rounded shadow-lg w-full mr-2"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button className="bg-green-600 text-green-100 py-2 px-4 rounded shadow-lg">
                    Search
        </button>
            </form>

            {/* Show Search Results */}
            <div className="flex flex-wrap">
                {albums.map((album, index) => {
                    const img = album.images[0];
                    const imgUrl = img ? img.url : "https://placekitten.com/g/200/200";

                    return (
                        <div className="mb-10 w-1/3 text-center p-3" key={index}>
                            <img
                                className="rounded mb-3 mx-auto"
                                src={imgUrl}
                                alt={album.name}
                                width="200"
                            />

                            <h3>{album.name}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
