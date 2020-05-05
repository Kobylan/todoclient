import axios from "axios";
const apiURI = "http://localhost:5000";
export const getTodos = () => {
  return async (dispatch) => {
    await axios
      .get(`${apiURI}/todo`)
      .then((result) => {
        dispatch({
          type: "GET_TODOS",
          todos: result.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const patchColumn = (order, order2) => {
  return async (dispatch) => {
    await (axios
      .patch(`${apiURI}/todo`, order)
      .then(() => {
        dispatch(getTodos());
      })
      .catch((err) => console.log(err)),
    dispatch({ type: "PATCH_COLUMN", order2 }));
  };
};
export const patchColumns = ({ sourceColumn, destColumn }) => {
  return async (dispatch) => {
    await axios
      .patch("http://localhost:5000/collums", {
        sourceColumn,
        destColumn,
      })
      .then(() => {
        dispatch(getTodos());
      })
      .catch((err) => console.log(err));
  };
};
export const changeColumns = (column) => {
  return async (dispatch) => {
    await axios
      .put("http://localhost:5000/collums", column)
      .then(() => {
        dispatch(getTodos());
      })
      .catch((err) => console.log(err));
  };
};

export const addNewTask = (task) => {
  return (dispatch) => {
    axios.post(`${apiURI}/tasks`, task).then((response) => {
      dispatch({ type: "ADD_TASK", task });
      dispatch(getTodos());
    });
  };
};

export const addNewColumn = (column) => {
  return (dispatch) => {
    axios.post(`${apiURI}/collums`, column).then((response) => {
      dispatch({ type: "ADD_COLUMN", column });
      dispatch(getTodos());
    });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    axios
      .delete(`${apiURI}/tasks`, {
        data: { id: id },
      })
      .then((response) => {
        dispatch({ type: "DELETE_TASK", id });
        dispatch(getTodos());
      });
  };
};
export const deleteColumn = (id) => {
  return (dispatch) => {
    axios
      .delete(`${apiURI}/collums`, {
        data: { id: id },
      })
      .then((response) => {
        dispatch({ type: "DELETE_COLUMN", id });
        dispatch(getTodos());
      });
  };
};
