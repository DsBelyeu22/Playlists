import PropTypes from "prop-types";
import { Segment, Item, Button, Label } from "semantic-ui-react";

export default function PlaylistList(props) {
	return (
		<Segment>
			<Item.Group divided>
				{props.playlists.map((playlist) => {
					return (
						<Item key={playlist.id}>
							<Item.Content>
								<Item.Header as="a">{playlist.name}</Item.Header>
								<Item.Extra>
									<Button
										onClick={() => props.selectPlaylist(playlist.id)}
										floated="right"
										content="View"
										color="blue"
									/>
									<Button
										onClick={() => props.deletePlaylist(playlist.id)}
										floated="right"
										content="Delete"
										color="red"
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
}

PlaylistList.propTypes = {
	playlists: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			image: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
			description: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.oneOf([null]),
			]),
		})
	),

	selectPlaylist: PropTypes.func,
	deletePlaylist: PropTypes.func
};
