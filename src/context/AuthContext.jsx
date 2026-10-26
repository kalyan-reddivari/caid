import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { ACCESS_KEY, TOKEN_KEY, USER_KEY } from '../api/client.js';

const AuthContext = createContext(null);

function readStored(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch {
    return null;
  }
}

const NO_ACCESS = { permissions: [], assignableRoles: [] };

/**
 * Who is signed in and what they may do.
 *
 * `can('PAYROLL_WRITE')` decides which screens and buttons to show. It is a convenience only: the server checks
 * every request against the user's role, so hiding a button here never grants or removes real access.
 */
export function AuthProvider({ children }) {
  const signedIn = !!localStorage.getItem(TOKEN_KEY);
  const [user, setUser] = useState(() => (signedIn ? readStored(USER_KEY) : null));
  // { permissions: string[], assignableRoles: string[] } or null while it has not been loaded yet.
  const [access, setAccess] = useState(() => (signedIn ? readStored(ACCESS_KEY) : null));

  const saveUser = useCallback((u) => {
    setUser(u);
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
  }, []);

  const saveAccess = useCallback((a) => {
    setAccess(a);
    if (a) localStorage.setItem(ACCESS_KEY, JSON.stringify(a));
  }, []);

  const loadAccess = useCallback(async () => {
    const { data } = await api.get('/auth/permissions');
    saveAccess({ permissions: data.permissions || [], assignableRoles: data.assignableRoles || [] });
  }, [saveAccess]);

  // On every page load, re-read the role and permissions so a change made by an administrator shows up.
  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return;
    api.get('/auth/me').then((r) => saveUser(r.data)).catch(() => {});
    loadAccess().catch(() => setAccess((prev) => prev || NO_ACCESS));
  }, [loadAccess, saveUser]);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    saveUser(data.user);
    saveAccess({ permissions: data.permissions || [], assignableRoles: [] });
    await loadAccess().catch(() => {});
    return data.user;
  }, [saveUser, saveAccess, loadAccess]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_KEY);
    setUser(null);
    setAccess(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await api.get('/auth/me');
    saveUser(data);
    return data;
  }, [saveUser]);

  const hasRole = useCallback((...roles) => !!user && roles.includes(user.role), [user]);

  // True if the user holds at least one of the named permissions.
  const can = useCallback(
    (...permissions) => !!user && !!access && permissions.some((p) => access.permissions.includes(p)),
    [user, access]
  );

  const value = useMemo(
    () => ({
      user,
      ready: !!access,
      permissions: access?.permissions ?? [],
      assignableRoles: access?.assignableRoles ?? [],
      can, hasRole, login, logout, refreshUser, setUser: saveUser,
    }),
    [user, access, can, hasRole, login, logout, refreshUser, saveUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
