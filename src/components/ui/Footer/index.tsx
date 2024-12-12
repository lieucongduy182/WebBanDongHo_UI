import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

import { PageWrapper } from "../PageWrapper";

export interface InformationType {
  id: string;
  title: string;
  contents: ContentsInformationType[];
}

export interface ContentsInformationType {
  name: string;
}

export const listInformation: InformationType[] = [
  {
    id: "service",
    title: "Dịch vụ",
    contents: [
      {
        name: "Sửa chữa",
      },
      {
        name: "Trang trí",
      },
    ],
  },
  {
    id: "feature",
    title: "Hoạt động",
    contents: [
      {
        name: "Tin tức",
      },
      {
        name: "Về chúng tôi",
      },
      {
        name: "Giải pháp",
      },
      {
        name: "Điều khoản và điều kiện",
      },
    ],
  },
  {
    id: "policy",
    title: "Chính sách",
    contents: [
      {
        name: "Chính sách thanh toán",
      },
      {
        name: "Chính sách vận chuyển",
      },
      {
        name: "Chính sách bảo hành",
      },
      {
        name: "chính sách kiểm hàng, đổi trả, hoàn tiền",
      },
      {
        name: "Chính sách bảo mật",
      },
    ],
  },
  {
    id: "provider",
    title: "Nhà cung cấp",
    contents: [
      {
        name: "Hải triều",
      },
      {
        name: "Shop Đồng hồ",
      },
      {
        name: "VINWATCH",
      },
    ],
  },
];

const Footer = () => {
  return (
    <>
      <PageWrapper backgroundColor={"bg-gray-10"}>
        <div className="lg:py-10 text-md font-normal">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[24px] px-4 py-6 lg:py-0 lg:px-0">
            {listInformation.map(
              (information: InformationType, index: number) => (
                <div key={index}>
                  <p className="mb-4 text-xl font-bold">{information.title}</p>

                  {information.contents.map(
                    (content: ContentsInformationType, index: number) => (
                      <div
                        key={index}
                        className={`${
                          content.name
                            ? "mb-4"
                            : index + 1 < information.contents.length
                              ? "mb-[15px]"
                              : ""
                        }`}
                      >
                        {content.name && (
                          <p className="leading-[150%]">{content.name}</p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Footer;
