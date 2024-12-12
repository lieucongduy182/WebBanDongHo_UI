/* eslint-disable prettier/prettier */
import {
  enqueueSnackbar,
  SnackbarMessage,
  SnackbarOrigin,
  VariantType,
} from "notistack";

export const openToast = (
  variant: VariantType,
  message: SnackbarMessage,
  anchorOrigin: SnackbarOrigin = {
    horizontal: "center",
    vertical: "bottom",
  }
) => {
  return enqueueSnackbar({
    variant,
    message,
    anchorOrigin,
  });
};

export const openToastSuccess = (
  message: SnackbarMessage,
  anchorOrigin: SnackbarOrigin = {
    horizontal: "center",
    vertical: "bottom",
  }
) => {
  return openToast("success", message, anchorOrigin);
};

export const openToastError = (message: SnackbarMessage) => {
  return openToast("error", message);
};

export const openToastWarning = (message: SnackbarMessage) => {
  return openToast("warning", message);
};

export const openToastInfo = (
  message: SnackbarMessage,
  anchorOrigin: SnackbarOrigin = {
    horizontal: "center",
    vertical: "bottom",
  }
) => {
  return openToast("info", message, anchorOrigin);
};
