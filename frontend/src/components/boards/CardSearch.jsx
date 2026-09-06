import { useState } from "react";
import cardService from "../../services/cardService";

function CardSearch({ onResults, onClear }) {

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSearch = async (event) => {
        event.preventDefault();

        if(!query.trim()){
            onClear();
            return;
        }

        try{
            setLoading(true);
            setError("");

            const data = await cardService.searchCards(query.trim());
            onResults(data);
        } 
        
        catch (error) {
            console.error("Search failed:", error);

            setError(
                error.response?.data?.message ||
                "Failed to search cards."
            );

        } 
        
        finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setQuery("");
        setError("");
        onClear();
    };

    return (
        <div className="card-search">

            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cards..."/>

                <button type="submit" disabled={loading}>{loading ? "Searching..." : "Search"}</button>

                {query && (
                    <button type="button" onClick={handleClear}>Clear</button>
                )}
            </form>

            {error && (
                <p className="search-error">{error}</p>
            )}
            
        </div>
    );
}

export default CardSearch;