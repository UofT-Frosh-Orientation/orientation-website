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

export async function setVisibility(setSnackbar, startMissionNumber, endMissionNumber, visibility) {
  try {
    await axios.put('/scunt-missions/set-visibility', {
      startMissionNumber: startMissionNumber,
      endMissionNumber: endMissionNumber,
      isHidden: visibility,
    });
    console.log('this is mission', startMissionNumber, endMissionNumber, !visibility);
    if (startMissionNumber === endMissionNumber) {
      setSnackbar(
        'Mission visibility now ' + !visibility.toString() + ' for mission #' + startMissionNumber,
      );
    } else {
      setSnackbar(
        'Mission visibility now ' +
          !visibility.toString() +
          ' for mission #' +
          startMissionNumber +
          ' to #' +
          endMissionNumber.toString(),
      );
    }
    return true;
  } catch (e) {
    setSnackbar(e.toString());
  }
}

export async function deleteMission(setSnackbar, missionNumber) {
  try {
    await axios.delete(`/scunt-missions/${missionNumber}`);

    setSnackbar('Successfully deleted mission #' + missionNumber.toString());
    return true;
  } catch (e) {
    setSnackbar(e.toString());
  }
}
