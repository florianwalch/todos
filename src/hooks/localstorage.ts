import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

const { localStorage } = window;

/**
 * Read content from localStorage for given key
 *
 * @param {string} key - name of storage item
 */
function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item != null ? JSON.parse(item) : /* istanbul ignore next */ null;
  } catch (ex) /* istanbul ignore next */ {
    console.error('LocalStorage not available.');
    return null;
  }
}

/**
 * Store value to localStorage.
 *
 * @param {string} key - name of storage item
 * @param {any} value - item to store
 */
function setItem<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (ex) /* istanbul ignore next */ {
    console.error('LocalStorage not available.');
  }
}

/**
 * Hook to read/write items to the browsers localStorage.
 *
 * @param key - name of item
 * @param defaultValue - default value
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  // define state
  const [value, setValue] = useState<T>(
    getItem(key) || /* istanbul ignore next */ defaultValue,
  );

  // update value in localStorage if it has changed
  useEffect(() => {
    setItem(key, value);
  }, [key, value]);

  // return state
  return [value, setValue];
}
