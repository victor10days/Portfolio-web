import { useState, useEffect } from 'react';

export function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // No setState at the top of the effect: endpoint is a constant at every
    // call site, so resetting here would only cascade renders.
    let cancelled = false;

    fetch(endpoint)
      .then((r) => {
        // Without this, a 500 that returns an HTML error page parses as JSON,
        // throws, and takes the same silent path as a network failure.
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((d) => {
        if (cancelled) return;
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading, error, setData };
}
