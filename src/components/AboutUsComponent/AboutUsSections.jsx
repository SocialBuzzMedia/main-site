import PropTypes from "prop-types";

const AboutUsSections = ({
    image,
    heading,
    description,
    aboutDirection,
    headingFontColor,
    descriptionFontColor,
}) => {
    return (
        <>
            <div className="md:w-11/12 mx-auto">
                <div
                    className={`flex justify-center items-center gap-11 py-10 ${aboutDirection}`}
                >
                    <div className="lg:block hidden">
                        <img src={image} alt="" />
                    </div>
                    <div className="lg:w-1/2 w-3/4 mx-auto">
                        <p
                            className={`text-6xl mb-5 font-medium ${headingFontColor}`}
                        >
                            {heading}
                        </p>
                        <p
                            className={`text-lg text-justify ${descriptionFontColor}`}
                        >
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

AboutUsSections.propTypes = {
    image: PropTypes.string,
    heading: PropTypes.string,
    description: PropTypes.string,
    aboutDirection: PropTypes.string,
    headingFontColor: PropTypes.string,
    descriptionFontColor: PropTypes.string,
};

export default AboutUsSections;
