import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ContactModalForm from "../ContactModalFormPage/ContactModalForm";

const ContactModalButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
        navigate("/book-an-appointment");
    };
    const closeModal = () => {
        setIsModalOpen(false);
        navigate("/");
    };
    return (
        <>
            <div>
                <NavLink
                    className="font-medium text-white bg-red-500 px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 md:text-xl"
                    onClick={openModal}
                >
                    Book A quick Call
                </NavLink>

                <ContactModalForm
                    isModalOpen={isModalOpen}
                    isModalClose={closeModal}
                />
            </div>
        </>
    );
};

export default ContactModalButton;
