// localStorageUtils.ts

export const saveIsAddIconVisibleToLocalStorage = (
  title: string,
  author: string,
  value: boolean,
) => {
  localStorage.setItem(`isAddIconVisible-${title}-${author}`, JSON.stringify(value));
};

export const saveIsCheckIconVisibleToLocalStorage = (
  title: string,
  author: string,
  value: boolean,
) => {
  localStorage.setItem(`isCheckIconVisible-${title}-${author}`, JSON.stringify(value));
};
