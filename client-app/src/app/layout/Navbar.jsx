import { Button, Container, Menu } from "semantic-ui-react";
import PropTypes from "prop-types";

export default function Navbar(props) {
	return (
		<>
			<Menu
				inverted
				fixed="top"
			>
				<Container>
					<Menu.Item header>
						<img
							src="/assets/logo.png"
							alt="logo"
							style={{ marginRight: 10 }}
						/>{" "}
						Tune Me
					</Menu.Item>
					<Menu.Item name="Playlists" />
					<Menu.Item>
						<Button
							positive
							content="Create Playlist"
							onClick={props.openForm}
						/>
					</Menu.Item>
				</Container>
			</Menu>
		</>
	);
}

Navbar.propTypes = {
	openForm: PropTypes.func,
};
