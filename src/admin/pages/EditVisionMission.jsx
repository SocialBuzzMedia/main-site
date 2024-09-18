import { useEffect, useState } from "react";
import axios from "axios";

const EditVisionMission = () => {
    const [sections, setSections] = useState([]);
    const [visionData, setVisionData] = useState({
        title: "",
        description: "",
        image: null,
    });
    const [missionData, setMissionData] = useState({
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
            `http://localhost:4000/api/vision-mission`
        );
        setSections(response.data);
    };

    const handleInputChange = (e, sectionType) => {
        const { name, value, files } = e.target;
        if (sectionType === "vision") {
            setVisionData({ ...visionData, [name]: files ? files[0] : value });
        } else {
            setMissionData({
                ...missionData,
                [name]: files ? files[0] : value,
            });
        }
    };

    const handleSubmit = async (e, sectionType) => {
        e.preventDefault();
        const formData = new FormData();
        const data = sectionType === "vision" ? visionData : missionData;
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("type", sectionType);

        try {
            if (editMode) {
                await axios.put(
                    `http://localhost:4000/api/vision-mission/${editingSectionId}`,
                    formData
                );
            } else {
                await axios.post(
                    `http://localhost:4000/api/vision-mission`,
                    formData
                );
            }
            fetchSections();
            resetForm();
        } catch (error) {
            console.log("Error Saving Section", error);
        }
    };

    const handleEdit = (section) => {
        if (section.type === "vision") {
            setVisionData({
                title: section.title,
                description: section.description,
                image: null,
            });
        } else {
            setMissionData({
                title: section.title,
                description: section.description,
                image: null,
            });
        }
        setEditingSectionId(section._id);
        setEditMode(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:4000/api/vision-mission/${id}`);
        fetchSections();
    };

    const resetForm = (sectionType) => {
        if (sectionType === "vision") {
            setVisionData({ title: "", description: "", image: null });
        } else {
            setMissionData({ title: "", description: "", image: null });
        }
        setEditMode(false);
        setEditingSectionId(null);
    };

    return (
        <div>
            <div className="text-4xl my-4">Edit Vision and Mission</div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Title</th>
                        <th className="py-2">Type</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map((section) => (
                        <tr key={section._id}>
                            <td className="border px-4 py-2">
                                {section.title}
                            </td>
                            <td className="border px-4 py-2 capitalize">
                                {section.type}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(section)}
                                    className="bg-yellow-500 text-white p-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(section._id)}
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
                <h2 className="text-2xl font-bold mb-4">Vision Section</h2>
                <form
                    onSubmit={(e) => handleSubmit(e, "vision")}
                    className="mb-4"
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={visionData.title}
                        onChange={(e) => handleInputChange(e, "vision")}
                        className="border p-2 w-full mb-4"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={visionData.description}
                        onChange={(e) => handleInputChange(e, "vision")}
                        className="border p-2 w-full mb-4"
                        required
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => handleInputChange(e, "vision")}
                        className="mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        {editMode ? "Update Vision" : "Add Vision"}
                    </button>
                </form>
            </div>

            {/* Mission Form */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Mission Section</h2>
                <form
                    onSubmit={(e) => handleSubmit(e, "mission")}
                    className="mb-4"
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={missionData.title}
                        onChange={(e) => handleInputChange(e, "mission")}
                        className="border p-2 w-full mb-4"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={missionData.description}
                        onChange={(e) => handleInputChange(e, "mission")}
                        className="border p-2 w-full mb-4"
                        required
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => handleInputChange(e, "mission")}
                        className="mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        {editMode ? "Update Mission" : "Add Mission"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditVisionMission;
