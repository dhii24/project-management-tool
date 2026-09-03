import { useEffect, useState } from "react";
import activityService from "../../services/activityService";

function ActivityHistory({ cardId }) {

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchActivities = async () => {

            try{
                setLoading(true);
                setError("");

                const data = await activityService.getActivities(cardId);
                setActivities(data);
            }
            
            catch(error){
                console.error("Failed to fetch activities:", error);

                setError(
                    error.response?.data?.message || "Failed to load activity history."
                );
            }
            
            finally {
                setLoading(false);
            }
        };


        if(cardId){
            fetchActivities();
        }
    }, [cardId]);


    const formatDate = (date) => {
        return new Date(date).toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );
    };

    return (
        <div className="activity-section">
            <div className="activity-header">
                <h3>Activity History</h3>
                <span>{activities.length}</span>
            </div>

            {loading && (
                <p className="activity-status">Loading activity...</p>
            )}

            {!loading && activities.length === 0 && (
                <p className="activity-status">No activity yet.</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            {!loading && activities.length > 0 && (
                <div className="activity-list">
                    {activities.map((activity) => (
                            <div key={activity._id} className="activity-item">
                                <div className="activity-icon">•</div>
                                <div className="activity-content">
                                    <p>{activity.description}</p>
                                    <span>{formatDate(activity.createdAt)}</span>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default ActivityHistory;