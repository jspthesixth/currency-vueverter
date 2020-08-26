import * as jwt_decode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('appToken');

  if (token !== undefined && token !== null) {
    const decodedToken = jwt_decode(token, { complete: true });
    const date = new Date();

    if (decodedToken.exp > date.getTime() / 1000) {
      return true;
    }
  }
  return false;
};
