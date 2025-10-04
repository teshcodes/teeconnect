import { Outlet, useLocation } from "react-router-dom";
import DesktopSidebar from "../components/DesktopSidebar";
import MobileSidebar from "../components/MobileSidebar";

export default function MainLayout() {
  const location = useLocation();

  const noMarginRoutes = ["/dashboard"];
  const applyMargin = !noMarginRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <MobileSidebar />
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 bg-gray-100 p-6 ${
          applyMargin ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
