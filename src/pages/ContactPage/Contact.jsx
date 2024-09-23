import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";

import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";

import { SiGooglemaps } from "react-icons/si";
import { IoIosMailUnread } from "react-icons/io";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import Headings from "../../components/HeadingComponent/Headings";
// import "./Contact.css";

import bgVideo from "/videos/bg-hero-video-e-2.mp4";

import Swal from "sweetalert2";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";

const Contact = () => {
    const [heroSection, setHeroSection] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // dotenv.config();
    useEffect(() => {
        fetch("/TagLines.json")
            .then((res) => res.json())
            .then((data) => {
                const foundTagline = data.find((tag) => tag.page === "contact");
                setHeroSection(foundTagline);
            });
    }, []);

    const [formResult, setFormResult] = useState({
        name: "",
        email: "",
        phone: "",
        business: "",
        message: "",
    });

    const handleChange = (event) => {
        setFormResult({
            ...formResult,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formUrl = import.meta.env.VITE_WEB3URL;
        const accessKey = import.meta.env.VITE_WEB3TOKEN;

        const data = {
            access_key: accessKey,
            ...formResult,
        };

        try {
            const response = await fetch(formUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success",
                    text: "You Have Successfully Submitted the Form",
                    icon: "success",
                    confirmButtonText: "Okay",
                }).then(() => {
                    window.location.href = "/contact-us";
                });
                // Clear on success submit
                setFormResult({
                    name: "",
                    email: "",
                    phone: "",
                    business: "",
                    message: "",
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Somwthing went wrong. Please try again later.",
                    icon: "error",
                    confirmButtonText: "Okay",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "An error occurred while submitting the form. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay",
            });
            console.log(error);
        }
    };

    return (
        <>
            <HelmetWrapper
                title="Contact"
                description="Contact with SocialBuzzMedia"
            />
            <HeroSection
                bgVideo={bgVideo}
                key={heroSection.id}
                heroHeading={heroSection.title}
                heroSubHeading={heroSection.description}
                overlayClassName={`home-overlay`}
            />
            <div className="lg:w-11/12 w-full flex justify-center items-center flex-col lg:flex-row gap-14 mx-auto my-4 py-5 ">
                {/* Contact Form Container */}
                <div className="about-overlay lg:w-1/2 md:w-9/12 px-5 rounded-md py-5 mx-5 ">
                    <Headings
                        title={`Feel Free to Message Us`}
                        className={`text-white mb-5`}
                    />

                    {/* Contact Form */}
                    <form
                        className="mx-auto lg:w-11/12 md:w-10/12 w-full"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="hidden"
                            name="subject"
                            value={`You have a New Contact Lead from ${formResult.name}`}
                        />
                        <div className="my-4 w-full">
                            <label
                                htmlFor="name"
                                className="block text-white w-full mb-2 text-xl"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formResult.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                required
                                className="block  w-full  px-2 py-2 rounded-lg focus:outline-none focus:ring focus:ring-red-600 focus:ring-opacity-75 transition-all"
                            />
                        </div>
                        <div className="my-4 w-full">
                            <label
                                htmlFor="email"
                                className="block text-white w-full mb-2 text-xl"
                            >
                                Email Id
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formResult.email}
                                onChange={handleChange}
                                placeholder="Enter Mail Id"
                                required
                                className="block  w-full  px-2 py-2 rounded-lg focus:outline-none focus:ring focus:ring-red-600 focus:ring-opacity-75 transition-all"
                            />
                        </div>
                        <div className="my-4 w-full">
                            <label
                                htmlFor="phone"
                                className="block text-white w-full mb-2 text-xl"
                            >
                                Phone No.
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formResult.phone}
                                onChange={handleChange}
                                placeholder="Enter Contact Number"
                                required
                                className="block  w-full  px-2 py-2 rounded-lg focus:outline-none focus:ring focus:ring-red-600 focus:ring-opacity-75 transition-all"
                            />
                        </div>
                        <div className="my-4 w-full">
                            <label
                                htmlFor="business"
                                className="block text-white w-full mb-2 text-xl"
                            >
                                Business Name
                            </label>
                            <input
                                type="text"
                                id="business"
                                name="business"
                                value={formResult.business}
                                onChange={handleChange}
                                placeholder="Enter Business Name"
                                required
                                className="block  w-full  px-2 py-2 rounded-lg focus:outline-none focus:ring focus:ring-red-600 focus:ring-opacity-75 transition-all"
                            />
                        </div>
                        <div className="my-4 w-full">
                            <label
                                htmlFor="message"
                                className="block text-white w-full mb-2 text-xl"
                            >
                                Type Your Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                value={formResult.message}
                                onChange={handleChange}
                                placeholder="Enter Your Message Here"
                                cols="30"
                                rows="10"
                                className="block  w-full  px-2 py-2 rounded-lg focus:outline-none focus:ring focus:ring-red-600 focus:ring-opacity-75 transition-all"
                            ></textarea>
                        </div>
                        <div className="my-4 w-3/4 mx-auto text-center py-7">
                            <button
                                type="submit"
                                className=" mx-auto text-center bg-white px-5 py-2 rounded-full text-xl shadow-xl "
                            >
                                Send Query
                            </button>
                        </div>
                        {/* <span>{formResult}</span> */}
                    </form>
                </div>

                {/* Contact Information */}
                <div className=" lg:w-6/12 md:w-8/12 px-5 py-5 ">
                    <div className="text-center bg-red-500 text-white my-5 text-2xl py-6 px-2 rounded-lg shadow-lg flex justify-center items-center flex-col gap-3">
                        <SiGooglemaps size={50} />
                        <h2>Our Address</h2>
                        <div className="">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.9928286030613!2d88.13703787446642!3d25.000359639647098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ae069d48233bc4d%3A0xbde8aa10611f2315!2sSocial%20Buzz%20Media!5e0!3m2!1sen!2sin!4v1723384885933!5m2!1sen!2sin"
                                width="auto"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-lg"
                            ></iframe>
                            {/* <iframe> */}
                            {/* <gmp-map
                                center="25.000347137451172,88.13961029052734"
                                zoom="14"
                                map-id="DEMO_MAP_ID"
                            >
                                <gmp-advanced-marker
                                    position="25.000347137451172,88.13961029052734"
                                    title="My location"
                                ></gmp-advanced-marker>
                            </gmp-map> */}
                            {/* </iframe> */}
                        </div>
                    </div>
                    <div className="text-center bg-red-500 text-white my-5 text-2xl py-6 px-4 rounded-lg shadow-lg flex justify-center items-center flex-col gap-3">
                        <IoIosMailUnread size={50} />
                        <h2>Email Us</h2>
                        <NavLink to={`mailto:contact@socialbuzzmedia.in`}>
                            contact@socialbuzzmedia.in
                        </NavLink>
                    </div>
                    <div className="text-center bg-red-500 text-white my-5 text-2xl py-6 px-4 rounded-lg shadow-lg flex justify-center items-center flex-col gap-3">
                        <FaPhoneSquareAlt size={50} />
                        <h2>Call Us On</h2>
                        <NavLink to={`tel:9933388955`}>9933388955</NavLink>
                    </div>
                    <div className="text-center bg-red-500 text-white my-5 text-2xl py-6 px-4 rounded-lg shadow-lg flex justify-center items-center flex-col gap-3">
                        <MdOutlineConnectWithoutContact size={50} />
                        <h2>Connect with Us</h2>
                        <div className="flex justify-center items-center">
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
                </div>
            </div>
            {/* Contact CTA Section
            <div className="bg-red-400">
                <ContactCTA
                    ctaText="Forge Your Digital Empire Now!"
                    ctaBtnText="Book an appointment"
                    ctaLink={`/book-an-appointment`}
                    ctaTextClass={`text-white`}
                />
            </div> */}
        </>
    );
};

export default Contact;
