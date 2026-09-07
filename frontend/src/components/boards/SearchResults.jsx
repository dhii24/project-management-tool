function SearchResults({ results, onCardClick }) {
    if (!results) {
        return null;
    }

    const cards = results.cards || [];

    const pagination = results.pagination || {
        totalCards: cards.length
    };

    if (cards.length === 0) {
        return (
            <div className="search-results-empty">
                <p>No cards found.</p>
            </div>
        );
    }

    return (
        <div className="search-results">

            <div className="search-results-header">
                <h3>Search Results</h3>

                <span>{results.pagination.totalCards} cards found</span>
            </div>

            <div className="search-results-list">
                {results.cards.map((card) => (
                    <div key={card._id} className="search-result-card" onClick={() => onCardClick(card)}>

                        <div className="search-result-content">
                            <h4>{card.title}</h4>

                            {card.description && (
                                <p>{card.description}</p>
                            )}

                            {card.labels?.length > 0 && (
                                <div className="search-result-labels">
                                    {card.labels.map((label) => (
                                        <span key={label} className="search-result-label">{label}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {card.priority && (
                            <span className={`priority priority-${card.priority}`}>{card.priority}</span>
                        )}

                    </div>
                ))}
            </div>

        </div>
    );
}

export default SearchResults;