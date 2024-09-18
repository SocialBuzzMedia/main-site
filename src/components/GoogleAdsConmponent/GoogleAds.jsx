import PropTypes from "prop-types";
import { useEffect } from "react";

const GoogleAds = ({ adSlot }) => {
    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);
    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block", textAlign: "center" }}
            data-ad-client="ca-pub-9104246397494831"
            data-ad-slot={adSlot} //Add this ad slot as props in the places where blog is going
            data-ad-format="auto"
        />
    );
};

GoogleAds.propTypes = {
    adSlot: PropTypes.string.isRequired,
};

export default GoogleAds;
