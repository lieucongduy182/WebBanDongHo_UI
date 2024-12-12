import Image from "next/image";
import Link from "next/link";

import { PageWrapper } from "@/components/ui/PageWrapper";

const NotFound = () => {
  return (
    <div className="w-full h-full lg:pt-[235px] bg-gray-10">
      <PageWrapper style="pt-[100px] pb-[64px] w-full">
        <div className="flex flex-col justify-center items-center gap-4 lg:gap-6">
          <div className=" h-full w-full sm:w-[548px]">
            <Image
              src="/images/not-found.png"
              alt=""
              height={548}
              width={370}
              className="h-auto w-full"
              quality={100}
            />
          </div>

          <div className="flex flex-col gap-4 justify-center text-center max-w-[535px]">
            <h1 className="text-3xl lg:text-4xl font-bold">Page Not Found</h1>
            <p className="text-center font-normal text-base lg:text-md text-gray-60">
              Chúng tôi rất tiếc, không thể tìm thấy ghi chú trang bạn yêu cầu.
              Vui lòng quay lại trang chủ
            </p>
          </div>
        </div>

        <div className="flex justify-center lg:mt-12 mt-8">
          <Link
            href={"/"}
            className="px-8 py-4 bg-primary text-white text-center font-bold text-md rounded-[100px]"
          >
            Trang chủ
          </Link>
        </div>
      </PageWrapper>
    </div>
  );
};

export default NotFound;
