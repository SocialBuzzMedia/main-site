import AboutUsSections from "../../components/AboutUsComponent/AboutUsSections";
import Headings from "../../components/HeadingComponent/Headings";
import HeroSection from "../../components/HeroSection/HeroSection";
import ContactCTA from "../../components/ContactCTAButton/ContactCTA";
import image from "/images/strategy.jpg";

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
                <AboutUsSections
                    image={image}
                    heading={`Our Vision`}
                    description={`At Social Buzz Media, we visualise to help businesses excel in the continuously shifting digital environment. We believe in helping our clients achieve online success by guiding them through every aspect of the digital world and keeping one step ahead of the competition.

In a constantly changing industry, we believe that creativity, originality and a client-centric approach are crucial for discovering online possibilities. Our team of experts is focused on providing customised digital marketing solutions that lead to measurable outcomes, such as improved brand awareness and conversion rates.

We believe in a future where every business has an effective online presence, every customer connection is important and every marketing campaign generates measurable results. We aim to make our client's ideas a reality by combining modern technology, data-driven insights and a thirst for creativity.

Let's team up to build your place as an expert in this digital age, where success is carefully and creatively crafted. Join us to achieve the goal of success that expands above the digital horizon. Let us join hands to turn your vision into a reality.

`}
                    aboutDirection={`flex-row`}
                    headingFontColor={`text-red-500`}
                    descriptionFontColor={`text-black`}
                />
            </div>

            <hr className="w-9/12 mx-auto" />

            {/* Our Mission */}
            <div className="mt-5 mb-3">
                <AboutUsSections
                    image={image}
                    heading={`Our Mission`}
                    description={`At Social Buzz Media, our goal is to promote businesses of all sizes by helping them with modern digital marketing tools and innovative strategies customised to their specific needs. We believe that every brand, irrespective of size or budget, deserves a place in the digital landscape.

Our primary goal is to enhance brand visibility, ensuring that your company stands out in an increasingly competitive market. We understand the power of effective engagement with your target audience; this is why we use cutting-edge techniques to build meaningful connections between you and your customers.

We are committed to dealing with the complexities of the digital world so that you remain focused on what you do best: operating your business. We help you reach and connect with your audience by applying data-driven insights and innovative ideas, which leads to long-term loyalty and growth.

We will work together to revamp your online presence and promote your message so that your brand grows online rather than merely existing. Join us on the path to digital excellence, where your success is our priority!
`}
                    aboutDirection={`flex-row-reverse`}
                    headingFontColor={`text-red-500`}
                    descriptionFontColor={`text-black`}
                />
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
                <div className="container w-3/4 mx-auto">
                    <div>
                        <Headings
                            title={`Our Team`}
                            description={`Our experienced team combines expertise, innovation, and dedication to deliver exceptional outcomes and assistance.`}
                            className={`text-red-500`}
                            classNameDesc={`text-black`}
                        />
                    </div>
                    <div className=" lg:w-9/12 w-11/12">
                        {/* Team Members     */}
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
