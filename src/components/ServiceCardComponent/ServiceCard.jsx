// import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

const ServiceCard = ({ services, slugText, normalLink }) => {
    return (
        <div>
            <div className="container border shadow-lg bg-white rounded-lg p-4">
                <img
                    src={`${import.meta.env.VITE_LOCAL_URL}${services.image}`}
                    alt={services.title}
                    className="rounded-t-lg shadow-md object-cover h-56"
                />
                <h2 className="text-2xl font-semibold my-4 text-center text-red-500  ">
                    {services.title}
                </h2>

                <div className="why-choose-us">
                    <h3 className="text-[1rem] text-center font-semibold mb-2 ">
                        Benifits of {services.title}
                    </h3>
                    <ul className="list-disc list-inside mb-4">
                        {services.whyChooseUs.map((item) => (
                            <li key={item.id} className="mb-1">
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full text-center ">
                    {slugText && (
                        <Link
                            to={`/services/${services.slug}`}
                            className="text-white bg-red-500 mx-auto px-10 py-1 rounded-full text-center"
                        >
                            {slugText}
                        </Link>
                    )}
                    {normalLink && (
                        <NavLink
                            to={"/services"}
                            className={
                                "text-white bg-red-500 mx-auto px-10 py-1 rounded-full text-center"
                            }
                        >
                            {normalLink}
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

ServiceCard.propTypes = {
    // services: PropTypes.string,
    services: PropTypes.string,
    slugText: PropTypes.string,
    normalLink: PropTypes.string,
};

export default ServiceCard;
