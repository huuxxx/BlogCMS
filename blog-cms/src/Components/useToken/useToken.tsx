import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = tokenString !== null ? JSON.parse(tokenString) : null;
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  type TokenProp = {
    token: string;
  };

  const saveToken = ({ token: tokenParam }: TokenProp) => {
    sessionStorage.setItem('token', JSON.stringify(tokenParam));
    setToken(tokenParam);
  };

  return {
    setToken: saveToken,
    token,
  };
}
