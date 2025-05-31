import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NewJob from "./NewJob";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";

import { fetchJobs } from "../../store/slices/jobs/jobSlice";
import ReusableButton from "../Reusable/Buttons/ReusableButton";
import { Link } from "react-router";
import SelectBox from "../Reusable/SelectBox";
import { JobApplicationStatusList } from "../Common/constant/constant";

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
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.AuthReducer);
  const { jobs, isLoading } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(fetchJobs());
    }, 200);

    setLoading(false);
  }, []);
  // TODO: also get the id of the same
  const onChange = (id: number, value: string) => {
    console.log(id, value);
  };

  return (
    <main className="home">
      {loading === true ? (
        <Skeleton count={25} />
      ) : (
        <main>
          {/* <h1> Hi , {user?.email ? user?.email : "User"} </h1> */}

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
                    <Link to={job?.link}>{job?.link}</Link>
                  </td>
                  {/* <td>{job?.status}</td> */}
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
                    <ReusableButton name="Update" sm />
                  </td>

                  <td>
                    <ReusableButton name="Delete" sm danger />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}
    </main>
  );
}

export default Home;
