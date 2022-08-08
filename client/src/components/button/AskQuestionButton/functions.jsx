import useAxios from '../../../hooks/useAxios';
const { axios } = useAxios();

export async function submitQuestion(question) {
  try {
    const response = await axios.post('/faq/create', question);
    return true;
  } catch (error) {
    return error.response.data.message;
  }
}
