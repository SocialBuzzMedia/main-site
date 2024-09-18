import { Link, NavLink } from "react-router-dom";
import logo from "../assets/socialBuzzMedia.png";
import smallLogo from "../assets/socialBuzzMedia-small.png";
import { ImBlog } from "react-icons/im";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { TbDeviceVisionPro, TbListDetails } from "react-icons/tb";
import { MdOutlineMiscellaneousServices } from "react-icons/md";

const Sidebar = () => {
    return (
        <div>
            <div className="lg:w-52 w-20 fixed top-0 bottom-0 left-0 bg-white">
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
