'use client';

import { useEffect, useState } from 'react';

export type AdminAuthState = {
  adminAuthToken: string | null;
  adminExists: boolean;
};

const ADMIN_AUTH_TOKEN_KEY = 'adminAuthToken';
const ADMIN_EXISTS_KEY = 'adminExists';

/**
 * Reads admin auth info from localStorage.
 * Expects `adminAuthToken` (string) and `adminExists` (boolean-ish) to be saved when logged in.
 */
export default function useAdminToken(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    adminAuthToken: null,
    adminExists: false,
  });

  useEffect(() => {
    const token =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(ADMIN_AUTH_TOKEN_KEY)
        : null;

    const adminExistsRaw =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(ADMIN_EXISTS_KEY)
        : null;

    // Support both boolean and stringified boolean
    const adminExists =
      adminExistsRaw === 'true' ||
      adminExistsRaw === '1' ||
      adminExistsRaw === 'yes' ||
      adminExistsRaw === 'on';

    setState({
      adminAuthToken: token,
      adminExists,
    });
  }, []);

  return state;
}

