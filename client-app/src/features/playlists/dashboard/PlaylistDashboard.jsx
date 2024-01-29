import { Grid } from "semantic-ui-react";
import PlaylistList from "./PlaylistList";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const PlaylistDashboard = observer(function PlaylistDashboard() {
	const { playlistStore } = useStore();
	const { loadPlaylists, playlistRegistry } = playlistStore

	// CRUD functions will modify the playlists state from the app component so the functions will pass down as props to the other components

	useEffect(() => {

		if (playlistRegistry.size <= 1) {
			loadPlaylists()
		}
	}, [loadPlaylists, playlistRegistry.size]);

	if (playlistStore.loadingInitial) {
		return <LoadingComponent content="Loading"></LoadingComponent>;
	}

	return (
		<Grid>
			<Grid.Column width={10}>
				<PlaylistList />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Playlist Filters</h2>
			</Grid.Column>
		</Grid>
	);
})

export default PlaylistDashboard




