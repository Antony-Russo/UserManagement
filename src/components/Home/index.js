import React, { Component } from "react";
import axios from "axios";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin7Line, RiUserAddLine } from "react-icons/ri";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

class Home extends Component {
    state = {
        users: [],
        loading: true,
        error: null,
        isDialogOpen: false,
        formState: {
            id: null,
            name: "",
            username: "",
            email: "",
            department: "",
        },
        isEditing: false,
        formErrors: {
            name: "",
            email: "",
            department: "",
        },
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            this.setState({ users: response.data, loading: false });
        } catch (error) {
            this.setState({ error: "Failed to fetch users", loading: false });
            toast.error("Failed to fetch users");
        }
    };

    handleOpenDialog = (user = null) => {
        this.setState({
            isEditing: !!user,
            isDialogOpen: true,
            formState: user
                ? { ...user, department: user.company?.bs || "" }
                : { id: null, name: "", username: "", email: "", department: "" },
            formErrors: { name: "", email: "", department: "" },
        });
    };

    handleCloseDialog = () => {
        this.setState({
            isDialogOpen: false,
            formState: { id: null, name: "", username: "", email: "", department: "" },
            formErrors: { name: "", email: "", department: "" },
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formState: { ...prevState.formState, [name]: value },
        }));
    };

    handleSave = async () => {
        const { id, name, username, email, department } = this.state.formState;
        let formErrors = {};

        // Validation
        if (!name) formErrors.name = "First Name is required";
        if (!email) formErrors.email = "Email is required";
        if (email && !/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email is invalid";
        if (!department) formErrors.department = "Department is required";

        if (Object.keys(formErrors).length > 0) {
            this.setState({ formErrors });
            return;
        }

        const updatedUser = { id, name, username, email, company: { bs: department } };

        try {
            if (this.state.isEditing) {
                const response = await axios.put(
                    `https://jsonplaceholder.typicode.com/users/${id}`,
                    updatedUser
                );
                this.setState((prevState) => ({
                    users: prevState.users.map((user) =>
                        user.id === id ? { ...user, ...response.data, company: { bs: department } } : user
                    ),
                }));
                toast.success("User updated successfully!");
            } else {
                const response = await axios.post(
                    "https://jsonplaceholder.typicode.com/users",
                    updatedUser
                );
                const newUser = { ...updatedUser, id: response.data.id };
                this.setState((prevState) => ({
                    users: [...prevState.users, newUser],
                }));
                toast.success("New user added successfully!");
            }
            this.handleCloseDialog();
        } catch (error) {
            this.setState({ error: "Failed to save user" });
            toast.error("Failed to save user. Please try again.");
        }
    };

    handleDelete = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            this.setState((prevState) => ({
                users: prevState.users.filter((user) => user.id !== id),
            }));
            toast.success("User deleted successfully!");
        } catch (error) {
            this.setState({ error: "Failed to delete user" });
            toast.error("Failed to delete user. Please try again.");
        }
    };

    renderLoaderView = () => (
        <div className="loader-container">
            <ClipLoader size={35} color="green" aria-label="Loading Spinner" />
        </div>
    );

    renderNotFoundView = () => {
        return (
            <div className="not-found-container">
                <img
                    src="https://res.cloudinary.com/dyftxeexv/image/upload/v1737964143/x1rsa3pwlhdnn3cyzarg.png"
                    alt="not-found-img"
                    className="not-found-img"
                />
                <strong>{this.state.error}</strong>
            </div>
        );
    };

    renderDashBoard = () => {
        const { users, isDialogOpen, formState, isEditing, formErrors } = this.state;

        return (
            <div className="main-branch-container">
                <div className="div-block">
                    <h1 className="gradient-header">User Management Dashboard</h1>
                    <div className="orange-line2"></div>
                </div>
                <button
                    className="handle-add-btn"
                    onClick={() => this.handleOpenDialog()}
                >
                    Add User <RiUserAddLine />
                </button>
                <div className="app-container">
                    <div className="user-list">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <div key={user.id} className="user-card">
                                    <p className="user-data" style={{ textAlign: "center" }}>
                                        <strong className="strong">S no:</strong> {index + 1}
                                    </p>
                                    <p className="user-data">
                                        <strong className="strong">ID:</strong> {user.id}
                                    </p>
                                    <p className="user-data">
                                        <strong className="strong">Name:</strong> {user.name}{" "}
                                        {user.username}
                                    </p>
                                    <p className="user-data">
                                        <strong className="strong">Email:</strong> {user.email}
                                    </p>
                                    <p className="user-data">
                                        <strong className="strong">Department: </strong>
                                        {user.company?.bs || "N/A"}
                                    </p>
                                    <div className="card-actions">
                                        <button
                                            className="handle-btn user-icon"
                                            onClick={() => this.handleOpenDialog(user)}
                                        >
                                            <LiaUserEditSolid />
                                        </button>
                                        <button
                                            className="handle-btn del-icon"
                                            onClick={() => this.handleDelete(user.id)}
                                        >
                                            <RiDeleteBin7Line />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-data-found-container">
                                <img
                                    src="https://res.cloudinary.com/dyftxeexv/image/upload/v1737963493/b7pnqnqhstyqt8l6jyda.png"
                                    alt="no-img"
                                    className="no-data-img"
                                />
                                <p>Oops! No Data Found</p>
                            </div>
                        )}
                    </div>

                    {isDialogOpen && (
                        <div className="overlay" onClick={this.handleCloseDialog}>
                            <div className="dialog" onClick={(e) => e.stopPropagation()}>
                                <h2 className="dialog-head">
                                    {isEditing ? "Edit User" : "Add User"}
                                </h2>
                                <div className="dialog-content">
                                    <div className="form-group">
                                        <label htmlFor="name">First Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            placeholder="Enter First Name"
                                            value={formState.name}
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.name && (
                                            <span className="helper-text">{formErrors.name}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Last Name</label>
                                        <input
                                            id="username"
                                            name="username"
                                            placeholder="Enter Last Name (Optional)"
                                            value={formState.username}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter Email"
                                            value={formState.email}
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.email && (
                                            <span className="helper-text">{formErrors.email}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="department">Department</label>
                                        <input
                                            id="department"
                                            name="department"
                                            placeholder="Enter Department"
                                            value={formState.department || ""}
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.department && (
                                            <span className="helper-text">{formErrors.department}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="dialog-btn-container">
                                    <button className="cancel-btn" onClick={this.handleCloseDialog}>
                                        Cancel
                                    </button>
                                    <button className="save-add-btn" onClick={this.handleSave}>
                                        {isEditing ? "Save Changes" : "Add User"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    render() {
        const { loading, error } = this.state;

        return (
            <>
                <ToastContainer position="top-right" autoClose={3000} />
                {loading && this.renderLoaderView()}
                {error ? this.renderNotFoundView() : this.renderDashBoard()}
            </>
        );
    }
}

export default Home;
