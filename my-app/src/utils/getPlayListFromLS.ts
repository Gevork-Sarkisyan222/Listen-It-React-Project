export const getPlayListFromLS = () => {
  const data = localStorage.getItem('playlist');
  return data ? JSON.parse(data) : [];
};
