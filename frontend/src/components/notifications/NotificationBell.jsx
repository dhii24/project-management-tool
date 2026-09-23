import { useEffect, useRef, useState } from "react";
import notificationService from "../../services/notificationService";
import NotificationPanel from "./NotificationPanel";

function NotificationBell() {

    const [unreadCount, setUnreadCount] = useState(0);
    console.log("BELL RENDER COUNT:", unreadCount);
    const [showPanel, setShowPanel] = useState(false);

    const notificationRef = useRef(null);

    useEffect(() => {
        loadUnreadCount();
    }, []);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if(
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ){
                setShowPanel(false);
            }

        };

        if(showPanel){
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [showPanel]);

    const loadUnreadCount = async () => {
        try{
            const count = await notificationService.getUnreadCount();
            console.log("BELL API COUNT:", count);
            setUnreadCount(count);
        }

        catch(error){
            console.error("Failed to load unread notification count:", error);
        }
    };

    const handleTogglePanel = () => {
        setShowPanel(previousState => !previousState);
    };

    const handleUnreadCountChange = (count) => {
        console.log("BELL UPDATED FROM PANEL:", count);
        setUnreadCount(count);
    };

    return (
        <div
            ref={notificationRef}
            className="notification-wrapper"
        >

            <button
                className="notification-bell"
                onClick={handleTogglePanel}
            >
                🔔

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {showPanel && (
                <div className="notification-dropdown">
                    <NotificationPanel
                        onUnreadCountChange={handleUnreadCountChange}
                    />
                </div>
            )}

        </div>
    );
}

export default NotificationBell;