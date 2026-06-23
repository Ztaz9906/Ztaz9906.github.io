"use client";

import { useEffect, useState } from "react";

interface PageViewsState {
  views: number | null;
  isLoading: boolean;
}

export function usePageViews(page: string): PageViewsState {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function trackPageView() {
      setIsLoading(true);

      try {
        const storageKey = `pf_visited_${page}`;
        const hasVisited = window.localStorage.getItem(storageKey);

        const response = await fetch(
          hasVisited ? `/api/views?page=${encodeURIComponent(page)}` : "/api/views",
          hasVisited
            ? { method: "GET", cache: "no-store" }
            : {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ page }),
              },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch page views for "${page}"`);
        }

        const data = await response.json();
        const nextViews =
          typeof data?.views === "number" ? data.views : null;

        if (!hasVisited && nextViews !== null) {
          window.localStorage.setItem(storageKey, "1");
        }

        if (isMounted) {
          setViews(nextViews);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setViews(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void trackPageView();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return { views, isLoading };
}
