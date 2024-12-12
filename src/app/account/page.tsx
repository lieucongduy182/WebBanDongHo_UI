import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/next-auth/next-auth-options";

const AccountPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/account/account-profile");
    // redirect("/account/orders");
  } else {
    redirect("/");
  }
};

export default AccountPage;
