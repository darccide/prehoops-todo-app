import axios from 'axios';

export const getList = () => {
  return axios
    .get('/api/tasks', {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      return res.data;
    });
};

export const addItem = (title, category) => {
  return axios
    .post(
      '/api/tasks',
      {
        title: title,
        category: category
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(res => {
      console.log(res);
    });
};

export const deleteItem = id => {
  return axios
    .delete(`/api/task/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateItem = (title, category, id) => {
  return axios
    .post(
      `/api/tasks/${id}`,
      {
        title: title,
        category: category
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(res => {
      console.log(res);
    });
};

export const toggleCompleted = id => {
  return axios.put(`/api/task/task/${id}`).then(res => {
    return res.is_complete.data;
  });
};
