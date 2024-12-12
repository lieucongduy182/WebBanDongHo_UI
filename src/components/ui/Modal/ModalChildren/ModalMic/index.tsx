import { MicWhiteIcon } from "../../../../../../public/icons";
import { ModalWrapper } from "../../ModalWrapper";

interface Props {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  transcript: string;
}
export const ModalMic = (props: Props) => {
  const { isOpenModal, handleCloseModal, transcript } = props;
  return (
    <ModalWrapper
      handleCloseModal={handleCloseModal}
      isOpenModal={isOpenModal}
      header={<></>}
      body={
        <div className="flex flex-col gap-40 w-full h-full">
          <p className="font-medium text-2xl">
            {transcript ? transcript : "Đang nghe..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-8">
            <div
              className="flex justify-center items-center relative"
              onClick={() => {
                handleCloseModal();
              }}
            >
              <div className=" bg-[#c00] rounded-full border-transparent p-10 animate-scale-micro" />
              <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <MicWhiteIcon className="h-10 w-10" />
              </div>
            </div>

            <p>Nhấn vào micro để kết thúc</p>
          </div>
        </div>
      }
      footer={<></>}
    />
  );
};
