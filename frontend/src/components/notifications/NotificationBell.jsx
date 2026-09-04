import { useEffect, useState } from "react";
import notificationService from "../../services/notificationService";
import NotificationPanel from "./NotificationPanel";

function NotificationBell() {

    const [unreadCount, setUnreadCount] = useState(0);
    const [showPanel, setShowPanel] = useState(false);

    useEffect(() => {
        loadUnreadCount();
    }, []);

    const loadUnreadCount = async () => {
        try{
            const count = await notificationService.getUnreadCount();
            setUnreadCount(count);
        } 
        
        catch(error){
            console.error("Failed to load unread notification count:", error);
        }
    };

    const handleTogglePanel = () => {
        setShowPanel(prev => !prev);
    };

    return (
        <div className="notification-wrapper">
            <button className="notification-bell" onClick={handleTogglePanel}>
                🔔

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {showPanel && (
                <div className="notification-dropdown">
                    <NotificationPanel onUnreadCountChange={setUnreadCount}/>
                </div>
            )}
        </div>
    );
}

export default NotificationBell;