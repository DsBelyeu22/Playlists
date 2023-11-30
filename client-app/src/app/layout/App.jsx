/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import PlaylistDashboard from "../../features/playlists/dashboard/PlaylistDashboard";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
	const [playlists, setPlaylists] = useState([]);
	const [selectedPlaylist, setSelectedPlaylist] = useState();
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false);

	// CRUD functions will modify the playlists state from the app component so the functions will pass down as props to the other functions



	useEffect(() => {
		agent
			.Playlists.list()
			.then((response) => {
				for (let index = 0; index < response.length; index++) {
					const element = response[index];
					console.log(element.name);
					setPlaylists(response);
					setLoading(false)
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
		console.log(playlist);
		// if the playlist has an id, filter
		setSubmitting(true)
		if (playlist.id) {
			agent.Playlists.update(playlist).then(() => {
				setPlaylists([...playlists.filter((x) => x.id !== playlist.id), playlist])
				setSelectedPlaylist(playlist)
				setEditMode(false)
				setSubmitting(false)

			})
		} else {
			playlist.id = uuid()
			agent.Playlists.create(playlist).then(() => {
				setPlaylists([...playlists, playlist]);
				console.log(playlist);
				setSelectedPlaylist(playlist)
				setEditMode(false)
				setSubmitting(false)
			})
		}

	}

	function handleDeletePlaylist(id) {
		setSubmitting(true)
		agent.Playlists.delete(id).then(() => {
			setPlaylists([...playlists.filter((x) => x.id !== id)])
			setSubmitting(false)

		})
	}

	if (loading) {
		return <LoadingComponent content='Loading'></LoadingComponent>
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
					submitting={submitting}
				></PlaylistDashboard>
			</Container>
		</>
	);
}

export default App;
