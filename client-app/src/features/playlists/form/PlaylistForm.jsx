import { Button, Form, Segment } from "semantic-ui-react";
// import PropTypes from "prop-types";
import { useState } from "react";
import { useStore } from "../../../../stores/store";
import { observer } from "mobx-react-lite";


const PlaylistForm = observer(function PlaylistForm() {
	const { playlistStore } = useStore();
	const { loading, updatePlaylist, createPlaylist, selectedPlaylist, closeForm, openForm } = playlistStore;
	const initialState = selectedPlaylist ?? {
		id: "",
		name: "",
		image: "",
		description: "",
	};

	const [playlist, setPlaylist] = useState(initialState);



	function handleChange(event) {
		const { name, value } = event.target;
		console.log(name);
		setPlaylist({ ...playlist, [name]: value });
	}

	const handleSubmit = () => {
		playlist.id ? updatePlaylist(playlist) : createPlaylist(playlist)
	}

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
					onClick={openForm}
					floated="right"
					positive
					type="submit"
					content="Done"

				></Button>
				<Button
					onClick={closeForm}
					floated="right"
					type="button"
					content="Cancel"
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
