import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getInformation() {
  return 'FAQ';
}

export async function deleteQuestion(id) {
  try {
    const response = await axios.delete(`/faq/${id}`);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function submitEdit(id, data) {
  try {
    const response = await axios.patch(`/faq/${id}`, data);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function submitQuestion(question) {
  console.log(question);
  try {
    const response = await axios.post('/faq/create', question);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}
