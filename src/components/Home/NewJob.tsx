import React from "react";
import ReusableInput from "../Reusable/Inputs/ReusableInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import ReusableButton from "../Reusable/Buttons/ReusableButton";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import { postJobApplication } from "../../store/slices/jobs/jobSlice";
import { Bounce, toast } from "react-toastify";
const elements = [
  {
    label: "name",
    name: "name",
    defaultValue: "",
    type: "text",
    placeholder: "software engineer",
  },
  {
    label: "expectedSalary",
    name: "expectedSalary",
    defaultValue: "",
    type: "number",
    placeholder: "21000",
  },
  {
    label: "Link",
    name: "link",
    defaultValue: "",
    type: "url",
    placeholder: "https://",
  },
  {
    label: "Date Applied",
    name: "dateApplied",
    defaultValue: "",
    type: "date",
    placeholder: "",
  },
];

function NewJob() {
  const initialValues = {
    name: "",
    expectedSalary: "",
    link: "",
    dateApplied: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required."),
    expectedSalary: Yup.string().required("expectedSalary is required."),
    link: Yup.string().required("Link is required."),
    dateApplied: Yup.date().required("Date Applied is required."),
  });

  const { errorMessage } = useSelector((state: RootState) => state.jobs);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(postJobApplication(values));

      toast("Job app record added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      navigate("/");
    },
  });
  return (
    <section className="new-job">
      <form onSubmit={formik.handleSubmit}>
        <section className="grid-container">
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
        </section>
        <ReusableButton
          onClick={() => console.log("I am clicked!")}
          name="Add a new Job"
        />
      </form>
    </section>
  );
}

export default NewJob;
