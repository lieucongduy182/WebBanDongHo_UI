"use client";
import React, { createContext, Dispatch, useContext } from "react";

import ToastProvider from "@/components/ui/ToastProvider";

import { reducer } from "./reducer";

export interface ContextAction<T, P> {
  type: T;
  payload: P;
}

export type ContextActionType = "OPENMODAL";

export type OpenModalType = "Signin" | "Signup" | "ForgetPassword" | "";

export interface AppState {
  isAuthenticated: boolean;
  username: string;
  openModal: OpenModalType;
  modalProps: any;
  selectIndexPosts: number;
}

interface IAppContext {
  state: AppState;
  dispatch: Dispatch<ContextAction<ContextActionType, AppState>> | null;
}

const initialState: AppState = {
  isAuthenticated: false,
  username: "",
  openModal: "",
  modalProps: {},
  selectIndexPosts: 0,
};

export const AppContext = createContext<IAppContext>({
  state: initialState,
  dispatch: null,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <ToastProvider>{children}</ToastProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext<IAppContext>(AppContext);
