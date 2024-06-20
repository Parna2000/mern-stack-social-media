import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userAvatarPreview, setUserAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserAvatarPreview(reader.result);
      setUserAvatar(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("userAvatar", userAvatar);
      await axios
        .post("http://localhost:4000/api/v1/user/register", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <p>Please Register To Continue</p>
      <form onSubmit={handleRegister}>
        <div
          className="mb-3"
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={userAvatarPreview ? `${userAvatarPreview}` : "/userAvatar.png"}
            alt="User Avatar"
            height={"220px"}
            width={"220px"}
          />
          <input type="file" onChange={handleAvatar} />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="First Name"
            className="form-control"
            id="firstName"
            aria-describedby="emailHelp"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Last Name"
            className="form-control"
            id="lastName"
            aria-describedby="emailHelp"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Mobile Number"
            className="form-control"
            id="phone"
            aria-describedby="emailHelp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div class="row mb-3">
          <label for="dob" class="col-sm-2 col-form-label">
            Date of Birth:
          </label>
          <div class="col-sm-10">
            <input
              type={"date"}
              placeholder="Date of Birth"
              className="form-control"
              id="dob"
              aria-describedby="emailHelp"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Login Now
          </Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
