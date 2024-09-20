import bgVideo from "/videos/bg-hero-video-d.mp4";
import { useState, useEffect } from "react";
import Headings from "../../components/HeadingComponent/Headings";
// import Card from "../../components/CardComponent/Card";
import HeroSection from "../../components/HeroSection/HeroSection";
import ContactCTA from "../../components/ContactCTAButton/ContactCTA";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";
import axios from "axios";
import ServiceCard from "../../components/ServiceCardComponent/ServiceCard";

// import BookAnAppointment from "../BookAnAppointmentPage/BookAnAppointment";

const Services = () => {
    const [serviceSection, setServiceSection] = useState([]);
    const [heroSection, setHeroSection] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetch("/TagLines.json")
            .then((res) => res.json())
            .then((data) => {
                const foundTagline = data.find(
                    (tag) => tag.page === "services"
                );
                setHeroSection(foundTagline);
            });
    }, []);

    // useEffect(() => {
    //     fetch("/ServicesCard.json")
    //         .then((response) => response.json())
    //         .then((data) => setServiceSection(data));
    // }, []);

    useEffect(() => {
        const fetchService = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_LOCAL_URL}/api/service`
            );
            setServiceSection(response.data);
        };
        fetchService();
    }, []);

    return (
        <>
            {/* <BookAnAppointment openFunc={isModalOpen} closeFunc={closeModal} /> */}
            <HelmetWrapper
                title="Services"
                description="Welcome to the Services page of Social Buzz Media. We offer a list of services to our invaluable clients"
            />

            <div>
                <HeroSection
                    key={heroSection.id}
                    bgVideo={bgVideo}
                    heroHeading={heroSection.title}
                    heroSubHeading={heroSection.description}
                    overlayClassName={`service-overlay`}
                />
            </div>
            {/* Services section Section */}
            <div className="md:w-3/4 mx-auto">
                <div className="py-10">
                    <Headings
                        title={`Our Services`}
                        description={
                            "We provide personalized digital marketing plans that boost brand recognition and interaction on various online channels."
                        }
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-8 py-6">
                        {serviceSection.map((data) => (
                            <ServiceCard
                                key={data._id}
                                services={data}
                                slugText={"Read More"}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Services section End */}
            {/* Contact CTA Section */}
            <div className="bg-red-200">
                <ContactCTA
                    ctaText="Ready to take off? Build your digital empire with us."
                    ctaBtnText="Contact Us"
                    ctaLink={`/contact-us`}
                    // ctaTextClass={`text-white`}
                />
            </div>
        </>
    );
};

export default Services;
