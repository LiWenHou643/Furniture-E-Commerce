const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object

    const formattedDate = date.toLocaleString('en-US', {
        month: '2-digit', // "01"
        day: '2-digit', // "10"
        year: 'numeric', // "2025"
        hour: '2-digit', // "07"
        minute: '2-digit', // "13"
        hour12: true, // "PM"
    });

    return formattedDate;
};

export { formatDate };
