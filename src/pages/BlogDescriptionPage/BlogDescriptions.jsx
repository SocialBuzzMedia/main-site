// import React from 'react'
import { FaBackspace } from "react-icons/fa";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";

const BlogDescriptions = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_LOCAL_URL}/api/blogs/${slug}`
                );
                setBlog(response.data);
            } catch (error) {
                setError("Blog Not Found", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!blog) return null; // Safeguard in case blog is null

    return (
        <div className=" mt-14">
            {/* Horizontal Ad */}
            <div className="w-[728px] h-[90px] bg-red-500 mx-auto hidden md:block"></div>
            {/* Horizontal Ad Mobile */}
            <div className="w-[300px] h-[50px] bg-red-500 mx-auto md:hidden block"></div>
            {/* Vertical Left */}
            <div className="w-[160px] h-[600px] bg-red-500 float-start lg:inline-block hidden ml-10 mt-20"></div>
            {/* Vertical Right */}
            <div className="w-[160px] h-[600px] bg-red-500 float-end lg:inline-block hidden mr-10 mt-20"></div>
            {/* Blog Content */}
            <div className="lg:w-7/12 md:w-10/12 sm:w-9/12 mx-auto mt-10">
                {/* Meta Title And Description */}
                <HelmetWrapper
                    title={blog.metaTitle}
                    description={blog.metaDescription}
                />
                <Link
                    to={`/blog`}
                    className="rounded-full bg-red-500  py-1 text-white flex justify-center items-center gap-3 md:w-5/12"
                >
                    <FaBackspace size={40} />{" "}
                    <span>Back to Blog Home Page</span>
                </Link>
                <div className="mt-7">
                    <img
                        src={`${import.meta.env.VITE_LOCAL_URL}${
                            blog.bannerImage
                        }`}
                        alt={blog.title}
                        className="w-full mx-1 object-cover mb-10 rounded shadow-md "
                    />
                    <div className="p-4">
                        <h1 className="md:text-4xl text-lg font-semibold text-red-500 mb-5 whitespace-pre-line ">
                            {blog.title}
                        </h1>
                        {/* <p className="text-gray-600 mb-4 text-lg">{blog.description}</p> */}

                        <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                            className="prose text-lg"
                        ></div>
                    </div>
                    <p className="text-gray-600 my-7 text-right text-md">
                        <div>
                            By{" "}
                            <NavLink to={`/`} className="underline">
                                {blog.author}
                            </NavLink>
                        </div>
                        <div>
                            on {new Date(blog.publishDate).toLocaleDateString()}
                        </div>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogDescriptions;
