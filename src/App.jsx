import { Outlet } from "react-router-dom";
import Navbar from "./components/NavbarComponent/Navbar";
import Footer from "./components/FooterComponent/Footer";
import ContactModalForm from "./components/ContactModalFormPage/ContactModalForm";
// import Login from "./admin/pages/Login";
// import LoginPage from "./admin/pages/LoginPage";

function App() {
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
