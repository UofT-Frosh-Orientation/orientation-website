import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export async function getGameSettings() {
  try {
    const response = await axios.get('/scunt-game-controls');
    console.log(response);
    return response.data.settings;
  } catch (error) {
    console.log(error);
  }
}

export async function setGameSettings(setting) {
  console.log(setting);
  try {
    const response = await axios.post('/scunt-game-controls', setting);
    console.log(response);
    return response.data.settings;
  } catch (error) {
    console.log(error);
  }
}
