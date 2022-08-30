import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();

export async function submitBribePoints(req) {
  // req consists of an object with properties "teamNumber" and "points"
  console.log(req);
  try {
    const response = await axios.post('/scunt-teams/transaction/bribe', req);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}
