import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import Sidebar from "../sidebar/sidebar";

function LayoutAdmin() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = (): void => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main className="flex-grow-1">
        <div className="p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LayoutAdmin;