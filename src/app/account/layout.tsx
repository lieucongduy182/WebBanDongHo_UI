import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

import { PageWrapper } from "@/components/ui/PageWrapper";
import { SideBarAccount } from "@/components/ui/SidebarAccount";
import { authOptions } from "@/utils/next-auth/next-auth-options";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="w-full h-full lg:pt-[235px] bg-gray-10">
      <PageWrapper style="pt-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <SideBarAccount />

          <div className="w-full lg:flex-1 h-full bg-white rounded-lg">
            {children}
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default UserLayout;
