import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: "23tEH7T9Z6yseijJSlRQyW",
    selectedPlaylist: null,
    currentlyPlaying: null,
    playerState: false,
    currentDevice: null,
};

const reducer = (state, action) => {
    switch(action.type){
        case reducerCases.SET_TOKEN:
            return {...state, token: action.token};
        case reducerCases.SET_PLAYLIST:
            return {...state, selectedPlaylist: action.selectedPlaylist};
        case reducerCases.SET_PLAYLIST_ID:
            return {...state, selectedPlaylistId: action.selectedPlaylistId};
        case reducerCases.SET_PLAYLISTS:
            return {...state, playlists: action.playlists};
        case reducerCases.SET_USER:
            return {...state, userInfo: action.userInfo};
        case reducerCases.SET_PLAYING:
            return {...state, currentlyPlaying: action.currentlyPlaying};
        case reducerCases.SET_PLAYER_STATE:
            return {...state, playerState: action.playerState};
        case reducerCases.SET_CURRENT_DEVICE:
            return {...state, currentDevice: action.currentDevice};
        default: 
            return state;
    }
}

export default reducer;