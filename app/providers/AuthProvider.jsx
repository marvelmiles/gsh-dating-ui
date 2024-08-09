"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const defaultUser = {
  isLogin: false,
};

export const authContext = createContext({
  currentUser: defaultUser,
  isLogin: false,
  handleLogin() {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  const getCachedUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : defaultUser;
  };

  const value = {
    isLogin: user.isLogin || !!user.id,
    handleLogin() {
      const user = {
        ...getCachedUser(),
        isLogin: true,
      };

      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
    },
    currentUser: user,
  };

  useEffect(() => {
    setUser(getCachedUser());
  }, []);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
