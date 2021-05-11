import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class AppStore {}

export const appStore = new AppStore();
export default appStore;
