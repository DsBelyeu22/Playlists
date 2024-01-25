import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import PlaylistDashboard from "../../features/playlists/dashboard/PlaylistDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../../../stores/store";

function App() {
	const { playlistStore } = useStore();

	// CRUD functions will modify the playlists state from the app component so the functions will pass down as props to the other components

	useEffect(() => {
		playlistStore.loadPlaylists();
	}, [playlistStore]);

	if (playlistStore.loadingInitial) {
		return <LoadingComponent content="Loading"></LoadingComponent>;
	}

	return (
		<>
			<Navbar />
			<Container style={{ marginTop: "7em" }}>
				<h2>{playlistStore.name}</h2>
				<PlaylistDashboard></PlaylistDashboard>
			</Container>
		</>
	);
}

export default App;
