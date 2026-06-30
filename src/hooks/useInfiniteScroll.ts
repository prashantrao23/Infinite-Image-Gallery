import {
  useEffect,
  useRef,
} from "react";

interface UseInfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

const useInfiniteScroll = ({
  hasMore,
  loading,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  const observerRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerRef.current;

    if (!target) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            hasMore &&
            !loading
          ) {
            onLoadMore();
          }
        },
        {
          rootMargin: "600px",
        }
      );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return observerRef;
};

export default useInfiniteScroll;