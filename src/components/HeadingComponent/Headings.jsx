import PropTypes from "prop-types";

const Headings = ({ title, description, className, classNameDesc }) => {
    return (
        <>
            <div className="text-center font-medium md:text-6xl text-4xl text-red-500 px-10 mb-5 capitalize">
                {title && (
                    <h1 className={`md:text-6xl text-4xl ${className}`}>
                        {title}
                    </h1>
                )}
                {description && (
                    <p
                        className={`md:text-2xl text-xl md:w-11/12 text-gray-800 mx-auto mt-5 ${classNameDesc}`}
                    >
                        {description}
                    </p>
                )}
            </div>
        </>
    );
};

Headings.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
    classNameDesc: PropTypes.string,
};

export default Headings;
