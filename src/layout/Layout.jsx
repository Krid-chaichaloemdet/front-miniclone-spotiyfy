import { Outlet } from "react-router-dom";
import Nav from './Nav'
export default function Layout( ) {
    return(<>
    <div className="flex flex-col h-[100vh]">
        <div className=" flex flex-1">

        <Nav />
        <div className="flex-1 " >

        <Outlet />
        </div>
        </div>
    </div>
    </>)
}