import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

// Admin App
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(`http://localhost:4000/api/auth/check`, {
                    withCredentials: true,
                });
                setIsAuthenticated(true);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? (
        <div className="flex items-center">
            <Sidebar />
            <div className="absolute top-10 lg:left-80 left-40 mx-auto right-10 mb-10">
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to={`/admin/login`} />
    );
}

export default App;
