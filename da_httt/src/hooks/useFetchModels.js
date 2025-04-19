import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchModels } from "../api/services/modelService";

const useFetchModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await fetchModels();
        setModels(data);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch models";
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      }
    };
    loadModels();
  }, []);

  return { models, loading, error };
};

export default useFetchModels;
