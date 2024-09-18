// import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useEffect, useState } from "react";

// import CreateBlog from "../components/CreateBlog";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";

const BlogEdit = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        content: "",
        author: "",
        metaTitle: "",
        metaDescription: "",
        bannerImage: null,
    });
    const [editMode, setEditMode] = useState(false); //Toggle between create and edit
    const [currentBlogId, setCurrentBlogId] = useState(null); //track the blog being edited
    // Declaring The Text module
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ script: "sub" }, { script: "super" }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: [] }, { background: [] }],
            ["clean"],
        ],
    };
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "script",
        "list",
        "bullet",
        "link",
        "image",
        "align",
        "color",
        "background",
    ];

    // fetch all blog on page load
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Fetch all blogs from server
    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/blogs`);
            setBlogs(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.log("Error Fetching Blogs", error);
        }
    };

    // Handle form input
    const handleInputChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
    };

    // Handle form image change
    const handleImageChange = (e) => {
        setBlogData({ ...blogData, bannerImage: e.target.files[0] });
    };

    // Handle quill editor
    const handleContentChange = (value) => {
        setBlogData({ ...blogData, content: value });
    };

    // Blog Createtion and Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("description", blogData.description);
        formData.append("content", blogData.content);
        formData.append("author", blogData.author);
        formData.append("metaTitle", blogData.metaTitle);
        formData.append("metaDescription", blogData.metaDescription);
        if (blogData.bannerImage) {
            formData.append("bannerImage", blogData.bannerImage);
        }

        try {
            if (editMode) {
                // edit blog
                await axios.put(
                    `http://localhost:4000/api/blogs/${currentBlogId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                fetchBlogs();
                resetForm();
            } else {
                // Create new blog
                await axios.post(`http://localhost:4000/api/blogs`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                fetchBlogs();
                resetForm();
            }
        } catch (error) {
            console.log("Error Saving blog", error);
        }
    };

    // Handle blog editing (Populate the form with prev data)
    const handleEdit = (blog) => {
        setBlogData({
            title: blog.title,
            description: blog.description,
            content: blog.content,
            author: blog.author,
            metaTitle: blog.metaTitle,
            metaDescription: blog.metaDescription,
            bannerImage: null, //Reset the banner image field
        });
        setCurrentBlogId(blog._id); //Set the current blog id for editing
        setEditMode(true); //switch to edit mode
    };

    // Handle blog deletion
    const handleDelete = async (blogId) => {
        try {
            await axios.delete(`http://localhost:4000/api/blogs/${blogId}`);
            // refresh the blog list after deletion
            fetchBlogs();
        } catch (error) {
            console.log("Error Deleting Blog", error);
        }
    };

    // Reset the form to create mode
    const resetForm = () => {
        setBlogData({
            title: "",
            description: "",
            content: "",
            author: "",
            metaTitle: "",
            metaDescription: "",
            bannerImage: null,
        });
        setEditMode(false);
        setCurrentBlogId(null);
    };
    return (
        <>
            <HelmetWrapper
                title="Edit Blog"
                description="Welcome to the Dashboard page of Social Buzz Media."
            />
            <div>
                {/* Table for displaying all blogs */}
                <div className="text-4xl my-4">Blog Edit Page</div>
                <h2 className="text-2xl font-semibold text-red-500 mb-4 text-center">
                    All Blogs List
                </h2>
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group ">
                        <tr className="border border-grey-500 md:border-none block md:table-row">
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Title
                            </th>
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <tr
                                    key={blog._id}
                                    className="bg-red-300 border border-black md:border-none block md:table-row"
                                >
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        {blog.title}
                                    </td>
                                    <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(blog._id)
                                            }
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>No Blogs Available</p>
                        )}
                    </tbody>
                </table>
                {/* <CreateBlog /> */}
                <div className="w-12/12 mx-auto mb-10">
                    <div className="text-3xl text-center text-red-500 font-medium mt-10 mb-6">
                        Create Blogs
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="file"
                            name="bannerImage"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={blogData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="metaTitle"
                            placeholder="Meta Title"
                            value={blogData.metaTitle}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <textarea
                            placeholder="Description"
                            name="description"
                            value={blogData.description}
                            rows={7}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded resize-none"
                            required
                        />
                        <textarea
                            placeholder="Meta Description"
                            name="metaDescription"
                            value={blogData.metaDescription}
                            rows={7}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded resize-none"
                        />
                        <ReactQuill
                            modules={modules}
                            formats={formats}
                            value={blogData.content}
                            onChange={handleContentChange}
                            className="mb-4"
                        />
                        <input
                            type="text"
                            name="author"
                            placeholder="Author"
                            value={blogData.author}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-full"
                        >
                            {editMode ? "Update Blog" : "Create Blog"}
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
        </>
    );
};

export default BlogEdit;
