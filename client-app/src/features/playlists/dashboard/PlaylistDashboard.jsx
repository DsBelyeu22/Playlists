import { Grid } from "semantic-ui-react";
import PlaylistList from "./PlaylistList";
import PropTypes from "prop-types";
import PlaylistDetails from "../details/PlaylistDetails";
import PlaylistForm from "../form/PlaylistForm";

export default function PlaylistDashboard(props) {
	return (
		<Grid>
			<Grid.Column width={10}>
				<PlaylistList
					selectPlaylist={props.selectPlaylist}
					playlists={props.playlists}
					deletePlaylist={props.deletePlaylist}
					submitting={props.submitting}

				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{props.selectedPlaylist && !props.editMode && (
					<PlaylistDetails
						playlist={props.selectedPlaylist}
						cancelSelectPlaylist={props.cancelSelectPlaylist}
						openForm={props.openForm}
					></PlaylistDetails>
				)}
				{props.editMode && (
					<PlaylistForm
						closeForm={props.closeForm}
						playlist={props.selectedPlaylist}
						createOrEdit={props.createOrEdit}
						submitting={props.submitting}
					></PlaylistForm>
				)}
			</Grid.Column>
		</Grid>
	);
}
PlaylistDashboard.propTypes = {
	playlists: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			image: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
			description: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.oneOf([null]),
			]),
			// Add more properties as needed
		})
	).isRequired,
	selectPlaylist: PropTypes.func,
	cancelSelectPlaylist: PropTypes.func,
	selectedPlaylist: PropTypes.object,
	openForm: PropTypes.func,
	closeForm: PropTypes.func,
	editMode: PropTypes.bool,
	createOrEdit: PropTypes.func,
	deletePlaylist: PropTypes.func,
	submitting: PropTypes.bool
};
