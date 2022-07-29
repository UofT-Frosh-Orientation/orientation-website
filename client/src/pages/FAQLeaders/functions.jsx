import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getInformation() {
  return 'FAQ';
}

export async function deleteQuestion(id) {
  try {
    const response = await axios.delete(`/faq/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export function submitEdit(id, data) {
  // try {
  //   const response = await axios.patch('/faq/${id}', data);
  //   // console.log(response);
  //   return true;
  // } catch (error) {
  //   console.log(error);
  //   console.log(error.response.data.message);
  //   return error.response.data.message;
  // // }
  // console.log(data);
  // console.log(id);
  // try {
  //   const response = await axios.patch(`/faq/${id}`, data);
  //   console.log(response);
  //   return response.data;
  // } catch (error) {
  //   console.log(error);
  //   console.log(error.response.data.message);
  //   return error.response.data.message;
  // }
}

export async function submitQuestion(question) {
  // console.log(question);
  // try {
  //   const response = await axios.post('/faq/create', question);
  //   console.log(response);
  //   return response.data;
  // } catch (error) {
  //   console.log(error);
  //   console.log(error.response.data.message);
  //   return error.response.data.message;
  // }
}
