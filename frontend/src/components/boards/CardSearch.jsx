import { useState } from "react";
import cardService from "../../services/cardService";

function CardSearch({ onResults, onClear, onQueryChange, loading }) {

    const [query, setQuery] = useState("");

    const [error, setError] = useState("");

    const handleSearch = async (event) => {
        event.preventDefault();

        if(!query.trim()){
            onClear();
            return;
        }

        try{
            setError("");

            const searchQuery = query.trim();

            const data = await cardService.searchCards(searchQuery);

            onQueryChange(searchQuery);

            onResults(data);
        } 
        
        catch (error) {
            console.error("Search failed:", error);

            setError(
                error.response?.data?.message ||
                "Failed to search cards."
            );

        } 
    };

    const handleClear = () => {
        setQuery("");
        setError("");

        onQueryChange("");
        onClear();
    };

    return (
        <div className="card-search">

            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cards..." disabled={loading}/>

                <button type="submit" disabled={loading}>{loading ? "Searching..." : "Search"}</button>

                {query && (
                    <button type="button" onClick={handleClear} disabled={loading}>Clear</button>
                )}
            </form>

            {error && (
                <p className="search-error">{error}</p>
            )}
            
        </div>
    );
}

export default CardSearch;