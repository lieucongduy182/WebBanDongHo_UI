"use client";
import { SnackbarProvider } from "notistack";
import { PropsWithChildren } from "react";

interface ToastProviderProps extends PropsWithChildren {}

const ToastProvider = (props: ToastProviderProps) => {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default ToastProvider;
