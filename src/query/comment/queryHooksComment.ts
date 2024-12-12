import { useQuery } from "@tanstack/react-query";

import { CommentType } from "@/types/comment";

import { getListCommentQueryFn } from "./queryFnsComment";
import { QueryKeysComment } from "./queryKeysComment";

export const useQueryGetListComment = (masp: string) =>
  useQuery<CommentType[]>({
    queryKey: [QueryKeysComment.GET_LIST_COMMENT, masp],
    queryFn: () => getListCommentQueryFn(masp),
    placeholderData: [],
    enabled: !!masp,
  });
