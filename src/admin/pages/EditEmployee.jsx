import axios from "axios";
import { useEffect, useState } from "react";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";
import Swal from "sweetalert2";

const EditEmployee = () => {
    const [employee, setEmployee] = useState([]);
    const [employeeData, setEmployeeData] = useState({
        name: "",
        designation: "",
        linkedin: "",
        image: null,
    });
    const [editMode, setEditMode] = useState(false);
    const [currentEmployeeId, setCurrentEmployeeId] = useState(null);

    // fetch all employee on load
    useEffect(() => {
        fetchEmployees();
    }, []);

    // fetch all employee data
    const fetchEmployees = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_LOCAL_URL}/api/employee`
            );
            setEmployee(response.data);
        } catch (error) {
            console.log("error fetching employee", error);
        }
    };

    // handle Input change
    const handleInputChange = (e) => {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    };

    // handle file change
    const handleFileChange = (e) => {
        setEmployeeData({ ...employeeData, image: e.target.files[0] });
    };

    //Form create abd edit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("name", employeeData.name);
        data.append("designation", employeeData.designation);
        data.append("linkedin", employeeData.linkedin);
        if (employeeData.image) {
            data.append("image", employeeData.image);
        }

        try {
            if (editMode) {
                await axios.put(
                    `${
                        import.meta.env.VITE_LOCAL_URL
                    }/api/employee/${currentEmployeeId}`,
                    data,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                Swal.fire({
                    title: "Yeh-hey !",
                    text: "Employee Data Updated SuccessFully",
                    icon: "success",
                }).then(() => {
                    window.location.href = "/admin/edit-employees";
                });
                fetchEmployees();
                resetForm();
            } else {
                await axios.post(
                    `${import.meta.env.VITE_LOCAL_URL}/api/employee`,
                    data,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                Swal.fire({
                    title: "Yeh-hey !",
                    text: "Employee Data Created SuccessFully",
                    icon: "success",
                }).then(() => {
                    window.location.href = "/admin/edit-employees";
                });
                fetchEmployees();
                resetForm();
            }
        } catch (error) {
            console.log("Error creating employee", error);
        }
    };

    // Employee Edit
    const handleEdit = (employee) => {
        setEmployeeData({
            name: employee.name,
            designation: employee.designation,
            linkedin: employee.linkedin,
            image: null,
        });
        setCurrentEmployeeId(employee._id);
        setEditMode(true);
    };

    const handleDelete = async (employeeId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_LOCAL_URL}/api/employee/${employeeId}`
            );
            Swal.fire({
                title: "Yeh-hey !",
                text: "Employee Data Deleted SuccessFully",
                icon: "success",
                iconColor: "red",
            }).then(() => {
                window.location.href = "/admin/edit-employees";
            });
            fetchEmployees();
        } catch (error) {
            console.log("Error deleting employee", error);
        }
    };

    const resetForm = () => {
        setEmployeeData({
            name: "",
            designation: "",
            linkedin: "",
            image: null,
        });
        setCurrentEmployeeId(null);
        setEditMode(false);
    };

    return (
        <div>
            <HelmetWrapper
                title="Edit Employee"
                description="Welcome to the Dashboard page of Social Buzz Media."
            />
            <div className="text-4xl my-4">Edit Employee details</div>
            <div>
                <h2 className="text-2xl font-semibold text-red-500 mb-4 text-center">
                    All About Card List
                </h2>
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group ">
                        <tr className="border border-grey-500 md:border-none block md:table-row">
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Title
                            </th>
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Designation
                            </th>
                            <th className=" p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {employee.length > 0 ? (
                            employee.map((item) => (
                                <tr
                                    key={item._id}
                                    className="bg-red-300 border border-black md:border-none block md:table-row"
                                >
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        {item.name}
                                    </td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                        {item.designation}
                                    </td>
                                    <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mr-2"
                                        >
                                            Edit
                                        </button>
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
                            <p>No Employee Available</p>
                        )}
                    </tbody>
                </table>

                {/* Create Employee */}
                <div className="mx-auto mb-10">
                    <h2 className="text-3xl text-center text-red-500 font-medium mt-10 mb-6">
                        Create Employee Card
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="file"
                            name="employeeImage"
                            onChange={handleFileChange}
                            placeholder="Add Image"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <input
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            value={employeeData.name}
                            placeholder="Add Employee Name"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <input
                            type="text"
                            name="designation"
                            onChange={handleInputChange}
                            value={employeeData.designation}
                            placeholder="Add Employee Designation"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <input
                            type="text"
                            name="linkedin"
                            onChange={handleInputChange}
                            value={employeeData.linkedin}
                            placeholder="Add Employee LinkedIn URL"
                            className="rounded w-full p-2 border border-gray-200"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-full"
                        >
                            {editMode
                                ? "Update Employee Details"
                                : "Create Employee Details"}
                        </button>
                        {editMode && (
                            <button
                                onClick={resetForm}
                                className="bg-red-500 text-white p-2 rounded-full ml-2"
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;
