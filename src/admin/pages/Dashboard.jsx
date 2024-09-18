// import CreateBlog from "../components/CreateBlog.jsx";
// import Sidebar from "../components/Sidebar.jsx";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";
const Dashboard = () => {
    return (
        <>
            <HelmetWrapper
                title="DashBoard"
                description="Welcome to the Dashboard page of Social Buzz Media."
            />
            <div className=" flex justify-center items-center text-4xl flex-col gap-10">
                <div>
                    Welcome to{" "}
                    <span className="text-red-500">Social Buzz Media</span>
                </div>{" "}
                <div>
                    {" "}
                    Navigate through the menu and update or delete website items{" "}
                </div>
                {/* <CreateBlog /> */}
            </div>
        </>
    );
};

export default Dashboard;
