interface InfiniteLoaderProps {
  loaderRef: React.RefObject<HTMLDivElement | null>;
  loading: boolean;
  hasMore?: boolean;
}

const InfiniteLoader = ({
  loaderRef,
  loading,
  hasMore = true,
}: InfiniteLoaderProps) => {
  return (
    <div ref={loaderRef} className="infinite-loader" aria-live="polite">
      {loading ? (
        <div className="spinner" role="status" aria-label="Loading more items" />
      ) : !hasMore ? (
        <p className="end-message">You've reached the end</p>
      ) : null}
    </div>
  );
};

export default InfiniteLoader;
