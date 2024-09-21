import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/NavbarComponent/Navbar";
import Footer from "./components/FooterComponent/Footer";
import ContactModalForm from "./components/ContactModalFormPage/ContactModalForm";
import { useEffect } from "react";
// import Login from "./admin/pages/Login";
// import LoginPage from "./admin/pages/LoginPage";

import ReactGA from "react-ga4";

function App() {
    const location = useLocation();

    // Initialize Analytics on site load
    useEffect(() => {
        ReactGA.initialize(`${import.meta.env.VITE_G_ANALYTICS}`);
    });

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname,
        });
    }, [location]);
    return (
        <>
            <Navbar />
            <section className=" pt-10">
                <Outlet />
            </section>
            <section className="bg-white sticky">
                <Footer />
            </section>
            <ContactModalForm />
            {/* <Login /> */}
        </>
    );
}

export default App;
