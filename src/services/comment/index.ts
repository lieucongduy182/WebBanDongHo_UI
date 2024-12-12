import { CommentFormType } from "@/types/comment";

import axiosClient from "..";

export const commentService = {
  getListCommentByProduct: (masp: string) =>
    axiosClient.get(`/binhluan/${masp}`),

  addComment: (formData: CommentFormType) =>
    axiosClient.post(`/binhluan`, formData),
  editComment: (mabl: string, formData: CommentFormType) =>
    axiosClient.put(`/binhluan/${mabl}`, formData),

  deleteComment: (mabl: string) => axiosClient.delete(`/binhluan/${mabl}`),
};
