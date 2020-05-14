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
/*------------------------------------ C O L U M N ------------------------------------*/
export const addNewColumn = (column) => {
  return (dispatch) => {
    axios.post(`${apiURI}/collums`, column).then((response) => {
      dispatch({ type: "ADD_COLUMN", column });
      dispatch(getTodos());
    });
  };
};

export const changeColumns = (column) => {
  return async (dispatch) => {
    await axios
      .put(`${apiURI}/collums`, column)
      .then(() => {
        dispatch(getTodos());
      })
      .catch((err) => console.log(err));
  };
};

export const patchColumns = ({ sourceColumn, destColumn }) => {
  return async (dispatch) => {
    await axios
      .patch(`${apiURI}/collums`, {
        sourceColumn,
        destColumn,
      })
      .then(() => {
        dispatch(getTodos());
      })
      .catch((err) => console.log(err));
  };
};

export const movingColumn = (order, order2) => {
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

/*------------------------------------ T A S K ------------------------------------*/
export const addNewTask = (task) => {
  return (dispatch) => {
    axios.post(`${apiURI}/tasks`, task).then((response) => {
      dispatch({ type: "ADD_TASK", task });
      dispatch(getTodos());
    });
  };
};

export const changeTask = (task) => {
  return async (dispatch) => {
    await axios
      .put(`${apiURI}/tasks`, task)
      .then(() => {
        dispatch(getTodos());
      })
      .catch((err) => console.log(err));
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
