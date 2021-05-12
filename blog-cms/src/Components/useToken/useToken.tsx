import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function useToken() {
  const getToken = () => {
    const userToken = cookies.get('token');
    return userToken?.token;
  };

  type TokenProp = {
    token: string;
  };

  const saveToken = ({ token: tokenParam }: TokenProp) => {
    cookies.set('token', JSON.stringify(tokenParam));
  };
}
