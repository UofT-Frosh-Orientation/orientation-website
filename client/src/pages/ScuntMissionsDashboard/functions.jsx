import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export async function getMissionsAdmin() {
  // this gets all the missions --> hidden and non hidden
  try {
    const response = await axios.get('/scunt-missions', { params: { showHidden: true } });
    console.log(response.data.missions);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function submitMission(mission) {
  console.log(mission);
  try {
    const response = await axios.post('/scunt-missions', mission);
    console.log(response);
    return { result: true, message: response.data.message };
  } catch (error) {
    console.log(error);
    return error;
  }
}
