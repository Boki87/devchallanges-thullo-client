const user = localStorage.getItem("thullo-user");

export const state = {
  user: user ? JSON.parse(user) : null,
  userLoading: false,
  userError: null,
};
