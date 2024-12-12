"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { Loading } from "@/components/ui/Loading";
import { timeAgo } from "@/helpers/convert";
import { handleIsAuthenticated } from "@/helpers/handleIsAuthenticated";
import { openToastError, openToastSuccess } from "@/helpers/toast";
import { useQueryGetListComment } from "@/query/comment/queryHooksComment";
import { QueryKeysComment } from "@/query/comment/queryKeysComment";
import { useQueryGetProfile } from "@/query/profile/queryFnsProfile";
import { commentService } from "@/services/comment";
import { CommentType } from "@/types/comment";
import { ProductType } from "@/types/product";
import { queryClient } from "@/utils/react-query/react-query-provider";

import { InputComment } from "./InputComment";

interface Props {
  dataProductDetail: ProductType;
}
export const Comment = (props: Props) => {
  const { dataProductDetail } = props;

  const { status: loginStatus, data } = useSession();
  const isAuthenticated = handleIsAuthenticated(loginStatus);
  const { data: profile } = useQueryGetProfile(
    (data?.user.name as string) || "",
    isAuthenticated,
  );
  const [commentEdit, setCommentEdit] = useState<string>("");

  const { data: listComment, isLoading } = useQueryGetListComment(
    dataProductDetail.masp,
  );

  const handleEditComment = async (value: string) => {
    try {
      await commentService.editComment(commentEdit, {
        makh: profile?.makh || "",
        masp: dataProductDetail.masp,
        noidung: value,
      });

      queryClient.invalidateQueries([
        QueryKeysComment.GET_LIST_COMMENT,
        dataProductDetail.masp,
      ]);

      openToastSuccess("Chỉnh sửa thành công");
    } catch (error) {
      openToastError("Đã xảy ra lỗi, vui lòng thử lại!");
    } finally {
      setCommentEdit("");
    }
  };

  const handleDeleteComment = async (comment: CommentType) => {
    try {
      await commentService.deleteComment(comment.mabl);
      queryClient.invalidateQueries([
        QueryKeysComment.GET_LIST_COMMENT,
        comment.sanpham.masp,
      ]);

      openToastSuccess("Xoá bình luận thành công");
    } catch (error) {
      openToastError("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  const handleSubmitInput = async (value: string) => {
    try {
      await commentService.addComment({
        makh: profile?.makh || "",
        masp: dataProductDetail.masp,
        noidung: value,
      });

      queryClient.invalidateQueries([
        QueryKeysComment.GET_LIST_COMMENT,
        dataProductDetail.masp,
      ]);

      openToastSuccess("Bình luận thành công");
    } catch (error) {
      openToastError("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  const renderListComment = () => {
    if (isLoading || !listComment)
      return <Loading isCenter height="h-[200px]" />;
    return listComment.map((comment) => {
      if (comment.mabl === commentEdit) {
        return (
          <InputComment
            key={comment.mabl}
            valueEdit={comment.noidung}
            handleSubmit={handleEditComment}
          />
        );
      }
      return (
        <div
          key={comment.mabl}
          className="flex justify-between gap-4 w-full rounded-lg bg-gray-10 p-4"
        >
          <div className="flex gap-4 ">
            <div className="w-[40px] h-[40px] cursor-pointer relative">
              <Image
                src={"/images/avatar.png"}
                alt=""
                fill
                className="border-[1px] border-white border-solid rounded-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-md font-medium">
                {comment.khachhang.hoTen}{" "}
                <span className="text-sm text-gray-60">
                  {timeAgo(comment.time)}
                </span>
              </div>
              <div className="text-base">{comment.noidung}</div>

              {profile?.makh === comment.khachhang.makh && (
                <div className="flex gap-4">
                  <div
                    className="cursor-pointer text-base font-medium text-primary"
                    onClick={() => setCommentEdit(comment.mabl)}
                  >
                    Chỉnh sửa
                  </div>
                  <div
                    className="cursor-pointer text-base font-medium text-red-60"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    Xoá
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-bold ">Bình luận</p>

      <div className="flex flex-col gap-4">
        {isAuthenticated && <InputComment handleSubmit={handleSubmitInput} />}

        {renderListComment()}
      </div>
    </div>
  );
};
