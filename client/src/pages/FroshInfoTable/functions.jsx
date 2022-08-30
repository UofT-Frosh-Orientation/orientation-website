import exportFromJSON from 'export-from-json';
import { fields } from '../Registration/RegistrationFields';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getUneditableFields() {
  let noEditFields = [];
  for (let key1 of Object.keys(fields)) {
    for (let key2 of Object.keys(fields[key1])) {
      if (fields[key1][key2].noEdit) {
        noEditFields.push(key2);
      }
    }
  }
  return noEditFields;
}

export function downloadDataAsXML(data) {
  const fileName = 'froshData';
  let fields = [];
  const exportType = 'xml';
  exportFromJSON({ data, fileName, fields, exportType });
}

export async function deleteUser(id) {
  try {
    const response = await axios.delete(`/user/${id}`);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}
