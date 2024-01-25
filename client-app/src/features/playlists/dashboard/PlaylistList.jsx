import { useState } from "react";
import { Segment, Item, Button, Label } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";


// the list of playlists needs to observe any changes made to it from any components that have CRUD in them
const PlaylistList = observer(function PlaylistList() {
	const { playlistStore } = useStore();
	const { playlistsByDate, handleDelete, loading, selectPlaylist } = playlistStore;
	const [target] = useState("")

	console.log(playlistsByDate);

	function handlePlaylistDelete(id) {
		// console.log(e);
		// setTarget(e.currentTarget.name)
		handleDelete(id)
	}

	return (
		<Segment>
			<Item.Group divided>
				{playlistsByDate.map((playlist) => {
					return (
						<Item key={playlist.id}>
							<Item.Content>
								<Item.Header as="a">{playlist.name}</Item.Header>
								<Item.Extra>
									<Button
										onClick={() => selectPlaylist(playlist.id)}
										floated="right"
										content="View"
										color="blue"
									/>
									<Button
										onClick={() => handlePlaylistDelete(playlist.id)}
										floated="right"
										content="Delete"
										color="red"
										loading={loading && target === playlist.id}
										name={playlist.id}
									/>
									<Label
										basic
										content="Elijah Rockwell"
									/>
								</Item.Extra>
							</Item.Content>
						</Item>
					);
				})}
			</Item.Group>
		</Segment>
	);
})
export default PlaylistList

