import { NavLink } from "react-router-dom";

import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import navLogo from "/images/socialBuzzMedia.png";

const Footer = () => {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    let Links = [
        { name: "Privacy Policy", link: "/privacy-policy" },
        { name: "Terms & Conditions", link: "/term-and-condition" },
        { name: "Career", link: "/career" },
        { name: "Contact Us", link: "/contact-us" },
    ];
    return (
        <>
            <div className="md:w-3/4 mx-auto py-8">
                <div className="flex lg:flex-row flex-col justify-between items-center gap-8 ">
                    <div className="cursor-pointer md:mr-8">
                        <NavLink to={`/`}>
                            <img src={navLogo} alt="" width={130} height={30} />
                        </NavLink>
                    </div>
                    <div className="flex md:flex-row flex-col justify-center items-center gap-4">
                        {Links.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.link}
                                className="text-gray-600 hover:text-red-600 duration-300 font-medium sm:text-sm xl:text-lg text-center mx-6 "
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="flex flex-row md:ml-8">
                        <NavLink
                            to={`https://www.facebook.com/Thesocialbuzzmedia`}
                            className={`mx-2`}
                        >
                            <BsFacebook size={40} />
                        </NavLink>
                        <NavLink
                            to={`https://www.instagram.com/soicalbuzzmedia/`}
                            className={`mx-2`}
                        >
                            <BsInstagram size={40} />
                        </NavLink>
                        <NavLink
                            to={`https://www.linkedin.com/company/socialbuzzmedia`}
                            className={`mx-2`}
                        >
                            <BsLinkedin size={40} />
                        </NavLink>
                    </div>
                </div>
                <div className="py-6 w-3/4 mx-auto">
                    <hr className="border-red-300" />
                </div>
                <div className="text-center md:text-xl">
                    &copy; {getCurrentYear()} All Rights Reserved |{" "}
                    <span className="text-red-500">Social Buzz Media</span>
                </div>
            </div>
        </>
    );
};

export default Footer;
