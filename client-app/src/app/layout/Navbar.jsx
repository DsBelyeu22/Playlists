import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<>
			<Menu
				inverted
				fixed="top"
			>
				<Container>
					<Menu.Item as={NavLink} to='/' header>
						<img
							src="/assets/logo.png"
							alt="logo"
							style={{ marginRight: 10 }}
						/>{" "}
						Tune Me
					</Menu.Item>
					<Menu.Item as={NavLink} to='/playlists' name="Playlists" />
					<Menu.Item>
						<Button
							positive
							content="Create Playlist"
							as={NavLink} to='/createPlaylist'
						/>
					</Menu.Item>
				</Container>
			</Menu>
		</>
	);
}


