/**
 * A generic storage utility to handle both localStorage and cookies.
 */
export const storage = {
    /**
     * Sets data in either localStorage or cookies.
     * 
     * @param key - The key under which the data will be stored.
     * @param value - The value to be stored, which will be serialized into a string.
     * @param storageType - The type of storage to use. 'localStorage' or 'cookie'.
     * @param expiresInDays - The number of days after which the cookie will expire (only applies to cookies).
     */
    set: (
        key: string,
        value: any,
        storageType: 'localStorage' | 'cookie' = 'localStorage',
        expiresInDays?: number
    ): void => {
        if (storageType === 'localStorage') {
            setLocalStorage(key, value);
        } else if (storageType === 'cookie') {
            setCookie(key, value, expiresInDays);
        } else {
            console.error('Invalid storage type');
        }
    },

    /**
     * Retrieves data from either localStorage or cookies.
     * 
     * @param key - The key of the data to retrieve.
     * @param storageType - The type of storage to use. 'localStorage' or 'cookie'.
     * @returns The data retrieved from storage, or null if not found.
     */
    get: <T>(key: string, storageType: 'localStorage' | 'cookie' = 'localStorage'): T | null => {
        if (storageType === 'localStorage') {
            return getLocalStorage<T>(key);
        } else if (storageType === 'cookie') {
            return getCookie<T>(key);
        } else {
            console.error('Invalid storage type');
            return null;
        }
    },

    /**
     * Removes data from either localStorage or cookies.
     * 
     * @param key - The key of the data to remove.
     * @param storageType - The type of storage to use. 'localStorage' or 'cookie'.
     */
    remove: (key: string, storageType: 'localStorage' | 'cookie' = 'localStorage'): void => {
        if (storageType === 'localStorage') {
            removeLocalStorage(key);
        } else if (storageType === 'cookie') {
            removeCookie(key);
        } else {
            console.error('Invalid storage type');
        }
    },

    /**
     * Clears all data from localStorage (not supported for cookies).
     * 
     * @param storageType - The type of storage to clear. 'localStorage'.
     */
    clear: (storageType: 'localStorage' = 'localStorage'): void => {
        if (storageType === 'localStorage') {
            clearLocalStorage();
        } else {
            console.error('Clearing cookies is not supported via this function');
        }
    }
};

/**
 * Sets data in localStorage.
 * 
 * @param key - The key to store the data under.
 * @param value - The data to store.
 */
const setLocalStorage = (key: string, value: any): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting to localStorage:', error);
        }
    }
};

/**
 * Retrieves data from localStorage.
 * 
 * @param key - The key of the data to retrieve.
 * @returns The data retrieved from localStorage, or null if not found.
 */
const getLocalStorage = <T>(key: string): T | null => {
    if (typeof window !== 'undefined') {
        try {
            const value = localStorage.getItem(key);
            return value ? (JSON.parse(value) as T) : null;
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return null;
        }
    }
    return null;
};

/**
 * Removes data from localStorage.
 * 
 * @param key - The key of the data to remove.
 */
const removeLocalStorage = (key: string): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
};

/**
 * Clears all data from localStorage.
 */
const clearLocalStorage = (): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};

/**
 * Sets a cookie with an optional expiration date.
 * 
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param days - The number of days until the cookie expires.
 */
const setCookie = (name: string, value: string, days: number = 7): void => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
};

/**
 * Retrieves a cookie value by its name.
 * 
 * @param name - The name of the cookie.
 * @returns The value of the cookie, or null if not found.
 */
const getCookie = <T>(name: string): T | null => {
    const nameEq = `${name}=`;
    const ca = document.cookie.split(';');

    // Use a for-of loop for simpler iteration
    for (const c of ca) {
        const trimmedCookie = c.trim();

        // Use startsWith() instead of indexOf() for better readability
        if (trimmedCookie.startsWith(nameEq)) {
            return (decodeURIComponent(trimmedCookie.substring(nameEq.length)) as T);
        }
    }

    return null;
};


/**
 * Removes a cookie by its name.
 * 
 * @param name - The name of the cookie to remove.
 */
const removeCookie = (name: string): void => {
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - 1); // Set the date to a second in the past

    document.cookie = `${name}=; expires=${currentDate.toUTCString()}; path=/`;
};