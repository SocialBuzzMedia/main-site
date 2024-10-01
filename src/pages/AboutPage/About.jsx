// import AboutUsSections from "../../components/AboutUsComponent/AboutUsSections";
import Headings from "../../components/HeadingComponent/Headings";
import HeroSection from "../../components/HeroSection/HeroSection";
import ContactCTA from "../../components/ContactCTAButton/ContactCTA";
// import image from "/images/strategy.jpg";

import bgVideo from "/videos/bg-hero-video-c.mp4";

import axios from "axios";
import { useEffect, useState } from "react";
import Teams from "../../components/TeamsComponent/Teams";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";
import AboutCard from "../../components/AboutCardComponent/AboutCard";

const About = () => {
    const [aboutSection, setAboutSection] = useState([]);
    const [employeeSection, setEmployeeSection] = useState([]);
    const [heroSection, setHeroSection] = useState([]);
    const [vision, setVision] = useState([]);
    const [mission, setMission] = useState([]);

    // to move to the top of the page on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetching taglines
    useEffect(() => {
        fetch("/TagLines.json")
            .then((res) => res.json())
            .then((data) => {
                const foundTagline = data.find((tag) => tag.page === "about");
                setHeroSection(foundTagline);
            });
    }, []);

    // Fetching about us sections
    useEffect(() => {
        const fetchAbout = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_LOCAL_URL}/api/about`
            );
            setAboutSection(response.data);
        };
        fetchAbout();
    }, []);

    // Fetch our teams section data
    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_LOCAL_URL}/api/employee`
            );
            setEmployeeSection(response.data);
        };
        fetchEmployee();
    }, []);

    useEffect(() => {
        fetchVisionAndMission();
    });

    const fetchVisionAndMission = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_LOCAL_URL}/api/vision-mission`
            );
            const visionData = response.data.filter(
                (item) => item.type === "vision"
            );
            const missionData = response.data.filter(
                (item) => item.type === "mission"
            );
            setVision(visionData);
            setMission(missionData);
        } catch (error) {
            console.log("Error fetching Vision and Mission", error);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <HelmetWrapper
                title="About"
                description="Welcome to the About page of Social Buzz Media. Learn How we grow and our clients grow with us. Our main mission and our broad vision behind the successful journey towards a reputed digital marketing agency."
            />
            <div>
                <HeroSection
                    bgVideo={bgVideo}
                    key={heroSection.id}
                    heroHeading={heroSection.title}
                    heroSubHeading={heroSection.description}
                    overlayClassName={`home-overlay`}
                />
            </div>

            {/* Our Vision */}
            <div className="mt-5">
                {mission.map((item) => (
                    <div className="md:w-11/12 mx-auto" key={item._id}>
                        <div
                            className={`flex justify-center items-center gap-11 py-10`}
                        >
                            <div className="lg:block hidden">
                                <img
                                    src={`${import.meta.env.VITE_LOCAL_URL}${
                                        item.image
                                    }`}
                                    alt={item.title}
                                />
                            </div>
                            <div className="lg:w-6/12 w-9/12 mx-auto">
                                <p className={`text-6xl mb-5 font-medium`}>
                                    {item.title}
                                </p>
                                <p className={`text-lg text-justify`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="w-9/12 mx-auto" />

            {/* Our Mission */}
            <div className="mt-5 mb-3">
                {vision.map((item) => (
                    <div className="md:w-11/12 mx-auto" key={item._id}>
                        <div
                            className={`flex justify-center flex-row-reverse items-center gap-11 py-10`}
                        >
                            <div className="lg:block hidden">
                                <img
                                    src={`${import.meta.env.VITE_LOCAL_URL}${
                                        item.image
                                    }`}
                                    alt={item.title}
                                />
                            </div>
                            <div className="lg:w-6/12 w-9/12 mx-auto">
                                <p className={`text-6xl mb-5 font-medium`}>
                                    {item.title}
                                </p>
                                <p className={`text-lg text-justify`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="w-9/12 mx-auto" />

            {/* Why Choose Us */}
            <div className="py-10 mt-5">
                <Headings
                    title={`Why Choose Us`}
                    description={
                        "At Social Buzz Media, our goal is to provide exceptional results and unmatched customer support. Why selecting us will be the right choice for your business."
                    }
                    // className={`text-white`}
                    // classNameDesc={`text-white`}
                />
                <div className="lg:w-9/12 w-11/12 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5 mx-auto md:mx-2 ">
                        {aboutSection.map((about) => (
                            <AboutCard key={about._id} about={about} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Teams Section */}
            <hr className="w-9/12 mx-auto" />

            <div className=" py-10">
                <div className="container w-9/12 mx-auto">
                    <div>
                        <Headings
                            title={`Our Team`}
                            description={`Our experienced team combines expertise, innovation, and dedication to deliver exceptional outcomes and assistance.`}
                            className={`text-red-500`}
                            classNameDesc={`text-black`}
                        />
                    </div>
                    <div className=" lg:w-9/12 w-11/12 mx-auto">
                        {/* Team Members*/}
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 m-8">
                            {employeeSection.map((emp) => (
                                <Teams key={emp._id} teamDetails={emp} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact CTA Section */}
            <div className="bg-overlay-a">
                <ContactCTA
                    ctaText="Ready to take off? Build your digital empire with us."
                    ctaBtnText="Contact Us"
                    ctaLink={`/contact-us`}
                    ctaTextClass={`text-white`}
                />
            </div>
        </>
    );
};

export default About;
