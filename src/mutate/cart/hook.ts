import { useMutation } from "@tanstack/react-query";

import { openToastError, openToastSuccess } from "@/helpers/toast";
import { QueryKeysCart } from "@/query/cart/queryKeysCart";
import { cartService } from "@/services/cart";
import { AddCartForm } from "@/types/cart";
import { queryClient } from "@/utils/react-query/react-query-provider";

import { MutateKeyCart } from "./key";

export const useMutationAddCart = () =>
  useMutation({
    mutationKey: [MutateKeyCart.ADD_CART],
    mutationFn: (formData: AddCartForm) => cartService.addCart(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeysCart.GET_ALL_CART_USER]);
    },
    onError: () => {
      openToastError(
        // eslint-disable-next-line prettier/prettier
        "Thêm sản phẩm vào giỏ hàng thất bại, vui lòng thử lại sau!"
      );
    },
  });
