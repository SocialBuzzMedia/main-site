import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Card = ({
    icon,
    title,
    description,
    cardLink,
    linkText,
    cardTitleClass,
}) => {
    return (
        <>
            <div className="flex items-center flex-col max-w-md bg-white rounded-xl p-6 mx-auto shadow-md hover:shadow-xl transition-all">
                {/* Card Image */}
                {icon && (
                    <div className="block my-5 h-44">
                        <img
                            src={icon}
                            alt={`SocialBuzzMedia-img-${title}`}
                            width={250}
                            height={200}
                        />
                    </div>
                )}
                {/* Card Body */}
                <div className="mt-18 mb-10">
                    {/* Card Title */}
                    <h2
                        className={`${cardTitleClass} text-center font-medium text-2xl text-red-500 mb-5`}
                    >
                        {title}
                    </h2>

                    <div className="flex justify-center items-center text-center">
                        <p className="p-2">{description}</p>
                    </div>
                </div>
                {linkText && (
                    <div className="w-full text-center flex justify-center mt-auto">
                        <NavLink
                            to={cardLink}
                            className="bg-red-500 px-6 py-1 text-white rounded-full text-medium shadow-lg w-3/4"
                        >
                            {linkText}
                        </NavLink>
                    </div>
                )}
            </div>
            {/* <div className="max-w-md mx-auto rounded overflow-hidden shadow-lg hover:shadow-2xl flex flex-col bg-white transition-shadow duration-300 ease-in-out py-6">
                {icon && (
                    <div className="h-48 w-full md:mb-10">
                        <img src={icon} alt={title} />
                    </div>
                )}
                <div className="px-6 py-4 mb-10 mt-12">
                    <div
                        className={`font-medium text-lg mb-2 text-center ${cardTitleClass} text-red-500 `}
                    >
                        {title}
                    </div>
                    <p className="text-gray-600 mb-6 text-center">
                        {description}
                    </p>
                </div>
                {linkText && (
                    <div className="px-6 py-4 mt-auto text-center ">
                        <NavLink
                            to={cardLink}
                            className=" bg-red-500  hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition-all duration-200 w-full"
                        >
                            {" "}
                            {linkText}
                        </NavLink>
                    </div>
                )}
            </div> */}
        </>
    );
};

Card.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    cardLink: PropTypes.string,
    linkText: PropTypes.string,
    cardTitleClass: PropTypes.string,
};

export default Card;
