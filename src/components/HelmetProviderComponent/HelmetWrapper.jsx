import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";

const HelmetWrapper = ({ title, description, keywords }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Social Buzz Media - {title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Helmet>
        </HelmetProvider>
    );
};

HelmetWrapper.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
};

export default HelmetWrapper;
