import { makeAutoObservable } from "mobx";
import agent from "../src/app/api/agent";
import { runInAction } from "mobx";
import { v4 as uuid } from "uuid";

/**
 * @typedef {Object} Playlist
 * @property {string} name
 * @property {string | null} image
 * @property {string | null} description
 * */

export default class PlaylistStore {
	/**
	 * @type {Playlist[]}
	 */
	/**
	 * @type {Playlist | undefined}
	 */
	// playlists = []; Going to remove but still need to update the list of playlist and sort them by data
	playlistRegistry = new Map();
	selectedPlaylist = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;
	submitting = false;

	constructor() {
		makeAutoObservable(this, {});
	}

	get playlistsByDate() {
		return Array.from(this.playlistRegistry.values()).sort((a, b) => {
			return Date.parse(b.createdAt) - Date.parse(a.createdAt);
		});
	}

	loadPlaylists = async () => {
		this.loadingInitial = true;
		try {
			const playlists = await agent.Playlists.list(); // Assuming this returns an array
			console.log(playlists);
			runInAction(() => {
				this.playlistRegistry.clear();
				playlists.forEach((playlist) => {
					// playlist.createdAt = playlist.createdAt.split("T")[0];
					console.log(playlist.createdAt);

					this.playlistRegistry.set(playlist.id, playlist);
				});
				// this.playlists = playlists; // Update the playlists array
				this.loadingInitial = false;
			});
		} catch (error) {
			console.error("Error loading playlists:", error);
			runInAction(() => {
				this.loadingInitial = false;
			});
		}
	};

	selectPlaylist = (id) => {
		// this.selectedPlaylist = this.playlists.find((x) => x.id === id);
		this.playlistRegistry.get(id);
	};
	cancelSelectedPlaylist = () => {
		this.selectedPlaylist = undefined;
	};

	openForm = (id) => {
		id ? this.selectPlaylist(id) : this.cancelSelectedPlaylist();
		this.editMode = true;
	};
	closeForm = () => {
		this.editMode = false;
	};

	handleDelete = async (id) => {
		this.loading = true;
		try {
			await agent.Playlists.delete(id);
			runInAction(() => {
				// this.playlists = [...this.playlists.filter((x) => x.id !== id)];
				this.playlistRegistry.delete(id);
				if (this.selectedPlaylist?.id === id) {
					this.cancelSelectedPlaylist();
				}
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	createPlaylist = async (playlist) => {
		this.loading = true;
		playlist.id = uuid();

		try {
			await agent.Playlists.create(playlist);
			runInAction(() => {
				// this.playlists.push(playlist); Being replaced by a JS Map Object
				this.playlistRegistry.set(playlist.id, playlist);
				this.selectedPlaylist = playlist; // selected playlist is newly created playlist so that I displays in UI
				this.editMode = false;
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updatePlaylist = async (playlist) => {
		this.loading = true;

		try {
			await agent.Playlists.update(playlist);
			runInAction(() => {
				// this.playlists = [
				// 	...this.playlists.filter((x) => x.id !== playlist.id),
				// 	playlist,
				// ];
				this.playlistRegistry.set(playlist.id, playlist);
				this.selectedPlaylist = playlist; // selected playlist is newly updated playlist so that I displays in UI
				this.loading = false;
				this.editMode = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};
}
