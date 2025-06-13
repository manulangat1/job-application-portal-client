import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_API_URL;
const JOB_API = BASE_URL + "/jobs";
export const fetchJobService = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  };

  const response = await axios.get(JOB_API, config);

  return response.data;
};

export const postfetchJobService = async (data: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  };

  const response = await axios.post(JOB_API, data, config);

  return response.data;
};

export const updateJobApplicationService = async (id: number, data: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  };

  const response = await axios.put(`${JOB_API}/${id}`, data, config);

  return response.data;
};

export const deleteJobPost = async (id: number) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  };

  const response = await axios.delete(`${JOB_API}/${id}`, config);

  return response.data;
};
const jobApiService = {
  fetchJobService,
  postfetchJobService,
  deleteJobPost,
  updateJobApplicationService,
};
export default jobApiService;
