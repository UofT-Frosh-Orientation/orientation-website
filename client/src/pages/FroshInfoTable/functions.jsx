import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();

export function getRequestedFroshData() {
  return [
    {
      firstName: 'James',
      lastName: 'Kokoska',
      bursary: 'no',
      location: 'Toronto',
    },
    {
      firstName: 'Test',
      lastName: 'Test',
      bursary: 'yes',
      location: 'N/A',
    },
    {
      firstName: 'Test2',
      lastName: 'Test2',
      bursary: 'yes',
      location: undefined,
    },
    {
      firstName: 'Test3',
      lastName: 'Test3',
      bursary: 'yes',
    },
  ];
}
