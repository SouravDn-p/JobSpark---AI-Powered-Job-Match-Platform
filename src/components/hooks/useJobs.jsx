import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
const useJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        const response = await axiosSecure.get("/jobs");
        setJobs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, [axiosSecure]);

  return { jobs, jobsLoading, error };
};

export default useJobs;
