import { NavLink, useParams } from "react-router-dom";
import Headings from "../../components/HeadingComponent/Headings";
import { useEffect, useState } from "react";
import axios from "axios";
import ContactCTA from "../../components/ContactCTAButton/ContactCTA";
import Card from "../../components/CardComponent/Card";

const ServicesDescription = () => {
    const { slug } = useParams();

    const [serviceDesc, setServiceDesc] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch service details based on serviceId and populate the page accordingly.
    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_LOCAL_URL}/api/service/${slug}`
                );
                setServiceDesc(response.data);
            } catch (error) {
                console.log("Error Fetching Service", error);
            }
        };
        fetchService();
    }, [slug]);

    if (!serviceDesc) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="mt-14">
                {/* Back To Service Page Button */}
                <div className="lg:w-3/4 mx-auto mb-8 text-center md:text-left sm:ml-50">
                    <NavLink
                        to={`/services`}
                        className="rounded-full bg-red-500 text-white px-4 py-2 "
                    >
                        Back to Services Page
                    </NavLink>
                </div>

                {/* What is the service section */}
                <div className="p-4 px-3 ">
                    <Headings
                        key={serviceDesc.id}
                        title={serviceDesc.title}
                        description={serviceDesc.description}
                        classNameDesc={`text-justify md:text-center`}
                    />
                </div>

                {/* Why The service is required */}

                <div className="bg-red-500">
                    <div className="py-8 md:w-3/4 md:mx-auto">
                        <Headings
                            title={`Why ${serviceDesc.title} is useful for you`}
                            className={`text-white`}
                        />
                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-8 py-6">
                            {serviceDesc.whyEssential &&
                                serviceDesc.whyEssential.length > 0 &&
                                serviceDesc.whyEssential.map((item) => {
                                    return (
                                        <Card
                                            key={item.id}
                                            title={item.title}
                                            description={item.description}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>

                {/* Why Choose Us for the service */}
                <div className="">
                    <div className="py-8 md:w-3/4 md:mx-auto">
                        <Headings
                            title={`Why choose us for ${serviceDesc.title}`}
                            // className={`text-white`}
                        />
                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-8 py-6">
                            {serviceDesc.whyChooseUs &&
                                serviceDesc.whyChooseUs.length > 0 &&
                                serviceDesc.whyChooseUs.map((item) => {
                                    return (
                                        <Card
                                            key={item.id}
                                            title={item.title}
                                            description={item.description}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>

                {/* Contact CTA Section */}
                <div className="bg-red-200">
                    <ContactCTA
                        ctaText="Ready to take off? Build your digital empire with us."
                        ctaBtnText="Contact Us"
                        ctaLink={`/contact-us`}
                        // ctaTextClass={`text-white`}
                    />
                </div>
            </div>
        </>
    );
};

export default ServicesDescription;
