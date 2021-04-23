import { api } from "../../utils/api";

export const addMemberToBoard = async ({ state }, payload) => {
  const { newMember, cb } = payload;

  let checkIfMember = state.boards.activeBoard.members.filter(
    (m) => m._id === newMember._id
  );

  if (checkIfMember.length > 0) {
    cb(1); //callback with error: user already member
    return;
  }
  const oldMembers = state.boards.activeBoard.members.map((m) => m._id);
  const updatedBoard = {
    // name: state.boards.activeBoard.name,
    // createdBy: state.boards.activeBoard.createdBy._id,
    members: [...oldMembers, newMember._id],
  };

  try {
    const res = await api.put(
      `/boards/${state.boards.activeBoard._id}`,
      updatedBoard
    );
    if (res.data.success) {
      state.boards.activeBoard.members.push(newMember);
      cb(); //callback with no error
    }
  } catch (err) {
    console.log(err);
    cb(2); //callback with error: thrown error
  }
};

export const resetActiveBoard = ({ state }) => {
  state.boards.activeBoard = null;
  state.boards.boardLoading = false;
  state.boards.boardError = null;
  state.lists.lists = [];
};

export const getActiveBoard = async ({ state }, id) => {
  state.boards.boardLoading = true;
  try {
    const boardRes = await api.get(`/boards/${id}`);
    if (boardRes.data.success) {
      state.boards.boardLoading = false;
      state.boards.boardError = null;
      state.boards.activeBoard = boardRes.data.data;
    } else {
      state.boards.boardError = boardRes.data.error;
    }
  } catch (err) {
    state.boards.boardLoading = false;
    state.boards.boardError = "Can't fetch data right now";
  }
};

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
  state.boards.boardsLoading = true;
  try {
    const boardsRes = await api.post(`/boards`, form);
    if (boardsRes.data.success) {
      state.boards.boardsLoading = false;
      state.boards.boardsError = null;
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

export const updateBoard = async ({ state, actions }, payload) => {
  const { updatedProps, cb } = payload;

  try {
    const res = await api.put(
      `/boards/${state.boards.activeBoard._id}`,
      updatedProps
    );
    if (res.data.success) {
      let tempBoard = {
        ...state.boards.activeBoard,
        ...updatedProps,
      };
      state.boards.activeBoard = tempBoard;

      cb(); //callback with no error
    }
  } catch (err) {
    console.log(err);

    cb(2); //callback with error: thrown error
  }
};
