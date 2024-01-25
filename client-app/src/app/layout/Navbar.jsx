import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

export default function Navbar() {
	const { playlistStore } = useStore();
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
							onClick={() => playlistStore.openForm()}
						/>
					</Menu.Item>
				</Container>
			</Menu>
		</>
	);
}


