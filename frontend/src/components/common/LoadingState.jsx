function LoadingState({ message = "Loading..." }) {
    return (
        <div className="ui-state ui-loading-state">

            <div className="ui-spinner"></div>
            
            <p>{message}</p>

        </div>
    );
}

export default LoadingState;