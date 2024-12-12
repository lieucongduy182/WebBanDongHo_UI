import { commentService } from "@/services/comment";

export const getListCommentQueryFn = async (masp: string) => {
  const { data } = await commentService.getListCommentByProduct(masp);

  return data;
};
