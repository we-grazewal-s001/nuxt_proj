export function formatTimestamp(timestamp: number): string {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const time = new Date(timestamp);


    const day = time.getDate();
    const monthIndex = time.getMonth();
    const year = time.getFullYear();

    const hours = time.getHours();
    const minutes = time.getMinutes();

    const monthAbbreviation = months[monthIndex];

    const formattedTime = `${day} ${monthAbbreviation} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return formattedTime;
}
