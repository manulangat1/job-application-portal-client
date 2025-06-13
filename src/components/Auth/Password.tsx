import React from "react";
import ReusableInput from "../Reusable/Inputs/ReusableInput";
import ButtonContainer from "../Reusable/Buttons/ButtonContainer";
import "./auth.css";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import Resume from "../../assets/resume.svg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { singUpUser } from "../../store/slices/auth/authSlice";

const elements = [
  {
    label: "Input your password",
    name: "password",
    defaultValue: "",
    type: "password",
    placeholder: "kipmanu@10101",
  },
  {
    label: "Confirm your password",
    name: "confirmPassword",
    defaultValue: "",
    type: "password",
    placeholder: "kipmanu@10101",
  },
];
function Password() {
  const navigate = useNavigate();
  const { signUpData } = useSelector((state: RootState) => state.AuthReducer);
  console.log(signUpData, " my sign up data");
  const dispatch = useDispatch<AppDispatch>();
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const { password, confirmPassword } = values;
      if (password !== confirmPassword) {
        alert("Passwords are not equal");
      } else {
        dispatch(
          singUpUser({
            email: signUpData.email,
            username: signUpData.firstName,
            password: values.password,
          })
        );
      }
      navigate("/");
    },
  });
  return (
    <main className="sign-up">
      <section className="banner signup-flex">
        <img src={Resume} className="banner-img" alt="text of a cv writer" />
        <p>Enter a strong password! It is vital for your accounts security</p>
      </section>
      <section className="signup-flex">
        <form className="signup-form" onSubmit={formik.handleSubmit}>
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
          <ButtonContainer
            onCancel={() => navigate("/signup")}
            nextText="Sign up"
            cancelText="Previous"
          />
        </form>
      </section>
    </main>
  );
}

export default Password;
