import { useEffect, useState } from "react";
import notificationService from "../../services/notificationService";

function NotificationPanel({ onUnreadCountChange }) {
    const [notifications, setNotifications] = useState([]);

    const [unreadCount, setUnreadCount] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try{
            setLoading(true);
            setError("");

            const [notificationData, unreadCount] = await Promise.all([
                notificationService.getNotifications(),
                notificationService.getUnreadCount()
            ]);

            setNotifications(notificationData.notifications);
            setUnreadCount(unreadCount);
        } 
        
        catch(error){
            setError(
                error.response?.data?.message || "Failed to load notifications"
            );
        } 
        
        finally{
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try{
            await notificationService.markAsRead(notificationId);

            setNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                    notification._id === notificationId ? { ...notification, isRead: true }: notification
                )
            );

            setUnreadCount(prevCount => Math.max(0, prevCount - 1));
            onUnreadCountChange(prevCount => Math.max(0, prevCount - 1));
        } 
        
        catch(error){
            setError(
                error.response?.data?.message || "Failed to mark notification as read"
            );
        }
    };

    if(loading){
        return(
            <div className="notification-panel">
                <h3>Notifications</h3>
                <p>Loading notifications...</p>
            </div>
        );
    }

    return (

        <div className="notification-panel">

            <div className="notification-header">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                    <span className="notification-count">{unreadCount}</span>
                )}
            </div>

            {error && (
                <p className="notification-error">{error}</p>
            )}

            {notifications.length === 0 ? (
                <p className="notification-empty">No notifications</p>
            ) : (
                <div className="notification-list">
                    {notifications.map(notification => (
                        <div key={notification._id} className={`notification-item ${notification.isRead ? "read" : "unread"}`}>

                            <div className="notification-content">
                                <p className="notification-message">{notification.message}</p>

                                {notification.sender && (
                                    <span className="notification-sender">
                                        From: {notification.sender.name}
                                    </span>
                                )}

                                <span className="notification-date">
                                    {new Date(
                                        notification.createdAt
                                    ).toLocaleString(
                                        "en-IN", 
                                        {
                                            dateStyle: "medium",
                                            timeStyle: "short"
                                        }
                                    )}
                                </span>
                            </div>

                            {!notification.isRead && (
                                <button className="notification-read-button" onClick={() => handleMarkAsRead(notification._id)}>Mark as read</button>
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default NotificationPanel;