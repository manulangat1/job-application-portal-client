import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import {
  deleteJobApplication,
  fetchJobs,
  updateJobApplication,
  // type JobApplication,
} from "../../store/slices/jobs/jobSlice";
import ReusableButton from "../Reusable/Buttons/ReusableButton";
import SelectBox from "../Reusable/SelectBox";
import {
  CurrenciesList,
  JobApplicationDescriptionList,
  JobApplicationStatus,
  JobApplicationStatusList,
} from "../Common/constant/constant";
import Loader from "../Reusable/loaders/Loading";

const tableHeaders = [
  "Id",
  "Name",
  "Link",
  "status",
  "description",
  "Expected Salary",
  "Currency",
  "Applied on",
  "Update",
  "Delete",
];
function Home() {
  type FormState = {
    expectedSalary: number | null;
    currency: string | null;
    status: string | null; // or JobApplicationStatus | null
    description: string | null;
  };

  const { user } = useSelector((state: RootState) => state.AuthReducer);
  // const [hasMore, setHasMore] = useState<boolean>(false);
  // const [job, setJob] = useState<JobApplication[]>([]);
  // const [take, setTake] = useState<number>(1);
  // const [skip, setSkip] = useState<number>(0);
  const { jobs, isLoading } = useSelector((state: RootState) => state.jobs);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [displayRejectionReasons, setDisplayRejectionReasons] =
    useState<boolean>(false);

  const [updatedItems, setUpdatedItems] = useState<FormState>({
    expectedSalary: null,
    currency: null,
    status: null,
    description: null,
  });
  const [displayRejectionReasonsId, setDisplayRejectionReasonsId] = useState<
    number | null
  >(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchJobs());
    }, 200);
  }, []);

  // const getJobs = () => {};

  const onChange = async (id: number, value: string) => {
    switch (value) {
      case JobApplicationStatus.REJECTED:
        setDisplayRejectionReasons(true);
        setDisplayRejectionReasonsId(id);
        setUpdatedItems((prev) => ({
          ...prev,
          status: JobApplicationStatus.REJECTED,
        }));
        break;
      default: {
        setUpdatedItems((prev) => ({
          ...prev,
          status: value,
        }));
      }
    }
  };

  const onDescriptionChange = async (id: number, value: string) => {
    setUpdatedItems((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const onClick = async (id: number, action: string) => {
    switch (action) {
      case "update":
        setEditingRowId(id);
        break;
      case "delete":
        await dispatch(deleteJobApplication(id));
        window.location.reload();
        break;
      case "save": {
        await dispatch(
          updateJobApplication({
            id,
            data: {
              ...(updatedItems.expectedSalary != null && {
                expectedSalary: Number(updatedItems.expectedSalary),
              }),
              ...(updatedItems.currency != null && {
                currency: updatedItems.currency,
              }),
              ...(updatedItems.status != null && {
                status: updatedItems.status,
              }),
              ...(updatedItems.description != null && {
                description: updatedItems.description,
              }),
            },
          })
        );
        window.location.reload();
        break;
      }

      default:
        return;
    }
  };

  const onUpdateChange = (id: number, value: string) => {
    updatedItems.currency = value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedItems((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="home">
      {isLoading === true ? (
        <Loader isLoading={isLoading} size="150" style={true} />
      ) : (
        <section className="home-component">
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
              {jobs &&
                jobs?.map((job) => (
                  <tr key={job?.id}>
                    <td>{job.id}</td>
                    <td>{job?.name}</td>
                    <td>
                      <a href={job.link} target="_blank">
                        View Link
                      </a>
                    </td>
                    <td>
                      {editingRowId === job.id ? (
                        <SelectBox
                          values={JobApplicationStatusList}
                          name="status"
                          id={job.id}
                          onChange={onChange}
                          defaultValue={job.status}
                        />
                      ) : (
                        job.status
                      )}
                    </td>
                    <td>
                      {" "}
                      {displayRejectionReasons &&
                      job.id === displayRejectionReasonsId ? (
                        <SelectBox
                          values={JobApplicationDescriptionList}
                          name="description"
                          id={job.id}
                          onChange={onDescriptionChange}
                          defaultValue={job?.description}
                        />
                      ) : job.description ? (
                        job.description
                      ) : (
                        "---"
                      )}{" "}
                    </td>
                    <td>
                      {editingRowId === job.id ? (
                        <input
                          className="edit-input"
                          type="number"
                          name="expectedSalary"
                          onChange={handleChange}
                          defaultValue={job.expectedSalary}
                        />
                      ) : job?.expectedSalary ? (
                        job.expectedSalary
                      ) : (
                        "---"
                      )}
                    </td>

                    <td>
                      {editingRowId === job.id ? (
                        <SelectBox
                          values={CurrenciesList}
                          name="currency"
                          id={job.id}
                          onChange={onUpdateChange}
                          defaultValue={job.currency}
                        />
                      ) : job?.currency ? (
                        job.currency
                      ) : (
                        "---"
                      )}
                    </td>
                    <td>
                      {editingRowId === job.id ? (
                        <input
                          className="edit-input"
                          type="date"
                          defaultValue={job.appliedDate}
                        />
                      ) : (
                        job?.appliedDate
                      )}
                    </td>
                    <td>
                      {editingRowId === job.id ? (
                        <ReusableButton
                          name="Save"
                          onClick={onClick}
                          id={job.id}
                          action="save"
                          sm
                        />
                      ) : (
                        <ReusableButton
                          name="Update"
                          onClick={onClick}
                          id={job.id}
                          action="update"
                          sm
                        />
                      )}
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
