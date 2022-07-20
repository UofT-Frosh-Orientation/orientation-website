import useAxios from '../../../hooks/useAxios';
const { axios } = useAxios();

export async function submitQuestion(question) {
  try {
    const response = await axios.post('/faq/create', question);
    // console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    return error.response.data.message;
  }
}
