import { AppState, ContextAction, ContextActionType } from "./app.contexts";

export const reducer = (
  state: AppState,
  // eslint-disable-next-line prettier/prettier
  action: ContextAction<ContextActionType, AppState>
): AppState => {
  switch (action.type) {
    case "OPENMODAL":
      return {
        ...state,
        openModal: action.payload.openModal,
        modalProps: action.payload.modalProps,
      };

    default:
      return state;
  }
};
