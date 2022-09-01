import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export async function getMissions() {
  try {
    const response = await axios.get('/scunt-missions');
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
    return { result: true, message: response.message };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function setVisibility(setSnackbar, startMissionNumber, endMissionNumber, visibility) {
  try {
    await axios.put('/scunt-missions/set-visibility', {
      startMissionNumber: startMissionNumber,
      endMissionNumber: endMissionNumber,
      isHidden: !visibility,
    });
    setSnackbar('Successfully changed mission visibility!');
  } catch (e) {
    setSnackbar(e.toString());
  }
}

export async function deleteMission(setSnackbar, missionNumber) {
  try {
    await axios.delete(`/scunt-missions/${missionNumber}`);

    setSnackbar('Successfully deleted mission!');
  } catch (e) {
    setSnackbar(e.toString());
  }
}
