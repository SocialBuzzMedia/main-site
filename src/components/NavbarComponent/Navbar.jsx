import { useState } from "react";
import { NavLink } from "react-router-dom";

import navLogo from "/images/socialBuzzMedia.png";

import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import ContactModalButton from "../ContactModalButton/ContactModalButton";

const Navbar = () => {
    let Links = [
        { name: "Home", link: "/" },
        { name: "About Us", link: "/about-us" },
        { name: "Services", link: "/services" },
        { name: "Blogs", link: "/blog" },
        { name: "Contact Us", link: "/contact-us" },
    ];

    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav className="shadow-md w-full fixed top-0 left-0 right-0 z-10 bg-white">
                <div className="md:flex xl:w-3/4 w-full lg:mx-auto  py-4 px-7 lg:px-10 items-center justify-between">
                    <div className="cursor-pointer">
                        <NavLink to={`/`}>
                            <img src={navLogo} alt="" width={130} height={30} />
                        </NavLink>
                    </div>

                    <div
                        className={`lg:hidden text-3xl absolute right-8 top-4 cursor-pointer`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <MdOutlineClose size={40} />
                        ) : (
                            <RiMenu3Line fill="#ec1e24" size={40} />
                        )}
                    </div>

                    <ul
                        className={`lg:flex md:items-center text-right lg:pb-0 pb-10 absolute lg:static lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pr-0 pr-10 transition-all duration-300 ease-in  ${
                            isOpen
                                ? "top-20 opacity-100 bg-white "
                                : "top-[-490px]"
                        } lg:opacity-100 opacity-0`}
                    >
                        {Links.map((link) => (
                            <li
                                onClick={closeMenu}
                                key={link.name}
                                className="lg:ml-8 text-lg lg:my-0 my-7"
                            >
                                <NavLink
                                    to={link.link}
                                    className="text-gray-600 active:text-red-600 hover:border-b-red-600 hover:border-b-4 hover:border-solid hover:text-red-600 duration-300 font-medium "
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                        <li className="lg:ml-8 text-lg lg:my-0 my-7">
                            <ContactModalButton />
                            {/* <NavLink>Book a quick call</NavLink> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
