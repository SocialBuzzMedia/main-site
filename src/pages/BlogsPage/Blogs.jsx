import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../components/BlogCardComponent/BlogCard.jsx";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper.jsx";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_LOCAL_URL}/api/blogs`
            );
            setBlogs(response.data);
        };
        fetchBlogs();
    }, []);

    return (
        <>
            {/* Meta Title And Description */}
            <HelmetWrapper
                title="Blog"
                description="Welcome to the blog page of Social Buzz Media"
            />

            {/* Blog Hero Section */}
            <HeroSection
                heroHeading={`Welcome to Blogs of Social Buzz Media`}
                heroSubHeading={`Stay Tuned ...`}
                overlayClassName={`bg-overlay-a`}
            />

            {/* Blog Card Section */}
            <div className="my-10 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-center items-center  md:w-10/12 w-4/5 gap-5 mx-auto">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </>
    );
};

export default Blogs;
