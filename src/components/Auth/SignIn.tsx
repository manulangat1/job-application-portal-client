import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router";
import * as Yup from "yup";
import ReusableInput from "../Reusable/Inputs/ReusableInput";
import ButtonContainer from "../Reusable/Buttons/ButtonContainer";
import Resume from "../../assets/resume.svg";

const elements = [
  {
    label: "Email address",
    name: "email",
    defaultValue: "",
    type: "email",
    placeholder: "JohnDoe@gmail.com",
  },
  {
    label: "Password",
    name: "password",
    defaultValue: "",
    type: "password",
    placeholder: "kipmanu@10101",
  },
];

function SignIn() {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      localStorage.setItem("auth", "true");
      navigate("/");
    },
  });
  return (
    <main className="sign-up">
      <section className="banner signup-flex">
        <img src={Resume} className="banner-img" alt="text of a cv writer" />
        <p>Sign In to check your progress</p>
      </section>
      <section className="signup-flex">
        <form className="signup-form" onSubmit={formik.handleSubmit}>
          {elements.map((element) => (
            <ReusableInput
              type={element.type}
              defaultValue={element.defaultValue}
              label={element.label}
              placeholder={element.placeholder}
              value={
                formik.values[element.name as keyof typeof formik.values] || ""
              }
              onChange={formik.handleChange}
              name={element.name}
              formik={formik}
            />
          ))}
          <div className="solo-btn">
            <button className="btn next-btn"> Sign in</button>
          </div>

          <div className="otherLinks">
            <hr className="hr"></hr>
            <section>
              <p>
                Don't have an account?{" "}
                <Link to="/signup"> Sign up instead</Link>
              </p>
            </section>
          </div>
        </form>
      </section>
    </main>
  );
}

export default SignIn;
