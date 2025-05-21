import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useJobRecommendations = () => {
  const axiosSecure = useAxiosSecure();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosSecure.get("/recommendations");
      setRecommendations(response.data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to load job recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return { recommendations, isLoading, error, refetch: fetchRecommendations };
};

export default useJobRecommendations;
