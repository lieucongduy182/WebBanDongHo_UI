import { supplierService } from "@/services/supplier";

export const getDetailSupplierQueryFn = async (mancc: string) => {
  const { data } = await supplierService.getDetailSupplier(mancc);

  return data;
};
