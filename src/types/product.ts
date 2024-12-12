import { BrandType } from "./brand";
import { CategoryType } from "./category";
import { SupplierType } from "./supplier";

export interface ProductType {
  masp: string;
  tensp: string;
  slug: string;
  soluong: number;
  dongia: number;
  chitietSP: string;
  image: string;
  image2: string;
  image3: string;
  trangthai: number;
  thuonghieu: BrandType;
  danhmuc: CategoryType;
  nhacungcap: SupplierType;
}
