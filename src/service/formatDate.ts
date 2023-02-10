export const dateFormat = (dateAccount: string): string => {
  let parts = dateAccount.split("/");
  dateAccount = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return dateAccount;
};
export const dateFormatBr = (dateAccount: string): string => {
  let data = new Date(dateAccount);
  let date = String(data.getDate()).padStart(2, "0");
  let month = String(data.getMonth() + 1).padStart(2, "0");
  let fullYear = data.getFullYear();
  let dataAtual = date + "/" + month + "/" + fullYear;
  return dataAtual;
};
