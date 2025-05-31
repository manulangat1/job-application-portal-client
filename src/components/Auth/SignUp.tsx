import React from "react";
import "./auth.css";
import ReusableInput from "../Reusable/Inputs/ReusableInput";
import ButtonContainer from "../Reusable/Buttons/ButtonContainer";
import { Link, useNavigate } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import Resume from "../../assets/resume.svg";

const elements = [
  {
    label: "First Name",
    name: "firstName",
    defaultValue: "",
    type: "text",
    placeholder: "John",
  },
  {
    label: "Last Name",
    name: "lastName",
    defaultValue: "",
    type: "text",
    placeholder: "Doe",
  },
  {
    label: "Your email address",
    name: "email",
    defaultValue: "",
    type: "email",
    placeholder: "JohnDoe@gmail.com",
  },
];
function SignUp() {
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    lastName: Yup.string()
      .min(2, "Last Name must be at least 2 characters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      navigate("/password");
    },
  });
  return (
    <main className="sign-up">
      <section className="banner signup-flex">
        <img src={Resume} className="banner-img" alt="text of a cv writer" />
        <p>Welcome to Jobzy web application!</p>
        {/* <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel iure
          modi in voluptatum, repudiandae numquam maxime dolorum laudantium sed
          ex pariatur repellendus cupiditate, eos odio nam, quo natus! Delectus,
          quam?
        </p> */}
      </section>
      <section className="signup-flex">
        <form className="signup-form" onSubmit={formik.handleSubmit}>
          {formik.status ? (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          ) : (
            ""
          )}
          {elements.map((element) => (
            <ReusableInput
              formik={formik}
              type={element.type}
              defaultValue={element.defaultValue}
              label={element.label}
              placeholder={element.placeholder}
              value={
                formik.values[element.name as keyof typeof formik.values] || ""
              }
              onChange={formik.handleChange}
              name={element.name}
            />
          ))}
          <div className="solo-btn">
            <button className="btn next-btn"> Sign in</button>
          </div>
        </form>

        <hr className="hr"></hr>
        <section>
          <p>
            Already have an account? <Link to="/signin"> Sign in instead</Link>
          </p>
        </section>
      </section>
    </main>
  );
}

export default SignUp;
