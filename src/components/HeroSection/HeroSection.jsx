import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const HeroSection = ({
    bgVideo,
    heroHeading,
    heroSubHeading,
    contactLink,
    overlayClassName,
}) => {
    return (
        <>
            <div className="relative h-screen ">
                {bgVideo && (
                    <video
                        autoPlay={true}
                        loop
                        muted
                        className="absolute top-0 left-0  w-full h-full object-cover"
                    >
                        <source src={bgVideo} type="video/mp4" />
                    </video>
                )}
                <div
                    className={`${overlayClassName} absolute top-0 left-0 w-full h-full`}
                >
                    <div className="relative flex items-center px-3 justify-center h-full text-center flex-col lg:container lg:px-40 mx-auto w-full md:w-4/5">
                        {heroHeading && (
                            <h1 className="text-white md:text-6xl text-4xl font-medium capitalize">
                                {heroHeading}
                            </h1>
                        )}
                        {heroSubHeading && (
                            <p className="text-white text-2xl mt-6">
                                {heroSubHeading}
                            </p>
                        )}
                        {contactLink && (
                            <div className="mt-5 flex justify-center items-center flex-col md:flex-row">
                                <NavLink
                                    to={`/contact-us`}
                                    className="text-white bg-red-500 hover:bg-white hover:text-red-500 font-medium py-2 px-6 md:text-xl rounded-full mx-2 duration-300  inline-block my-4 "
                                >
                                    {contactLink}
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

HeroSection.propTypes = {
    bgVideo: PropTypes.string,
    heroHeading: PropTypes.string,
    heroSubHeading: PropTypes.string,
    contactLink: PropTypes.string,
    appointmentLink: PropTypes.string,
    overlayClassName: PropTypes.string,
};

export default HeroSection;
