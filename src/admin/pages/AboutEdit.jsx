// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";
import Swal from "sweetalert2";

const AboutEdit = () => {
    const [about, setAbout] = useState([]);
    const [aboutData, setAboutData] = useState({
        title: "",
        description: "",
        category: "",
        image: null,
    });
    const [editMode, setEditMode] = useState(false);
    const [currentAboutId, setCurrentAboutId] = useState(null);

    useEffect(() => {
        fetchAbouts();
    }, []);

    // fetch all blogs from server
    const fetchAbouts = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_LOCAL_URL}/api/about`
            );
            setAbout(await response.json());
        } catch (error) {
            console.log("Error Fetching Blogs", error);
        }
    };

    // Handle form input
    const handleInputChange = async (e) => {
        setAboutData({ ...aboutData, [e.target.name]: e.target.value });
    };

    // Handle form inmage change
    const handleImageChange = (e) => {
        setAboutData({ ...aboutData, image: e.target.files[0] });
    };

    // About Card Create and Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", aboutData.title);
        formData.append("description", aboutData.description);
        formData.append("category", aboutData.category);
        if (aboutData.image) {
            formData.append("image", aboutData.image);
        }

        try {
            if (editMode) {
                await axios.put(
                    `${
                        import.meta.env.VITE_LOCAL_URL
                    }/api/about/${currentAboutId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                Swal.fire({
                    title: "Yeh-hey !",
                    text: "About Section Updated SuccessFully",
                    icon: "success",
                }).then(() => {
                    window.location.href = "/basement/edit-about";
                });
                fetchAbouts();
                resetForm();
            } else {
                // Create new blog
                await axios.post(
                    `${import.meta.env.VITE_LOCAL_URL}/api/about`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                Swal.fire({
                    title: "Yeh-hey !",
                    text: "About Section Created SuccessFully",
                    icon: "success",
                    confirmButtonText: "Okay",
                    confirmButtonColor: "Red",
                }).then(() => {
                    window.location.href = "/basement/edit-about";
                });
                fetchAbouts();
                resetForm();
            }
        } catch (error) {
            console.log("Error Saving Blog", error);
        }
    };

    // Handle About Editing
    const handleEdit = (about) => {
        setAboutData({
            title: about.title,
            description: about.description,
            category: about.category,
            image: null,
        });
        setCurrentAboutId(about._id);
        setEditMode(true);
    };

    // Handle Delete
    const handleDelete = async (aboutId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_LOCAL_URL}/api/about/${aboutId}`
            );
            Swal.fire({
                title: "Yeh-hey !",
                text: "About Section Deleted SuccessFully",
                icon: "success",
            }).then(() => {
                window.location.href = "/basement/edit-about";
            });
            fetchAbouts();
        } catch (error) {
            console.log("Error Deleting About", error);
        }
    };

    // Reset the form
    const resetForm = () => {
        setAboutData({
            title: "",
            description: "",
            category: " ",
            image: null,
        });
        setEditMode(false);
        setCurrentAboutId(null);
    };

    return (
        <div>
            <HelmetWrapper
                title="Edit About"
                description="Welcome to the Dashboard page of Social Buzz Media."
            />
            <div className="text-4xl my-4">About Edit Page</div>

            <div>
                <h2 className="text-2xl font-semibold text-red-500 mb-4 text-center">
                    All About Card List
                </h2>
                <table className="min-w-full border-collapse block md:table bg-gray-200">
                    <thead className="block md:table-header-group ">
                        <tr className="border border-grey-500 md:border-none block md:table-row">
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Title
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
                        {about.length > 0 ? (
                            about.map((item) => (
                                <tr
                                    key={item._id}
                                    className="bg-red-300 border border-black md:border-none block md:table-row"
                                >
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        {item.title}
                                    </td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        {item.category}
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
                            <p>No Cards Available</p>
                        )}
                    </tbody>
                </table>

                {/* Create About */}
                <div className="mx-auto mb-10">
                    <h2 className="text-3xl text-center text-red-500 font-medium mt-10 mb-6">
                        Create About Card
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            placeholder="Add Image"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <p className="text-red-600 text-[11px]">
                            Image size should be less than 1 MB <br /> Dimension
                            should be 600X400 px
                        </p>
                        <input
                            type="text"
                            name="title"
                            onChange={handleInputChange}
                            value={aboutData.title}
                            placeholder="Add Title"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <input
                            type="text"
                            name="description"
                            onChange={handleInputChange}
                            value={aboutData.description}
                            placeholder="Add description"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <select
                            name="category"
                            value={aboutData.category}
                            onChange={handleInputChange}
                            className="border p-2 w-full mb-4"
                            required
                        >
                            <option>Select</option>
                            <option value="Show">Show</option>
                            <option value="Hide">Hide</option>
                        </select>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-full"
                        >
                            {editMode
                                ? "Update About Card"
                                : "Create About Card"}
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

export default AboutEdit;
