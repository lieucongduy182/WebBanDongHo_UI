"use client";

import { ModalForgetPassword } from "./ModalChildren/ModalForgetPassword";
import { ModalSignin } from "./ModalChildren/ModalSignin";
import { ModalSignup } from "./ModalChildren/ModalSignup";

export const Modal = () => {
  return (
    <>
      <ModalSignin />

      <ModalSignup />

      <ModalForgetPassword />

      {/* <ModalConfirm /> */}
    </>
  );
};
