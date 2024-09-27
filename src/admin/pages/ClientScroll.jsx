import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";

const ClientScroll = () => {
    const [client, setClient] = useState([]);
    const [clientData, setClientData] = useState({
        name: "",
        image: null,
    });
    const [error, setError] = useState("");

    // Fetch all clients on page load
    useEffect(() => {
        fetchClients();
    }, []);

    // fetch all client data
    const fetchClients = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_LOCAL_URL}/api/client`
            );
            setClient(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    // Handle Input Changes
    const handleInputChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    };

    // handle File Change
    const handleFileChange = (e) => {
        setClientData({ ...clientData, image: e.target.files[0] });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("name", clientData.name);
        if (clientData.image) {
            data.append("image", clientData.image);
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_LOCAL_URL}/api/client`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            Swal.fire({
                title: "Client Created",
                icon: "success",
                confirmButtonText: "Okay",
            }).then(() => {
                window.location.href = "/basement/edit-clients";
            });
            fetchClients();
            resetForm();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    // Delete Client
    const handleDelete = async (currentClientId) => {
        try {
            await axios.delete(
                `${
                    import.meta.env.VITE_LOCAL_URL
                }/api/client/${currentClientId}`
            );
            Swal.fire({
                title: "Client Deleted",
                icon: "success",
                confirmButtonText: "Okay",
            }).then(() => {
                window.location.href = "/basement/edit-clients";
            });
            fetchClients();
        } catch (error) {
            setError("Error Deleting Client", error);
        }
    };

    // Resetting the form
    const resetForm = () => {
        setClientData({ name: "", image: null });
    };
    return (
        <div>
            <HelmetWrapper
                title="Edit Clients"
                description="Welcome to the Dashboard page of Social Buzz Media."
            />

            <h1 className="text-4xl my-4 ">Client Scrolls</h1>

            {/* Uploaded Client */}
            <div>
                <h2 className="text-2xl font-semibold text-red-500 mb-4 text-center">
                    All Clients Card
                </h2>
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group ">
                        <tr className="border border-grey-500 md:border-none block md:table-row">
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Title
                            </th>

                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {client.length > 0 ? (
                            client.map((item) => (
                                <tr
                                    key={item._id}
                                    className="bg-red-300 border border-black md:border-none block md:table-row"
                                >
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        {item.name}
                                    </td>
                                    <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                        <button
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>No Client Available</p>
                        )}
                    </tbody>
                </table>

                {/* Creation Form */}
                <div className="mx-auto mb-10">
                    <h2 className="text-3xl text-center text-red-500 font-medium mt-10 mb-6">
                        Create Employee Card
                    </h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="file"
                            name="employeeImage"
                            onChange={handleFileChange}
                            placeholder="Add Image"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <p className="text-red-600 text-[11px]">
                            Image size should be less than 1 MB <br /> Dimension
                            should be 600X400 px
                        </p>
                        <input
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            value={clientData.name}
                            placeholder="Add Employee Name"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-full"
                        >
                            Create Client Card
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClientScroll;
