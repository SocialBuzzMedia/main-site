// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
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
            <div className="w-[728px] h-[90px] bg-red-500 mx-auto"></div>
            {/* Vertical Left */}
            <div className="w-[160px] h-[600px] bg-red-500 float-start inline-block"></div>
            {/* Vertical Right */}
            <div className="w-[160px] h-[600px] bg-red-500 float-end inline-block"></div>
            {/* Blog Content */}
            <div className="w-7/12 mx-auto mt-10">
                {/* Meta Title And Description */}
                <HelmetWrapper
                    title={blog.metaTitle}
                    description={blog.metaDescription}
                />
                <img
                    src={`${import.meta.env.VITE_LOCAL_URL}${blog.bannerImage}`}
                    alt={blog.title}
                    className="w-full  object-cover mb-10 rounded shadow-md "
                />
                <h1 className="text-5xl font-semibold text-red-500 mb-5 text-center">
                    {blog.title}
                </h1>
                {/* <p className="text-gray-600 mb-4 text-lg">{blog.description}</p> */}

                <div
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    className="prose text-lg"
                ></div>
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
    );
};

export default BlogDescriptions;
