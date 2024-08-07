import SideNavigation from "@/app/_components/SideNavigation";

function AccountLayout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-16">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}

export default AccountLayout;
