import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/socialBuzzMedia.png";
import smallLogo from "../assets/socialBuzzMedia-small.png";
import { ImBlog } from "react-icons/im";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { TbDeviceVisionPro, TbListDetails } from "react-icons/tb";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";

const Sidebar = () => {
    const navigate = useNavigate();

    // Handle Logout
    const handleLogout = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_LOCAL_URL}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
            Swal.fire({
                title: "Logged Out Successfully",
                icon: "success",
                confirmButtonText: "Okay",
                confirmButtonColor: "red",
            });

            navigate("/admin/login");
        } catch (error) {
            console.log("Logout Failed", error);
        }
    };
    return (
        <div>
            <div className="lg:w-52 w-20 fixed top-0 bottom-0 left-0 bg-white border-r-[1px] border-gray-200">
                <div className="my-10 px-4">
                    <NavLink to={"/admin"}>
                        <img
                            src={logo}
                            alt="Social Buzz Media Admin Desk"
                            className="lg:block hidden"
                        />
                        <img
                            src={smallLogo}
                            alt="Social Buzz Media Admin Desk"
                            width={100}
                            className="lg:hidden block"
                        />
                    </NavLink>
                </div>
                <div className=" mb-4">
                    <button
                        className="flex items-center gap-2 mx-auto text-red-500 rounded-full border border-red-500 px-3 py-2 shadow-md"
                        onClick={handleLogout}
                    >
                        {" "}
                        <IoLogOut size={40} />
                        <span className="lg:block hidden">Logout</span>
                    </button>
                </div>
                <hr className="mb-10 shadow-md" />
                <ul className="flex flex-col gap-5 mx-4">
                    <li className="mb-3">
                        <Link
                            to="/admin/edit-blog"
                            className="text-lg hover:text-gray-400 flex items-center"
                        >
                            <span className="me-4">
                                <ImBlog size={30} />
                            </span>
                            <p className="lg:block hidden">Edit Blog</p>
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link
                            to="/admin/edit-about"
                            className="text-lg hover:text-gray-400 flex items-center"
                        >
                            <span className="me-4">
                                <IoMdInformationCircleOutline size={30} />
                            </span>
                            <p className="lg:block hidden">Edit About Card</p>
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link
                            to="/admin/edit-vision-mission"
                            className="text-lg hover:text-gray-400 flex items-center"
                        >
                            <span className="me-4">
                                <TbDeviceVisionPro size={30} />
                            </span>
                            <p className="lg:block hidden">
                                Edit Vision & Mission
                            </p>
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link
                            to="/admin/edit-services"
                            className="text-lg hover:text-gray-400 flex items-center"
                        >
                            <span className="me-4">
                                <MdOutlineMiscellaneousServices size={30} />
                            </span>
                            <p className="lg:block hidden">Edit Services</p>
                        </Link>
                    </li>
                    <li className="mb-3">
                        <Link
                            to="/admin/edit-employees"
                            className="text-lg hover:text-gray-400 flex items-center"
                        >
                            <span className="me-4">
                                <TbListDetails size={30} />
                            </span>
                            <p className="lg:block hidden">
                                Edit Employee Details
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
