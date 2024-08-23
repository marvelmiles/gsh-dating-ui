"use client";

import axios from "@/lib/axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const defaultUser = {
  isLogin: false,
};

export const authContext = createContext({
  currentUser: defaultUser,
  handleLogin() {},
  updateUser() {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  const getCachedUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : defaultUser;
  };

  const value = {
    isLogin: user.isLogin || !!user.id,
    async handleLogin(formData) {
      formData.provider = "google";

      const { data, success, message } = await axios.post(
        "/auth/signin",
        formData
      );

      if (!success) throw { message };

      const user = {
        ...getCachedUser(),
        ...data,
      };

      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return user;
    },
    updateUser(data) {
      data = {
        ...user,
        ...data,
      };

      localStorage.setItem("user", JSON.stringify(data));

      setUser(data);
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
