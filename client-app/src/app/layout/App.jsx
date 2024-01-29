/* eslint-disable no-unused-vars */
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from '../../features/playlists/home/HomePage'

function App() {

	const location = useLocation();

	return (
		<>
			{location.pathname === '/' ? <HomePage /> : (
				<>
					<Navbar />
					<Container style={{ marginTop: "7em" }}>
						<Outlet />
					</Container>
				</>
			)}

		</>
	);
}

export default App;
