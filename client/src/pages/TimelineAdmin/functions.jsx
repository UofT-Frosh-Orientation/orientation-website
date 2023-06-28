import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export async function getTimelineEvents() {
  try {
    const response = await axios.get('/timeline');
    return response.data.timelines;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteTimelineEvent(id) {
  try {
    const response = await axios.delete(`/timeline/${id}`);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function editTimelineEvent(id, data) {
  try {
    const response = await axios.patch(`/timeline/${id}`, data);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function createTimelineEvent(event) {
  try {
    const response = await axios.post('/timeline', event);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}
