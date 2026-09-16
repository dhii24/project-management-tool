function ErrorState({
    title = "Something went wrong",
    message = "We couldn't load this data.",
    onRetry
}) {
    return (
        <div className="ui-state ui-error-state">
            <div className="ui-state-icon">!</div>

            <h2>{title}</h2>

            <p>{message}</p>

            {onRetry && (
                <button
                    type="button"
                    className="ui-retry-button"
                    onClick={onRetry}
                >
                    Try Again
                </button>
            )}
        </div>
    );
}

export default ErrorState;