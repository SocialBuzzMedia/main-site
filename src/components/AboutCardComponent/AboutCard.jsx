import PropTypes from "prop-types";

const AboutCard = ({ about }) => {
    return (
        <div>
            <img
                src={`${import.meta.env.VITE_LOCAL_URL}${about.image}`}
                alt={about.title}
            />

            <div className="flex flex-col justify-center items-center p-2">
                <h2 className="my-3 text-2xl font-semibold text-red-500 text-center">
                    {about.title}
                </h2>
                <p className="mb-4 px-2">{about.description}</p>
            </div>
        </div>
    );
};

AboutCard.propTypes = {
    about: PropTypes.string,
};

export default AboutCard;
