// import { Card, Image, Icon } from "semantic-ui-react";
import { Button, Card, Image } from "semantic-ui-react";
import PropTypes from "prop-types";

export default function PlaylistDetails(props) {
	return (
		<Card fluid>
			<Image
				// src={`/assets/categoryImages/${props.playlist?.image}`}
				src={props.playlist?.image}
				wrapped
				ui={false}
			/>
			<Card.Content>
				<Card.Header>{props.playlist?.name}</Card.Header>
				<Card.Meta>
					<span className="date">{props.playlist?.createdAt}</span>
				</Card.Meta>
				<Card.Description>
					{props.playlist?.description}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths={2}>
					<Button
						basic
						color="blue"
						content="Edit"
						onClick={() => props.openForm(props.playlist.id)}
					/>
					<Button
						basic
						color="grey"
						content="Cancel"
						onClick={props.cancelSelectPlaylist}
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
