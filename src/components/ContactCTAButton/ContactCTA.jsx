import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const ContactCTA = ({
    ctaText,
    ctaBtnText,
    ctaLink,
    ctaTextClass,
    ctaBtnClass,
    extraButton,
}) => {
    return (
        <>
            <div className="py-8 bg-overlay-a flex justify-center items-center flex-col md:flex-row px-5">
                <p
                    className={`text-center text-2xl ${ctaTextClass} text-white`}
                >
                    {ctaText}{" "}
                </p>
                {ctaBtnText && (
                    <NavLink
                        to={ctaLink}
                        className={`text-white bg-red-500 font-medium py-2 px-6 md:text-xl rounded-full mx-2 duration-300 p-7 inline-block my-3 hover:bg-red-800 ${ctaBtnClass}  border-white border-2  `}
                    >
                        {ctaBtnText}
                    </NavLink>
                )}
                {extraButton && <div>{extraButton}</div>}
            </div>
        </>
    );
};

ContactCTA.propTypes = {
    ctaText: PropTypes.string,
    ctaBtnText: PropTypes.string,
    ctaLink: PropTypes.string,
    ctaTextClass: PropTypes.string,
    ctaBtnClass: PropTypes.string,
    extraButton: PropTypes.string,
};

export default ContactCTA;
