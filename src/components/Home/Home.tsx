import React, { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import {
  deleteJobApplication,
  fetchJobs,
  updateJobApplication,
} from "../../store/slices/jobs/jobSlice";
import ReusableButton from "../Reusable/Buttons/ReusableButton";
import { Link } from "react-router";
import SelectBox from "../Reusable/SelectBox";
import { JobApplicationStatusList } from "../Common/constant/constant";
import Loader from "../Reusable/loaders/Loading";

const tableHeaders = [
  "Id",
  "Name",
  "Link",
  "status",
  "description",
  "Expected Salary",
  "Applied on",
  "Update",
  "Delete",
];
function Home() {
  const { user } = useSelector((state: RootState) => state.AuthReducer);
  const { jobs, isLoading } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchJobs());
    }, 200);
  }, []);

  const onChange = async (id: number, value: string) => {
    await dispatch(updateJobApplication({ id, data: { status: value } }));
    window.location.reload();
  };

  const onClick = async (id: number, action: string) => {
    switch (action) {
      case "update":
        console.log(action, id, "switch");

        break;
      case "delete":
        await dispatch(deleteJobApplication(id));
        window.location.reload();
        break;
      default:
        return;
    }
  };

  return (
    <main className="home">
      {isLoading === true ? (
        <Loader isLoading={isLoading} size="150" style={true} />
      ) : (
        <section>
          <h2>Hi , {user.email}</h2>
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs?.map((job) => (
                <tr key={job?.id}>
                  <td>{job?.id}</td>
                  <td>{job?.name}</td>
                  <td>
                    <Link to={job?.link}>View Link</Link>
                  </td>
                  <td>
                    <SelectBox
                      values={JobApplicationStatusList}
                      name="status"
                      id={job.id}
                      onChange={onChange}
                      defaultValue={job.status}
                    />
                  </td>
                  <td>{job?.description ? job?.description : "---"}</td>
                  <td>{job?.expectedSalary ? job.expectedSalary : "---"}</td>
                  <td>{job?.appliedDate}</td>
                  <td>
                    <ReusableButton
                      name="Update"
                      onClick={onClick}
                      id={job.id}
                      action="update"
                      sm
                    />
                  </td>

                  <td>
                    <ReusableButton
                      name="Delete"
                      onClick={onClick}
                      id={job.id}
                      action="delete"
                      sm
                      danger
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}

export default Home;
