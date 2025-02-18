const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();

    const isSameDay =
        messageDate.getDate() === today.getDate() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear();

    const isSameWeek =
        today.getTime() - messageDate.getTime() < 7 * 24 * 60 * 60 * 1000 &&
        today.getDay() >= messageDate.getDay();

    const isSameMonth =
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear();

    const isSameYear = messageDate.getFullYear() === today.getFullYear();

    if (isSameDay) {
        return messageDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    } else if (isSameWeek) {
        return messageDate.toLocaleDateString([], {
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    } else if (isSameMonth) {
        return messageDate.toLocaleDateString([], {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    } else if (isSameYear) {
        return messageDate.toLocaleDateString([], {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    } else {
        return messageDate.toLocaleDateString([], {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0'); // 24-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return ` ${hours}:${minutes} ${day}-${month}-${year}`;
};

export { formatDate, formatMessageTime };
