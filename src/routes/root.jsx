import { Link, Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";

export default function Root() {
  return (
    <>
      <Sidebar content={<Outlet />} />
    </>
  );
}
