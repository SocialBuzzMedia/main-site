import bgVideo from "/videos/bg-hero-video-a.mp4";
import HeroSection from "../../components/HeroSection/HeroSection";
import Card from "../../components/CardComponent/Card";
import { useEffect, useState } from "react";
import Headings from "../../components/HeadingComponent/Headings";
import ContactCTA from "../../components/ContactCTAButton/ContactCTA";
import Carousel from "../../components/CarouselComponent/Carousel";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";
import ServiceCard from "../../components/ServiceCardComponent/ServiceCard";
import axios from "axios";

const Home = () => {
    const [serviceSection, setServiceSection] = useState([]);
    const [aboutSection, setAboutSection] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchVisibleServices = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_LOCAL_URL}/api/service/visible`
                );
                setServiceSection(response.data);
            } catch (error) {
                console.log("Error Fetching Visible Services", error);
            }
        };
        fetchVisibleServices();
    }, []);

    // useEffect(() => {
    //     const fetchVisibleAbouts = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `${import.meta.env.VITE_LOCAL_URL}/api/about/visible`
    //             );
    //             setAboutSection(response.data);
    //         } catch (error) {
    //             console.log("Error Fetching Visible Services", error);
    //         }
    //     };
    //     fetchVisibleAbouts();
    // }, []);

    useEffect(() => {
        fetch("/AboutUsCard.json")
            .then((response) => response.json())
            .then((data) => {
                const filterAbout = data.filter(
                    (about) => about.category === "highlighted"
                );
                setAboutSection(filterAbout);
                // console.log(filterAbout);
            });
    }, []);

    return (
        <>
            <HelmetWrapper
                title="Home"
                description="Welcome to socialbuzzmedia. Best digital Marketing agency that provides all digital media solutions sush as SEO, Social Media Marketing, Web development, Pay-per-click"
            />
            <div className="">
                <HeroSection
                    bgVideo={bgVideo}
                    heroHeading={`Amplify your digital presence with our strategy and creativity`}
                    // heroSubHeading={`lorem ipsum dolor sit amet, consectetur`}
                    contactLink={`Get in touch with us`}
                    appointmentLink={`Get a quick appointment`}
                    overlayClassName={`home-overlay`}
                />
            </div>
            {/* What We do Section */}
            <div className="py-10">
                <Headings
                    title={`What We Do`}
                    description={
                        "We provide personalized digital marketing plans that boost brand recognition and interaction on various online channels."
                    }
                />
                <div className="md:w-3/4 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 m-8 ">
                        {serviceSection &&
                            serviceSection.length > 0 &&
                            serviceSection.map((data) => {
                                return (
                                    <ServiceCard
                                        key={data._id}
                                        services={data}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div>
                <div className="py-10 bg-red-500">
                    <Headings
                        title={`Why Choose Us`}
                        description={
                            "At Social Buzz Media, our goal is to provide exceptional results and unmatched customer support. Why selecting us will be the right choice for your business."
                        }
                        className={`text-white`}
                        classNameDesc={`text-white`}
                    />
                    <div className="md:w-3/4 mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 m-8 ">
                            {aboutSection &&
                                aboutSection.length > 0 &&
                                aboutSection.map((data) => {
                                    return (
                                        <Card
                                            key={data.id}
                                            icon={data.image}
                                            title={data.title}
                                            description={data.description}
                                            cardLink={`/about-us`}
                                            linkText={`Learn More`}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>

                {/* Client Carousel */}
                <div className="bg-white py-10">
                    <div className="mb-6">
                        <Headings title={`Our Clients`} />
                    </div>
                    <div className="md:w-3/4 mx-auto ">
                        <Carousel />
                    </div>
                </div>

                {/* Contact CTA Section */}
                <div className="bg-overlay-a">
                    <ContactCTA
                        ctaText="Ready to take off? Build your digital empire with us."
                        ctaBtnText="Contact Us"
                        ctaLink={`/contact-us`}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;