// eslint-disable-next-line import/no-named-as-default
import appStore, { AppStore } from './useAppStore/appStore';

export function useAppStore(): AppStore {
  return appStore;
}
