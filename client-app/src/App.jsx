/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
	const [spotifyTracks, setSpotifyTracks] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/search?q=corsa")
			.then((response) => {
				for (
					let index = 0;
					index < response.data.tracks.items.length;
					index++
				) {
					const array = response.data.tracks.items[index];
					// console.log(array.artists);
					for (let index = 0; index < array.artists.length; index++) {
						const element = array.artists[index];
						// console.log(element.name);
					}
					setSpotifyTracks(response.data.tracks.items);
				}
			})
			.catch(() => {
				console.log("REQUEST FOR SPOTIFY TRACKS FAILED");
			});
	}, []);
	return (
		<>
			<Header
				as="h2"
				icon="users"
				content="Tune Me"
			/>
			<List>
				{spotifyTracks.map((spotifyTrack) => {
					return spotifyTrack.artists.map((spotifyArtist) => {
						// console.log(spotifyArtist.name);
						return (
							<List.Item key={spotifyArtist.id}>{spotifyArtist.name}</List.Item>
						);
					});
				})}
			</List>
		</>
	);
}

export default App;
