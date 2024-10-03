import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";

const FaqEdit = () => {
    const [faqs, setFaqs] = useState([]);
    const [faqData, setFaqData] = useState({
        question: "",
        answer: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [currentFaqId, setCurrentFaqId] = useState(null);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_LOCAL_URL}/api/faq`
            );
            setFaqs(response.data);
        } catch (error) {
            console.log("error fetching Faqs", error);
        }
    };

    const handleInputChange = (e) => {
        setFaqData({ ...faqData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("question", faqData.question);
        data.append("answer", faqData.answer);

        try {
            if (editMode) {
                axios.put(
                    `${import.meta.env.VITE_LOCAL_URL}/api/faq/${currentFaqId}`,
                    data,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                Swal.fire({
                    title: "Yeh-hey !",
                    text: "FAQ Data Updated SuccessFully",
                    icon: "success",
                }).then(() => {
                    window.location.href = "/basement/edit-faq";
                });
                fetchFaqs();
                resetForm();
            } else {
                axios.post(`${import.meta.env.VITE_LOCAL_URL}/api/faq`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                Swal.fire({
                    title: "Yeh-hey!",
                    text: "New FAQ Created SuccessFully",
                    icon: "success",
                }).then(() => {
                    window.location.href = "/basement/edit-faq";
                });
                fetchFaqs();
                resetForm();
            }
        } catch (error) {
            console.log("Error creating employee", error);
        }
    };

    const handleEdit = (faq) => {
        setFaqData({
            question: faq.question,
            answer: faq.answer,
        });
        setCurrentFaqId(faq._id);
        setEditMode(true);
    };

    const handleDelete = async (faqId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_LOCAL_URL}/api/faq/${faqId}`
            );
            Swal.fire({
                title: "Yeh-hey!",
                text: "FAQ Deleted SuccessFully",
                icon: "success",
            }).then(() => {
                window.location.href = "/basement/edit-faq";
            });
            fetchFaqs();
        } catch (error) {
            console.log("Error deleting FAQ : ", error);
        }
    };

    const resetForm = () => {
        setFaqData({
            question: "",
            answer: "",
        });
        setCurrentFaqId(null);
        setEditMode(false);
    };

    return (
        <div>
            <HelmetWrapper
                title="Edit FAQ"
                description="Welcome to the Dashboard page of Social Buzz Media."
            />

            <div className="text-4xl my-4">Edit FAQ details</div>

            <div>
                <h2 className="text-2xl font-semibold text-red-500 mb-4 text-center">
                    All About Card List
                </h2>
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group ">
                        <tr className="border border-grey-500 md:border-none block md:table-row">
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Question
                            </th>
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Answer
                            </th>
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {faqs.length > 0 ? (
                            faqs.map((item) => (
                                <tr
                                    key={item._id}
                                    className="bg-red-300 border border-black md:border-none block md:table-row"
                                >
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        {item.question}
                                    </td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        {item.answer}
                                    </td>
                                    <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>No Employee Available</p>
                        )}
                    </tbody>
                </table>

                {/* Create Employee */}
                <div className="mx-auto mb-10">
                    <h2 className="text-3xl text-center text-red-500 font-medium mt-10 mb-6">
                        Create Employee Card
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="question"
                            onChange={handleInputChange}
                            value={faqData.question}
                            placeholder="Add Question"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <textarea
                            name="answer"
                            onChange={handleInputChange}
                            value={faqData.answer}
                            placeholder="Add Answer"
                            rows={10}
                            className="rounded w-full p-2 border border-gray-200 resize-none"
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-full"
                        >
                            {editMode
                                ? "Update Employee Details"
                                : "Create Employee Details"}
                        </button>
                        {editMode && (
                            <button
                                onClick={resetForm}
                                className="bg-red-500 text-white p-2 rounded-full ml-2"
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FaqEdit;
