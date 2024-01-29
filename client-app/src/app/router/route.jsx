import { createBrowserRouter } from 'react-router-dom';
import App from "../layout/App"
import PlaylistDashboard from '../../features/playlists/dashboard/PlaylistDashboard';
import PlaylistForm from '../../features/playlists/form/PlaylistForm';
import PlaylistDetails from '../../features/playlists/details/PlaylistDetails';

// /**
//  * @typedef {Object} RouteObject
//  * @property {string} path - The route path.
//  */

// /**
//  * @type {Array<RouteObject>}
//  */
export const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'playlists', element: <PlaylistDashboard /> },
            { path: 'playlists/:id', element: <PlaylistDetails /> },
            { path: 'createPlaylist', element: <PlaylistForm key={'create'} /> },
            { path: 'manage/:id', element: <PlaylistForm key={'manage'} /> }
            // PlaylistForm now has two different keys to distinguish between when I am creating new playlist and editing one
        ]
    },
];

// /**
//  * @type {BrowserRouter}
//  */
export const router = createBrowserRouter(routes);
