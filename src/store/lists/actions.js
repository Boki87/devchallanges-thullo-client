import { api } from "../../utils/api";
// export const state = {
//   lists: [],
//   listsLoading: false,
//   listsError: null,
// };
export const getLists = async ({ state }, payload) => {
  const { id } = payload;
  state.lists.listsLoading = true;
  try {
    const res = await api.get(`/lists/${id}`);

    if (res.data.success) {
      state.lists.lists = res.data.data;
    } else {
      console.log("Error getting lists");
    }
    state.lists.listsLoading = false;
  } catch (err) {
    console.log(err);
    state.lists.listsLoading = false;
  }
};

export const createNewList = async ({ state }, payload) => {
  try {
    const res = await api.post(`/lists`, payload);

    if (res.data.success) {
      state.lists.lists.push(res.data.data);
    } else {
      console.log("Error creating list");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteList = async ({ state }, id) => {
  try {
    const res = await api.delete(`/lists/${id}`);

    if (res.data.success) {
      state.lists.lists = state.lists.lists.filter((l) => l._id !== id);
    } else {
      console.log("Error deleting list");
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateListTitle = async ({ state }, payload) => {
  const { id, title } = payload;
  try {
    const res = await api.put(`/lists/${id}`, { title });

    if (res.data.success) {
      let listsCopy = [...state.lists.lists];
      listsCopy.map((l) => {
        if (l._id === id) {
          l.title = title;
        }
      });
      state.lists.lists = listsCopy;
    } else {
      console.log("Error deleting list");
    }
  } catch (err) {
    console.log(err);
  }
};

export const addCardToList = async ({ state }, payload) => {
  state.lists.newCardLoading = true;
  try {
    const res = await api.post(`/cards`, payload);

    if (res.data.success) {
      let listsCopy = [...state.lists.lists];
      listsCopy.forEach((list) => {
        if (list._id == payload.listId) {
          console.log(2222, res.data.data);
          list.cards.push(res.data.data);
        }
      });

      state.lists.lists = listsCopy;
    }
    state.lists.newCardLoading = false;
  } catch (err) {
    state.lists.newCardLoading = false;
    console.log(err);
  }
};

export const reorderCards = async ({ state }, payload) => {
  const { destination, source, draggableId } = payload;
  console.log({ destination, source, draggableId });
  let listsCopy = [...state.lists.lists];
  // let removed;

  let movingCard = {
    ...state.lists.lists
      .filter((list) => list._id === source.droppableId)[0]
      .cards.filter((card) => card._id === draggableId)[0],
  };

  //remove card from its list
  listsCopy.map((list) => {
    if (list._id === source.droppableId) {
      list.cards = list.cards.filter((card) => card._id !== draggableId);
    }
    return list;
  });

  //give new position numbers to cards inside list where the card is removed
  listsCopy.map((list) => {
    if (list._id === source.droppableId) {
      list.cards.map((card, index) => {
        card.position = index;
        return card;
      });
    }
    return list;
  });

  //add card to other list at position
  listsCopy.map((list) => {
    if (list._id === destination.droppableId) {
      movingCard.listId = destination.droppableId;
      list.cards.splice(destination.index, 0, movingCard);
    }
    return list;
  });

  //give new position numbers to cards inside list where the card is added
  listsCopy.map((list) => {
    if (list._id === destination.droppableId) {
      let cardsCopy = [...list.cards];
      cardsCopy.map((card, index) => {
        card.position = index;
        return card;
      });
      list.cards = cardsCopy;
    }
    return list;
  });

  //ajax here
  let newCards = [];

  listsCopy.forEach((list) => {
    list.cards.forEach((card) => {
      newCards.push({
        _id: card._id,
        listId: card.listId,
        position: card.position,
      });
    });
  });

  let listsCopy2 = JSON.parse(JSON.stringify(listsCopy));
  let newLists = listsCopy2.map((list) => {
    let tempCards = [];
    list.cards.forEach((card) => {
      tempCards.push(card._id);
    });
    list.cards = tempCards;
    return list;
  });

  try {
    const res = await api.put(`/cards/reorder`, {
      cards: newCards,
      lists: newLists,
    });

    if (res.data.success) {
      state.lists.lists = listsCopy;
    } else {
      console.log("Error reordering cards");
    }
  } catch (err) {
    console.log(err);
  }
  //if successful run code below
  state.lists.lists = listsCopy;
};
