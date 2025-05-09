import { useEffect, useState } from "react";

interface NotificationProps {
    message: string;
    type: "success" | "error"
    duration?: number;
    onClose?: () => void;
}

const Notification = ({ message, type, duration = 3000, onClose }: NotificationProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            onClose?.(); // remove the notification from parent
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!visible) return null;

    return (
        <div className={`notification-container notification-${type}`}>
            {message}
        </div>
    );
};

export default Notification;
