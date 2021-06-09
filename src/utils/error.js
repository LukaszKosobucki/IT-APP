export const logNetworkError = (error) =>
  console.error(error?.response?.data || error?.response || error);
