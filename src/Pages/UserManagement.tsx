import UserManagementDesktop from "./UserManagementDesktop";
import UserManagementMobile from "./UserManagementMobile";

export default function UserManagement() {
  return (
    <>
      {/* Desktop view */}
      <div className="hidden lg:block">
        <UserManagementDesktop />
      </div>

      {/* Mobile & Tablet view */}
      <div className="block lg:hidden">
        <UserManagementMobile />
      </div>
    </>
  );
}
