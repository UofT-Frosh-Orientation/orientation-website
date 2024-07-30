import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export async function getGameSettings() {
  try {
    const response = await axios.get('/skule-hunt-game-controls');

    return response.data.settings;
  } catch (error) {
    console.error(error);
  }
}

export async function setGameSettings(setting) {
  try {
    const response = await axios.post('/skule-hunt-game-controls', setting);

    return response.data.settings;
  } catch (error) {
    console.error(error);
  }
}
