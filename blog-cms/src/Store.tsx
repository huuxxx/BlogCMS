import { createContext, useContext } from 'react';

export type GlobalStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (c: boolean) => void;
  userName: string;
  setUserName: (c: string) => void;
};
export const Store = createContext<GlobalStore>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userName: '',
  setUserName: () => {},
});
export const useGlobalContext = () => useContext(Store);
