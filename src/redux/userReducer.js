const initialState = {
  username: "",
  gameID: "",
  gameInfo: ""
};

const SET_USERNAME = "SET_USERNAME";
const SET_GAMEID = "SET_GAMEID";
const LOAD_GAME_DETAILS = "LOAD_GAME_DETAILS";

export const setUsername = username => {
  return {
    type: SET_USERNAME,
    payload: username
  };
};

export const setGameID = gameID => {
  // console.log(gameID);
  return {
    type: SET_GAMEID,
    payload: gameID
  };
};

export const loadGameDetails = (gameInfo) => {
  return {
    type: LOAD_GAME_DETAILS,
    payload: gameInfo
  };
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case SET_GAMEID:
      return {
        ...state,
        gameID: action.payload
      };
    case LOAD_GAME_DETAILS:
      const { game_title, game_intro } = action.payload;
      return { ...state, gameInfo: game_title, game_intro };
    default:
      return state;
  }
}

export default reducer;
