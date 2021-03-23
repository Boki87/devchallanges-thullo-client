const fakeState = [
  {
    id: 1,
    name: "Devchallenges Board",
    coverPhoto:
      "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    createdBy: {
      id: "60511da498f6ee776c48b7d1",
      name: "Test",
      photo: "",
    },
    members: [
      {
        id: 1,
        name: "Test Member 1",
        photo: "",
      },
    ],
  },
  {
    id: 2,
    name: "Simple Project Board",
    coverPhoto:
      "https://images.unsplash.com/photo-1612831197872-e4e4ca7f623f?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
    createdBy: {
      id: "60511da498f6ee776c48b7d1",
      name: "Test",
      photo: "",
    },
    members: [
      {
        id: 1,
        name: "Test Member 1",
        photo: "",
      },
    ],
  },
];

export const state = {
  boards: [],
  boardsLoading: false,
  boardsError: null,
};
