import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import CartPage from "@/components/ui/Page/CartPage";
import { authOptions } from "@/utils/next-auth/next-auth-options";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div className="w-full h-full lg:min-h-[100vh] lg:pt-[235px] bg-gray-10">
      <CartPage />
    </div>
  );
};

export default Page;
