const ErrorBanner = ({ error }) => {
  return (
    <>
      {error ? (
        <div>
          <p>{error.errorType}</p>
          <p>{error.errorMessage}</p>
        </div>
      ) : null}
    </>
  );
};

export { ErrorBanner };
