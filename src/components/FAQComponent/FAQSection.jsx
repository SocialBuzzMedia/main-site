import { useEffect, useState } from "react";
import axios from "axios";
import { RiArrowDropDownFill } from "react-icons/ri";
import Headings from "../HeadingComponent/Headings";

const FAQSection = () => {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    // Fetch FAQ data from API
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_LOCAL_URL}/api/faq`
                );
                setFaqs(response.data);
            } catch (error) {
                console.log("Error fetching FAQs", error);
            }
        };
        fetchFaqs();
    }, []);

    // Toggle active FAQ on click
    const toggleFAQ = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); //Collapse active index
        } else {
            setActiveIndex(index); //Set active index
        }
    };

    return (
        <div className="p-4 lg:w-9/12 w-11/12 mx-auto">
            <div className="mb-4">
                <Headings
                    title={`Frequently Asked Questions`}
                    description={`Discover the answers to frequently asked questions concerning our services, tactics, and ways to improve your online presence in digital marketing.`}
                />
            </div>
            <div className="p-4 max-w-3xl mx-auto">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq._id}
                            className="border p-4 rounded shadow"
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h2 className="font-bold text-lg">
                                    {faq.question}
                                </h2>
                                <RiArrowDropDownFill
                                    size={30}
                                    fill="#ec1e24"
                                    className={`transform transition-transform duration-300 ${
                                        activeIndex === index
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </div>

                            <div
                                className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
                                    activeIndex === index
                                        ? "max-h-screen"
                                        : "max-h-0"
                                }`}
                            >
                                <p className="text-gray-700">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
