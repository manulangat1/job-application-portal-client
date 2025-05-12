import React from "react";
import ReusableInput from "../Reusable/Inputs/ReusableInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import ReusableButton from "../Reusable/Buttons/ReusableButton";
const elements = [
  {
    label: "Title",
    name: "title",
    defaultValue: "",
    type: "text",
    placeholder: "software engineer",
  },
  {
    label: "Location",
    name: "location",
    defaultValue: "",
    type: "text",
    placeholder: "Remote",
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
    placeholder: new Date().getTime(),
  },
];

function NewJob() {
  const initialValues = {
    title: "",
    location: "",
    link: "",
    dateApplied: "",
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    location: Yup.string().required("Location is required."),
    link: Yup.string().required("Link is required."),
    dateApplied: Yup.date().required("Date Applied is required."),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
        <ReusableButton name="Add a new Job" />
      </form>
    </section>
  );
}

export default NewJob;
