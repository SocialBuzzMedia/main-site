import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

const Teams = ({ teamDetails }) => {
    return (
        <>
            <div className="shadow-lg rounded-lg relative overflow-hidden group">
                <img
                    src={`${import.meta.env.VITE_LOCAL_URL}${
                        teamDetails.image
                    }`}
                    alt={teamDetails.name}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col bg-red-500 rounded-lg bg-opacity-65 -translate-y-full group-hover:-translate-y-0 duration-300 text-center">
                    <h2 className="text-white text-2xl mb-4 ">
                        {teamDetails.name}
                    </h2>
                    <p className="text-white text-xl italic text-sh">
                        {teamDetails.designation}
                    </p>
                    <Link to={teamDetails.linkedin} className="my-5">
                        <FaLinkedin size={30} fill="#ffffff" />
                    </Link>
                </div>
            </div>
        </>
    );
};

Teams.propTypes = {
    teamDetails: PropTypes.string,
};

export default Teams;
