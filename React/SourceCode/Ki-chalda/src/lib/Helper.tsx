import store from "../store/store";

export const isAuthenticate = () => {
  let state = store.getState();

  return state.uDetails.isAuthenticate;
};

export const userName = () => {
  const state = store.getState();
  return state.uDetails.userName;
};
export const userId = () => {
  const state = store.getState();
  return state.uDetails.userId;
};
export const access_token = () => {
  const state = store.getState();
  return state.uDetails.access_token;
};
