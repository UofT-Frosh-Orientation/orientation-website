import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();

export async function submitBribePoints(req) {
  // req consists of an object with properties "teamNumber" and "points"

  try {
    const response = await axios.post('/scunt-teams/transaction/bribe', req);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}
