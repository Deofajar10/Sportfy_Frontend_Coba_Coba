export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

export const getUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setSession = ({ token, user }) => {
  if (token) localStorage.setItem('token', token);
  if (user) localStorage.setItem('user', JSON.stringify(user));
};

export const setAuth = (token, user) => {
  setSession({ token, user });
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const logout = () => clearSession();

export const isLoggedIn = () => {
  const token = getToken();
  return Boolean(token);
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === 'ADMIN';
};
