/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import PlaylistDashboard from "../../features/playlists/dashboard/PlaylistDashboard";
import { v4 as uuid } from 'uuid';

function App() {
	const [playlists, setPlaylists] = useState([]);
	const [selectedPlaylist, setSelectedPlaylist] = useState();
	const [editMode, setEditMode] = useState(false);

	// CRUD functions will modify the playlists state from the app component so the functions will pass down as props to the other functions



	useEffect(() => {
		axios
			.get("http://localhost:5000/api/playlists")
			.then((response) => {
				for (let index = 0; index < response.data.length; index++) {
					const element = response.data[index];
					console.log(element.name);
					setPlaylists(response.data);
				}
			})
			.catch(() => {
				console.log("Problem Fetching Playlists");
			});
	}, []);

	function handleSelectPlaylist(id) {
		setSelectedPlaylist(
			playlists.find((playlist) => {
				if (playlist.id === id) {
					console.log(playlist);
					return playlist;
				}
			})
		);
	}

	function handleCancelSelectPlaylist() {
		setSelectedPlaylist(undefined);
	}

	function handleFormOpen(id) {
		id ? handleSelectPlaylist(id) : handleCancelSelectPlaylist();
		setEditMode(true);
	}

	function handleFormClose() {
		setEditMode(false);
	}

	function createOrEditPlaylist(playlist) {
		// if the playlist has an id, filter
		playlist.id
			? setPlaylists([...playlists.filter((x) => x.id !== playlist.id), playlist])
			: setPlaylists([...playlists, { ...playlist, id: uuid() }]);
		setEditMode(false)
		setSelectedPlaylist(playlist)
		console.log(playlist);
	}

	function handleDeletePlaylist(id) {
		setPlaylists([...playlists.filter((x) => x.id !== id)])
	}

	return (
		<>
			<Navbar openForm={handleFormOpen} />
			<Container style={{ marginTop: "7em" }}>
				<PlaylistDashboard
					selectedPlaylist={selectedPlaylist}
					selectPlaylist={handleSelectPlaylist}
					cancelSelectPlaylist={handleCancelSelectPlaylist}
					playlists={playlists}
					editMode={editMode}
					openForm={handleFormOpen}
					closeForm={handleFormClose}
					createOrEdit={createOrEditPlaylist}
					deletePlaylist={handleDeletePlaylist}
				></PlaylistDashboard>
			</Container>
		</>
	);
}

export default App;
