import { createContext, useContext } from 'react';

export type GlobalStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (c: boolean) => void;
};
export const Store = createContext<GlobalStore>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
export const useGlobalContext = () => useContext(Store);
