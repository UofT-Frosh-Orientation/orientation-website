import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getInformation() {
  return 'FAQ';
}

export async function deleteQuestion(id) {
  try {
    const response = await axios.delete(`/faq/${id}`);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function submitEdit(id, data) {
  try {
    const response = await axios.patch(`/faq/${id}`, data);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function submitQuestion(question) {
  try {
    const response = await axios.post('/faq/create-answer', question);

    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}
