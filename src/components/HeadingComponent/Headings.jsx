import PropTypes from "prop-types";

const Headings = ({ title, description, className, classNameDesc }) => {
    return (
        <>
            <div className="text-center font-medium md:text-6xl text-4xl text-red-500 px-10 capitalize">
                {title && (
                    <p className={`md:text-6xl text-4xl ${className}`}>
                        {title}
                    </p>
                )}
                {description && (
                    <p
                        className={`md:text-2xl text-xl md:w-3/4 text-gray-800 mx-auto mt-5 ${classNameDesc}`}
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
