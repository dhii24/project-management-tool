function EmptyState({
    title = "Nothing here yet",
    message = "There is no data to display.",
    compact = false
}) {
    return (
        <div
            className={`ui-state ui-empty-state ${
                compact ? "ui-empty-state-compact" : ""
            }`}
        >
            <div className="ui-state-icon">—</div>

            <h2>{title}</h2>

            <p>{message}</p>
        </div>
    );
}

export default EmptyState;