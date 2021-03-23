import { api } from "../../utils/api";

export const getBoards = async ({ state }) => {
  state.boards.boardsLoading = true;
  try {
    const boardsRes = await api.get(`/boards`);
    if (boardsRes.data.success) {
      state.boards.boardsLoading = false;
      state.boards.boardsError = null;
      state.boards.boards = boardsRes.data.data;
    } else {
      state.boards.boardsError = boardsRes.data.error;
    }
  } catch (err) {
    state.boards.boardsLoading = false;
    state.boards.boardsError = "Can't fetch data right now";
  }
};

export const addBoard = async ({ state, actions }, payload) => {
  const { form, cb } = payload;
  console.log(1111, cb);
  state.boards.boardsLoading = true;
  try {
    const boardsRes = await api.post(`/boards`, form);
    if (boardsRes.data.success) {
      // state.boards.boardsLoading = false;
      // state.boards.boardsError = null;
      actions.boards.getBoards();
      cb();
    } else {
      state.boards.boardsError = boardsRes.data.error;
    }
  } catch (err) {
    state.boards.boardsLoading = false;
    state.boards.boardsError = "Can't fetch data right now";
  }
};
