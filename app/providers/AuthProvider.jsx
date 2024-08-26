"use client";

import Loading from "@/components/Loading";
import axios, { createRelativeUrl } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getDisplayName } from "../utils";

export const defaultUser = {
  isLogin: false,
  profileCover: [],
  id: "",
  bio: {},
};

export const authContext = createContext({
  currentUser: defaultUser,
  async handleLogin() {},
  async handleLogout() {},
  updateUser() {},
  memUpdateUser() {},
});

const getCachedUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : defaultUser;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  const value = {
    isLogin: user.isLogin || !!user.id,
    async handleLogin(formData) {
      // formData.provider = "google";

      const { data, success, message } = await axios.post(
        "/auth/signin?rememberMe=true",
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
    async handleLogout(data) {
      try {
        const res = await axios.post("/auth/signout", data);

        if (!res.success) throw res;
      } catch (err) {}

      localStorage.removeItem("user");

      setUser(defaultUser);
    },
    updateUser(data) {
      data = {
        ...user,
        ...data,
      };

      localStorage.setItem("user", JSON.stringify(data));

      setUser(data);
    },
    memUpdateUser(data) {
      setUser({
        ...user,
        ...data,
      });
    },
    currentUser: user,
  };

  useEffect(() => {
    setUser(getCachedUser());
  }, []);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const withAuth = (WrappedComponent) => {
  const Comp = (props) => {
    const [isAuth, setIsAuth] = useState(false);

    const router = useRouter();

    const auth = useAuth();

    useEffect(() => {
      const isLogin = getCachedUser()?.isLogin;

      if (isLogin) setIsAuth(true);
      else
        router.replace(
          `/auth/login?redirect=${createRelativeUrl()}&timedout=true`
        );
    }, [router]);

    if (isAuth) return <WrappedComponent {...props} auth={auth} />;

    return <Loading fullScreen />;
  };

  Comp.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return Comp;
};

export const useAuth = () => useContext(authContext);

AuthProvider.displayName = "AuthProvider";

export default AuthProvider;
