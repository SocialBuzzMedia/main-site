import { useEffect, useState } from "react";
import axios from "axios";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";

const ServicesEdit = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        whyChooseUs: [],
        whyEssential: [],
        image: null,
    });
    const [editMode, setEditMode] = useState(false);
    const [editingServiceId, setEditingServiceId] = useState(null);

    // Fetch all data on load
    useEffect(() => {
        fetchServices();
    }, []);

    // Fetching data from backend
    const fetchServices = async () => {
        const response = await axios.get("http://localhost:4000/api/service");
        setServices(response.data);
    };

    // Handle input changer
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image change
    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    // handle nested input
    const handleNestedInputChange = (e, index, type) => {
        const updatedData = [...formData[type]];
        updatedData[index][e.target.name] = e.target.value;
        setFormData({ ...formData, [type]: updatedData });
    };

    // Add nested field
    const addNestedField = (type) => {
        const newField = { id: Date.now(), title: "", description: "" };
        setFormData({ ...formData, [type]: [...formData[type], newField] });
    };

    // Delete nested field
    const removeNestedField = (index, type) => {
        const updatedData = formData[type].filter((_, i) => i !== index);
        setFormData({ ...formData, [type]: updatedData });
    };

    // HandleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("whyChooseUs", JSON.stringify(formData.whyChooseUs));
        data.append("whyEssential", JSON.stringify(formData.whyEssential));
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            if (editMode) {
                await axios.put(
                    `http://localhost:4000/api/service/${editingServiceId}`,
                    data
                );
                fetchServices();
                resetForm();
            } else {
                await axios.post("http://localhost:4000/api/service", data);
                fetchServices();
                resetForm();
            }
            fetchServices();
            resetForm();
        } catch (error) {
            console.log("Error Saving Service", error);
        }
    };

    const handleEdit = (service) => {
        setFormData({
            title: service.title,
            description: service.description,
            category: service.category,
            whyChooseUs: JSON.parse(service.whyChooseUs),
            whyEssential: JSON.parse(service.whyEssential),
            image: null,
        });

        setEditMode(true);
        setEditingServiceId(service._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/service/${id}`);
            fetchServices();
        } catch (error) {
            console.log("Error Deleting Service : ", error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            category: "",
            whyChooseUs: [],
            whyEssential: [],
            image: null,
        });
        setEditMode(false);
        setEditingServiceId(null);
    };

    return (
        <div>
            <HelmetWrapper
                title="Edit Service"
                description="Welcome to the Dashboard page of Social Buzz Media."
            />
            <div className="text-4xl my-4">Edit Services</div>
            {/* Table for Uploaded  Data */}
            <h2 className="text-2xl font-semibold text-red-500 mb-4 text-center">
                All Service list
            </h2>
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row">
                        <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                            Title
                        </th>
                        <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                            Description
                        </th>
                        <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                            Category
                        </th>
                        <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <tr
                                key={service._id}
                                className="bg-red-300 border border-black md:border-none block md:table-row"
                            >
                                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                    {service.title}
                                </td>
                                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                    {service.description}
                                </td>
                                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                    {service.category}
                                </td>
                                <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(service._id)
                                        }
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>No Service Available</p>
                    )}
                </tbody>
            </table>
            {/* Form to upload data */}
            <h2 className="text-2xl font-semibold text-red-500 my-4 text-center">
                Upload Service Data
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Service Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border p-2 w-full mb-4"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Service Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border p-2 w-full mb-4"
                    required
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="border p-2 w-full mb-4"
                    required
                >
                    <option>Select</option>
                    <option value="Show">Show</option>
                    <option value="Hide">Hide</option>
                </select>

                {/* Why Essential Data Upload */}

                <div className="mb-4">
                    <h3>Why Essentials</h3>
                    {formData.whyEssential.map((item, index) => (
                        <div key={item.id} className="mb-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={item.title}
                                onChange={(e) =>
                                    handleNestedInputChange(
                                        e,
                                        index,
                                        "whyEssential"
                                    )
                                }
                                className="border p-2 w-full mb-2"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) =>
                                    handleNestedInputChange(
                                        e,
                                        index,
                                        "whyEssential"
                                    )
                                }
                                className="border p-2 w-full mb-4"
                                required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    removeNestedField(index, "whyEssential")
                                }
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNestedField("whyEssential")}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Add Why Essential
                    </button>
                </div>

                {/* Why Choose Us Data Upload */}

                <div className="mb-4">
                    <h3>Why Choose Us</h3>
                    {formData.whyChooseUs.map((item, index) => (
                        <div key={item.id} className="mb-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={item.title}
                                onChange={(e) =>
                                    handleNestedInputChange(
                                        e,
                                        index,
                                        "whyChooseUs"
                                    )
                                }
                                className="border p-2 w-full mb-2"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) =>
                                    handleNestedInputChange(
                                        e,
                                        index,
                                        "whyChooseUs"
                                    )
                                }
                                className="border p-2 w-full mb-4"
                                required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    removeNestedField(index, "whyChooseUs")
                                }
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNestedField("whyChooseUs")}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Add Why Choose Us
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded"
                >
                    {editMode ? "Update Service" : "Add Service"}
                </button>
                {editMode && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-500 text-white p-2 rounded ml-4"
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default ServicesEdit;
