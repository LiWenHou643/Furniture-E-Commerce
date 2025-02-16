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

export { formatMessageTime };
