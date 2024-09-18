import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/HomePage/Home.jsx";
import About from "./pages/AboutPage/About.jsx";
import Services from "./pages/ServicesPage/Services.jsx";
import Blogs from "./pages/BlogsPage/Blogs.jsx";
import Contact from "./pages/ContactPage/Contact.jsx";
import ServicesDescription from "./pages/ServicesDescriptionPage/ServicesDescription.jsx";
import BlogDescriptions from "./pages/BlogDescriptionPage/BlogDescriptions.jsx";

// import Dashboard from "../../admin/src/pages/Dashboard.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import AdminApp from "./admin/App.jsx";
import BlogEdit from "./admin/pages/BlogEdit.jsx";
import AboutEdit from "./admin/pages/AboutEdit.jsx";
import EditVisionMission from "./admin/pages/EditVisionMission.jsx";
import ServicesEdit from "./admin/pages/ServicesEdit.jsx";
import EditEmployee from "./admin/pages/EditEmployee.jsx";

const routers = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Frontend Routes */}
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="about-us" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route
                    path="/services/:slug"
                    element={<ServicesDescription />}
                />
                <Route path="blog" element={<Blogs />} />
                <Route path="/blog/:slug" element={<BlogDescriptions />} />
                <Route path="contact-us" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminApp />}>
                <Route index element={<Dashboard />} />
                <Route path="edit-blog" element={<BlogEdit />} />
                <Route path="edit-about" element={<AboutEdit />} />
                <Route
                    path="edit-vision-mission"
                    element={<EditVisionMission />}
                />
                <Route path="edit-services" element={<ServicesEdit />} />
                <Route path="edit-employees" element={<EditEmployee />} />
            </Route>
        </>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={routers} />
    </StrictMode>
);