import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = tokenString !== null ? JSON.parse(tokenString) : null;
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  type TokenProp = {
    userToken: string;
  };

  const saveToken = ({ userToken }: TokenProp) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
