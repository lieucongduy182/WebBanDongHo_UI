import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: { staleTime: 0, refetchOnWindowFocus: false },
      },
      // eslint-disable-next-line prettier/prettier
    })
);
export default getQueryClient;
