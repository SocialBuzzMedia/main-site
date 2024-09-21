// import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <>
            <div className="p-3 shadow-md border border-red-200 rounded-lg bg-white hover:transition hover:duration-200 hover:shadow-lg hover:shadow-red-400">
                <img
                    src={`${import.meta.env.VITE_LOCAL_URL}${blog.bannerImage}`}
                    alt={blog.title}
                    className="rounded-t-lg shadow-md"
                />

                <div className="flex flex-col justify-center items-center p-2">
                    <h2 className="my-3 text-2xl font-semibold text-red-500 text-center whitespace-pre-line">
                        {blog.title.substring(0, 35) + " " + "..."}
                    </h2>
                    <p className="mb-4 px-2 whitespace-pre-line">
                        {blog.description.substring(0, 200) + " " + "..."}
                    </p>
                    <p className="text-gray-600 my-7 flex justify-between">
                        By {blog.author} {""}
                        on {new Date(blog.publishDate).toLocaleDateString()}
                    </p>
                    <Link
                        to={`/blog/${blog.slug}`}
                        className="rounded-full bg-red-500 w-full text-center py-2 font-medium text-white hover:shadow-lg"
                    >
                        Read the whole blog
                    </Link>
                </div>
            </div>
        </>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.string,
};

// BlogCard.propTypes = {
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     publishDate: PropTypes.string.isRequired,
//     cardLink: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
// };

export default BlogCard;
