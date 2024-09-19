import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${import.meta.env.VITE_LOCAL_URL}/api/auth/register`,
                { username, email, password, confirmPassword }
            );
            navigate(`/admin/login`);
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
                <h2 className="text-2xl text-red-500 font-semibold mb-4 text-center ">
                    Admin Register
                </h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-gray-300 p-2 w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="border border-gray-300 p-2 w-full"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="border border-gray-300 p-2 w-full"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        className="border border-gray-300 p-2 w-full"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-full w-full"
                >
                    Register
                </button>
                <div className="my-3 text-center">
                    Already Registered{" "}
                    <NavLink
                        to={`/admin/login`}
                        className="text-blue-500 font-semibold underline"
                    >
                        Login Here
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Register;
