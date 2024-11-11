import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative h-full">
      {/* <SideBar /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
