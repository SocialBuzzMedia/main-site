import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_LOCAL_URL}/api/auth/login`,
                { email, password },
                { withCredentials: true }
            );
            if (res.status === 200) {
                navigate("/admin/dashboard");
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-3/12 border-red-300 border"
            >
                <h2 className="text-2xl text-center text-red-500 font-semibold mb-4">
                    Admin Login
                </h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        className="border border-gray-300 p-2 w-full"
                        placeholder="User Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-300 p-2 w-full"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded-full w-full"
                    type="submit"
                >
                    Login
                </button>
                <div className="my-3 text-center">
                    Not registered{" "}
                    <NavLink
                        to={`/admin/register`}
                        className="text-red-500 underline"
                    >
                        {" "}
                        Register Here{" "}
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;
