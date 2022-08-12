import React, { useState, useEffect } from "react";

import "@pathofdev/react-tag-input/build/index.css";
import { storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile  } from "firebase/auth";

const initialState = {
  firstName: "",
  lastName: "",
  photoUrl: "",
};

const EditProfile = () => {
  const currentUser = useAuthState(auth)
  console.log(currentUser)
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { firstName, lastName, photoUrl } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, photoUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName && lastName) {
      if (!id) {
        try {
          await updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`, photoURL: photoUrl
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
          toast.success("Profile update successfully");
        } catch (error) {
          toast.error(error);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }

    navigate("/");
  };




  return (
    <div className="container-fluid mb-4">
      <div className="container">

        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleSubmit}>

              <>
                <div className="col-6 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  />
                </div>
              </>
              <div className="mb-2 mt-2" style={{color: 'Blue'}}>Upload Avatar</div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                  style={{ backgroundColor: "Blue" }}
                  disabled={progress !== null && progress < 100}
                >
                  Update profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
