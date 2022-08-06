import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export async function getTimelineEvents() {
  try {
    const response = await axios.get('/timeline');
    return response.data.timelines;
  } catch (error) {
    console.log('Error', error.message);
    return [];
  }
}

export async function deleteTimelineEvent(id) {
  try {
    const response = await axios.delete(`/timeline/${id}`);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function editTimelineEvent(id, data) {
  try {
    const response = await axios.patch(`/timeline/${id}`, data);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createTimelineEvent(event) {
  console.log(event);
  try {
    const response = await axios.post('/timeline/create', event);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}
