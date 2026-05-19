import { useEffect, useState } from "react";

const useIFSC = (ifsc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ifsc) return;

    const controller = new AbortController();

    const fetchIFSC = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://ifsc.razorpay.com/${ifsc.toUpperCase()}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Invalid IFSC");

        const result = await res.json();
        setData(result);

        console.log("✅ Bank data:", result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIFSC();

    return () => controller.abort();
  }, [ifsc]);

  return { data, loading, error };
};

export default useIFSC;
