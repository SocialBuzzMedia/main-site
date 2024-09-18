import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <>
            <div className="flex items-center">
                <Sidebar />
                <div className="absolute top-10 lg:left-80 left-40 mx-auto right-10 mb-10">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default App;
