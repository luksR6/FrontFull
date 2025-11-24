import { Outlet } from "react-router-dom";

function LayoutLogin() {
  return (
    <div className="login-layout-container">
      <Outlet />
    </div>
  );
}

export default LayoutLogin;