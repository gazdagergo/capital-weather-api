export const checkStatusOk = response => {
  if (response.status === 200) {
    return response.data;
  }
  return response;
}



