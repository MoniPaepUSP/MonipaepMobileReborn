import { useState, useEffect } from "react";
import api from "../services/api";

export const useSearchSymptom = (searchTerm?: string) => {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSymptoms = async () => {
      setLoading(true);
      try {
        if (searchTerm) {
          const response = await api.get("/symptom", {
            params: { symptom: searchTerm },
          });
          setSymptoms(response.data.symptoms);
          return symptoms;
        } else {
          const response = await api.get("/symptom");
          setSymptoms(response.data.symptoms);
          return symptoms;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, [searchTerm]);

  return { symptoms, loading };
};

export const useSearchSpecialCondition = (searchTerm?: string) => {
  const [specialConditions, setSpecialConditions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSpecialConditions = async () => {
      setLoading(true);
      try {
        if (searchTerm) {
          const response = await api.get("/special-conditions", {
            params: { symptom: searchTerm },
          });
          setSpecialConditions(response.data.specialConditions);
          return specialConditions;
        } else {
          const response = await api.get("/special-conditions");
          setSpecialConditions(response.data.specialConditions);
          return specialConditions;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialConditions();
  }, [searchTerm]);

  return { specialConditions, loading };
};

export const useSearchComorbity = (searchTerm?: string) => {
  const [comorbities, setComorbities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComorbity = async () => {
      setLoading(true);
      try {
        if (searchTerm) {
          const response = await api.get("/comorbity", {
            params: { symptom: searchTerm },
          });
          setComorbities(response.data.comorbities);
          return comorbities;
        } else {
          const response = await api.get("/comorbity");
          setComorbities(response.data.comorbities);
          return comorbities;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComorbity();
  }, [searchTerm]);

  return { comorbities, loading };
};

