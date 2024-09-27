import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditVisionMission = () => {
    const [sections, setSections] = useState([]);
    const [visionData, setVisionData] = useState({
        type: "",
        title: "",
        description: "",
        image: null,
    });

    const [editMode, setEditMode] = useState(false);
    const [editingSectionId, setEditingSectionId] = useState(null);

    useEffect(() => {
        fetchSections();
    }, []);

    // Fetch All Sections
    const fetchSections = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_LOCAL_URL}/api/vision-mission`
        );
        setSections(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVisionData({ ...visionData, [name]: value });
    };

    const handleImageChange = (e) => {
        setVisionData({ ...visionData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append("type", visionData.type);
        formDataObj.append("title", visionData.title);
        formDataObj.append("description", visionData.description);
        if (visionData.image) {
            formDataObj.append("image", visionData.image);
        }

        try {
            if (editMode) {
                // Edit New Sections
                await axios.put(
                    `http://localhost:4000/api/vision-mission/${editingSectionId}`,
                    formDataObj,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                Swal.fire({
                    title: "Yeh-hey !",
                    text: "This Section Updated SuccessFully",
                    icon: "success",
                }).then(() => {
                    window.location.href = "/basement/edit-vision-mission";
                });

                fetchSections();
                resetForm();
            } else {
                // Create New Sections
                await axios.post(
                    `${import.meta.env.VITE_LOCAL_URL}/api/vision-mission`,
                    formDataObj,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                Swal.fire({
                    title: "Yeh-hey !",
                    text: "This Section Created SuccessFully",
                    icon: "success",
                }).then(() => {
                    window.location.href = "/basement/edit-vision-mission";
                });
                fetchSections();
                resetForm();
            }
        } catch (error) {
            console.log("Error Saving Section", error);
        }
    };

    const handleEdit = (section) => {
        setVisionData({
            type: section.type,
            title: section.title,
            description: section.description,
            image: null,
        });

        setEditingSectionId(section._id);
        setEditMode(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_LOCAL_URL}/api/vision-mission/${id}`
            );
            Swal.fire({
                title: "Yeh-hey !",
                text: "This Section Deleted SuccessFully",
                icon: "success",
            }).then(() => {
                window.location.href = "/basement/edit-vision-mission";
            });
            fetchSections();
        } catch (error) {
            console.log("Error Deleting Section", error);
        }
    };

    const resetForm = () => {
        setVisionData({
            type: "",
            title: "",
            description: "",
            image: null,
        });
        setEditMode(false);
        setEditingSectionId(null);
    };

    return (
        <div>
            <div className="text-4xl my-4">Edit Vision and Mission</div>

            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group ">
                    <tr className="border border-grey-500 md:border-none block md:table-row">
                        <th className="p-2 md:border md:border-grey-500 block md:table-cell text-center">
                            Title
                        </th>
                        <th className="p-2 md:border md:border-grey-500 block md:table-cell text-center">
                            Type
                        </th>
                        <th className="p-2 md:border md:border-grey-500 block md:table-cell text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map((item) => (
                        <tr key={item._id}>
                            <td className="border px-4 py-2">{item.title}</td>
                            <td className="border px-4 py-2 capitalize">
                                {item.type}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-yellow-500 text-white p-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Vision Form */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">
                    Mission And Vision Section
                </h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <select
                        name="type"
                        onChange={handleInputChange}
                        className="border p-2 w-full mb-4"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="vision">Vision</option>
                        <option value="mission">Mission</option>
                    </select>
                    <input
                        type="file"
                        name="image"
                        // placeholder="Title"
                        // value={visionData.title}
                        onChange={handleImageChange}
                        className="border p-2 w-full mb-4"
                        // required
                    />
                    <p className="text-red-600 text-[11px]">
                        Image size should be less than 1 MB <br /> Dimension
                        should be 600X400 px
                    </p>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={visionData.title}
                        onChange={handleInputChange}
                        className="border p-2 w-full mb-4"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={visionData.description}
                        onChange={handleInputChange}
                        className="border p-2 w-full mb-4"
                        // required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        {editMode ? "Update Section" : "Add Section"}
                    </button>
                    <button
                        onClick={resetForm}
                        className="bg-red-500 text-white p-2 rounded-full ml-2"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditVisionMission;
