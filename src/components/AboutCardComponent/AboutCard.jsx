import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AboutCard = ({ about, linkText }) => {
    return (
        <div className="container border shadow-lg rounded-lg p-4 bg-white">
            <img
                src={`${import.meta.env.VITE_LOCAL_URL}${about.image}`}
                alt={about.title}
                className="rounded-t-lg shadow-md object-cover "
            />

            <h2 className="my-3 text-2xl font-semibold text-red-500 text-center">
                {about.title}
            </h2>

            <div>
                <p className="mb-4 px-2">{about.description}</p>
            </div>

            <div className="text-center w-full">
                {linkText && (
                    <Link
                        to={`/about`}
                        className="text-white w-9/12 bg-red-500  px-10 py-1 rounded-full"
                    >
                        {linkText}
                    </Link>
                )}
            </div>
        </div>
    );
};

AboutCard.propTypes = {
    about: PropTypes.string,
    linkText: PropTypes.string,
};

export default AboutCard;
