import { useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseCircle } from "react-icons/io5";
import Swal from "sweetalert2";

const mountElement = document.getElementById("overlays");

const ContactModalForm = ({ isModalOpen, isModalClose }) => {
    const [formResult, setFormResult] = useState({
        businessName: "",
        emailId: "",
        phoneNumber: "",
        bookingDate: "",
    });

    const handleChange = (e) => {
        setFormResult({
            ...formResult,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formUrl = `${import.meta.env.VITE_WEB3URL}`; //"https://api.web3forms.com/submit";
        const accessKey = `${import.meta.env.VITE_WEB3TOKEN}`; //"68130282-b00a-4e5f-be53-540e3f46089a";

        const payload = {
            access_key: accessKey,
            businessName: formResult.businessName,
            emailId: formResult.emailId,
            phoneNumber: formResult.phoneNumber,
            bookingDate: formResult.bookingDate,
        };

        try {
            const response = await fetch(formUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success",
                    text: "Your appointment has been booked successfully.",
                    icon: "success",
                    confirmButtonText: "Okay",
                }).then(() => {
                    window.location.href = "/";
                });

                setFormResult({
                    businessName: "",
                    emailId: "",
                    phoneNumber: "",
                    bookingDate: "",
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to book appointment. Please try again later.",
                    icon: "error",
                    confirmButtonText: "Okay",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "An error occurred while submitting the form. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay",
            });
            console.log(error);
        }
    };

    // Try Code

    return createPortal(
        <>
            {isModalOpen && (
                <div className="fixed z-50 bg-black bg-opacity-70 inset-0 flex items-center justify-center">
                    <div className="bg-overlay-a rounded-xl shadow-lg shadow-gray-500 px-4 relative">
                        <button
                            onClick={isModalClose}
                            className="absolute top-0 right-0  "
                        >
                            <IoCloseCircle fill="#ffffff" size={40} />
                        </button>
                        <div className="mt-10">
                            <h2 className="text-center font-medium text-2xl text-white block">
                                Fill the form to book appointment
                            </h2>
                            <form
                                className="flex justify-center items-center flex-col px-5 py-5"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter Your Business Name"
                                    required
                                    name="businessName"
                                    onChange={handleChange}
                                    className="w-full my-2 py-3 px-2 rounded-xl focus:outline-none focus:ring focus:ring-black transition"
                                />
                                <input
                                    type="email"
                                    placeholder="Enter Your Email ID"
                                    required
                                    name="emailId"
                                    onChange={handleChange}
                                    className="w-full my-2 py-3 px-2 rounded-xl focus:outline-none focus:ring focus:ring-black transition"
                                />
                                <input
                                    type="tel"
                                    placeholder="Enter Your Phone Number"
                                    required
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    className="w-full my-2 py-3 px-2 rounded-xl focus:outline-none focus:ring focus:ring-black transition"
                                />
                                <input
                                    type="date"
                                    // placeholder="Enter Your Phone Number"
                                    required
                                    name="bookingDate"
                                    onChange={handleChange}
                                    className="w-full my-2 py-3 px-2 rounded-xl focus:outline-none focus:ring focus:ring-black transition"
                                />
                                <button
                                    type="submit"
                                    className="bg-white text-red-500 font-medium rounded-full w-full p-2 mt-5"
                                >
                                    Confirm Booking
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>,
        mountElement
    );
};

export default ContactModalForm;
