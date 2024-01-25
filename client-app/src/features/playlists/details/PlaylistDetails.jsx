// import { Card, Image, Icon } from "semantic-ui-react";
import { Button, Card, Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import { useStore } from "../../../../stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function PlaylistDetails() {

	const { playlistStore } = useStore();
	const { selectedPlaylist: playlist, openForm, cancelSelectedPlaylist } = playlistStore;

	if (!playlist) return <LoadingComponent />;
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
						onClick={() => openForm(playlist.id)}
					/>
					<Button
						basic
						color="grey"
						content="Cancel"
						onClick={cancelSelectedPlaylist}
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}

PlaylistDetails.propTypes = {
	playlist: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		createdAt: PropTypes.string,
		image: PropTypes.string,
		description: PropTypes.string,

	}),
	cancelSelectPlaylist: PropTypes.func,
	openForm: PropTypes.func,
};
