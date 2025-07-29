import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { fetchJobWithPagination } from "../../store/slices/jobs/jobService";

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

  //  pagination logic for infinite scroll.
  const initialLoadRef = useRef(false);
  const [take, setTake] = useState<number>(5);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const observerTarget = useRef<HTMLTableSectionElement>(null);
  // const { jobs, isLoading } = useSelector((state: RootState) => state.jobs);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleLoadMoreJobs = useCallback(async () => {
    if (loading || !hasMore || isLoading) return;
    setLoading(true);
    try {
      const { jobs, hasMore } = await fetchJobWithPagination(take, skip);

      handleSetJobs(jobs);
      setHasMore(hasMore);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setSkip((prevSkip: number) => prevSkip + take);
  }, [loading, hasMore, isLoading, take, skip]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        //  only load when neccessary!
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          hasMore &&
          !loading &&
          jobs?.length > 0
        ) {
          handleLoadMoreJobs();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
      observer.disconnect();
    };
  }, [handleLoadMoreJobs, isLoading, jobs?.length, loading, observerTarget]);

  const loadInitialJobs = useCallback(async () => {
    try {
      const { jobs, hasMore } = await fetchJobWithPagination(take, skip);

      handleSetJobs(jobs);
      setHasMore(hasMore);

      initialLoadRef.current = true;
      // set the skip and take for the next cycle!
      setSkip((prevSkip) => prevSkip + take);
    } catch (error) {
      console.log("Error !!:", error);
    }
  }, []);

  const handleSetJobs = (newJobs: any[]) => {
    newJobs.forEach((job) => {
      const itemExists = jobs.some((existingJob) => existingJob.id === job.id);
      if (!itemExists) {
        setJobs((prevJobs) => [...prevJobs, job]);
      }
    });
  };

  const hasRun = useRef(false);

  useEffect(() => {
    // strict enforcing to ensure that this is only run once!
    if (!hasRun.current) {
      hasRun.current = true;

      loadInitialJobs();
    }
  }, []);

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
              {
                // jobs &&
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
                ))
              }
            </tbody>
          </table>
          {!isLoading && hasMore && !loading && jobs && jobs?.length > 0 && (
            <div ref={observerTarget}></div>
          )}
        </section>
      )}
    </main>
  );
}

export default Home;
