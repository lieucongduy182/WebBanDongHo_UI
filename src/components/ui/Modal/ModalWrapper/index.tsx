import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";

import { CloseIcon } from "../../../../../public/icons";

interface Props {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  showClose?: boolean;
  panelClassName?: string;
}

export const ModalWrapper = (props: Props) => {
  const {
    isOpenModal,
    handleCloseModal,
    header,
    body,
    footer,
    showClose = true,
    panelClassName = "overflow-hidden",
  } = props;

  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog as="div" className="relative z-[1025]" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  `w-[580px] m-w-[90%] transform  rounded-3xl bg-gray-10 px-6 sm:px-12 py-12 text-left align-middle shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] transition-all`,
                  panelClassName,
                )}
              >
                {showClose && (
                  <CloseIcon
                    className="h-8 w-8 stroke-black stroke-[2px] absolute top-4 right-4 cursor-pointer"
                    onClick={() => handleCloseModal()}
                  />
                )}

                {header}

                {body}

                {footer}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
