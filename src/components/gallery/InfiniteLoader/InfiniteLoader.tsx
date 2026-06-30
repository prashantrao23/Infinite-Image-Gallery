interface InfiniteLoaderProps {
  loaderRef: React.RefObject<HTMLDivElement | null>;
  loading: boolean;
}

const InfiniteLoader = ({
  loaderRef,
  loading,
}: InfiniteLoaderProps) => {
  return (
    <div
      ref={loaderRef}
      className="infinite-loader"
    >
      {loading && (
        <div className="spinner" />
      )}
    </div>
  );
};

export default InfiniteLoader;