import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

import { ModalWrapper } from "../../ModalWrapper";

interface Props {
  title: string;
  description?: string | ReactNode;
  form: ReactNode;
  isShowSocials?: boolean;
  closeModal: () => void;
  isOpen: boolean;
}

export const ModalLayoutAuth = (props: Props) => {
  const { title, description, form, closeModal, isOpen } = props;

  return (
    <ModalWrapper
      handleCloseModal={closeModal}
      isOpenModal={isOpen}
      header={
        <>
          <Dialog.Title
            as="p"
            className="text-3xl lg:text-4xl font-bold text-black mb-2 text-center"
          >
            {title}
          </Dialog.Title>

          {description && (
            <Dialog.Description
              as={"p"}
              className={"font-normal text-black text-center"}
            >
              {description}
            </Dialog.Description>
          )}
        </>
      }
      body={form}
      footer={<></>}
    />
  );
};
