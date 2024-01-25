import { Grid } from "semantic-ui-react";
import PlaylistList from "./PlaylistList";
import PlaylistDetails from "../details/PlaylistDetails";
import PlaylistForm from "../form/PlaylistForm";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";

const PlaylistDashboard = observer(function PlaylistDashboard() {
	const { playlistStore } = useStore();
	const { playlists, selectedPlaylist, editMode } = playlistStore;
	console.log(playlists);

	return (
		<Grid>
			<Grid.Column width={10}>
				<PlaylistList />
			</Grid.Column>
			<Grid.Column width={6}>
				{selectedPlaylist && !editMode && (
					<PlaylistDetails
					></PlaylistDetails>
				)}
				{editMode && (
					<PlaylistForm
					></PlaylistForm>
				)}
			</Grid.Column>
		</Grid>
	);
})

export default PlaylistDashboard




