const formatDate = (dateString) => {
    if (!dateString) {
        return '';
    } // Return empty string if no date provided
    const date = new Date(dateString); // Convert string to Date object

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0'); // 24-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return ` ${hours}:${minutes} ${day}-${month}-${year}`;
};

export { formatDate };
