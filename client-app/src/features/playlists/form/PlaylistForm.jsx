/* eslint-disable no-unused-vars */
import { Button, Form, Segment } from "semantic-ui-react";
// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid'


const PlaylistForm = observer(function PlaylistForm() {
	const { playlistStore } = useStore();
	const { updatePlaylist, createPlaylist, selectedPlaylist, loading, loadPlaylist, loadingInitial } = playlistStore;

	const [playlist, setPlaylist] = useState({
		id: "",
		name: "",
		image: "",
		description: "",
	});

	const { id } = useParams();
	console.log(id);

	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			loadPlaylist(id).then(playlist => setPlaylist(playlist))
		}
	}, [id, loadPlaylist])





	function handleChange(event) {
		const { name, value } = event.target;
		console.log(name);
		setPlaylist({ ...playlist, [name]: value });
	}

	const handleSubmit = () => {
		if (!playlist.id) {
			playlist.id = uuid();
			createPlaylist(playlist).then(() => navigate(`/playlists/${playlist.id}`))
		} else {
			updatePlaylist(playlist).then(() => navigate(`/playlists/${playlist.id}`))
		}

	}

	if (loadingInitial) return <LoadingComponent content={'Loading Playlist...'} />

	return (
		<Segment clearing>
			<Form
				onSubmit={handleSubmit}
				autoComplete="off"
			>
				<Form.Input
					onChange={handleChange}
					name="name"
					value={playlist.name}
					placeholder="Name"
					type="text"
				></Form.Input>
				{/* <Form.Input
					type="text"
					onChange={handleChange}
					name="description"
					value={playlist.description}
					placeholder="Description (optional)"
				></Form.Input>
				<Form.Input
					onChange={handleChange}
					accept="image/*"
					type="file"
					name="image"
					value={playlist.image}
					placeholder="Image"
				></Form.Input> */}
				<Button
					loading={loading}
					floated="right"
					positive
					type="submit"
					content="Done"

				></Button>
				<Button
					floated="right"
					type="button"
					content="Cancel"
					as={Link} to='/playlists'
				></Button>
			</Form>
		</Segment>
	);
})
export default PlaylistForm;

// PlaylistForm.propTypes = {
// 	// playlist: PropTypes.shape({
// 	// 	id: PropTypes.string.isRequired,
// 	// 	name: PropTypes.string.isRequired,
// 	// 	image: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
// 	// 	description: PropTypes.oneOfType([
// 	// 		PropTypes.string,
// 	// 		PropTypes.oneOf([null]),
// 	// 	]),
// 	// 	// Add more properties as needed
// 	// }),
// 	// openForm: PropTypes.func,
// 	// closeForm: PropTypes.func,
// 	createOrEdit: PropTypes.func,
// 	submitting: PropTypes.bool
// };
