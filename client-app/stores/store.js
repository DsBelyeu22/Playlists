import { createContext, useContext } from "react";
import PlaylistStore from "./playlistStore";

export const store = {
	playlistStore: new PlaylistStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
