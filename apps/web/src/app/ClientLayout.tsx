"use client";

import { usePathname } from "next/navigation";
import { TopMenu } from "../components/TopMenu";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPage = pathname === "/login";

  return (
    <>
      {!isPublicPage && <TopMenu />}
      <div className={isPublicPage ? "flex-1 flex flex-col justify-center items-center h-full w-full mt-[-6rem]" : ""}>
        {children}
      </div>
    </>
  );
}
