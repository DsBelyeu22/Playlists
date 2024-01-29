import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const PlaylistDetails = observer(function PlaylistDetails() {

	const { playlistStore } = useStore();
	const { selectedPlaylist: playlist, loadPlaylist, loadingInitial } = playlistStore;
	let { id } = useParams()
	console.log(id);

	useEffect(() => {
		if (id) {
			loadPlaylist(id)
		}
	}, [id, loadPlaylist])

	if (loadingInitial || !playlist) return <LoadingComponent />;
	return (
		<Card fluid>
			<Image
				// src={`/assets/categoryImages/${props.playlist?.image}`}
				src={playlist.image}
				wrapped
				ui={false}
			/>
			<Card.Content>
				<Card.Header>{playlist.name}</Card.Header>
				<Card.Meta>
					<span className="date">{playlist.createdAt}</span>
				</Card.Meta>
				<Card.Description>
					{playlist.description}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths={2}>
					<Button
						basic
						color="blue"
						content="Edit"
						as={Link} to={`/manage/${playlist.id}`}
					/>
					<Button
						basic
						color="grey"
						content="Cancel"
						as={Link} to={'/playlists'}
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}
)
export default PlaylistDetails
