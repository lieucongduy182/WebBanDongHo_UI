import { Dispatch } from "react";

import {
  AppState,
  ContextAction,
  ContextActionType,
  OpenModalType,
} from "@/contexts/app.contexts";

export const handleCloseModal = (
  state: AppState,
  // eslint-disable-next-line prettier/prettier
  dispatch: Dispatch<ContextAction<ContextActionType, AppState>> | null
) => {
  if (!dispatch) return;

  dispatch({
    type: "OPENMODAL",
    payload: {
      ...state,
      openModal: "",
    },
  });
};

export const handleOpenModal = (
  state: AppState,
  dispatch: Dispatch<ContextAction<ContextActionType, AppState>> | null,
  openModal: OpenModalType,
  // eslint-disable-next-line prettier/prettier
  modalProps?: any
) => {
  if (!dispatch) return;

  dispatch({
    type: "OPENMODAL",
    payload: {
      ...state,
      openModal,
      modalProps,
    },
  });
};
