export const formatDateAndTime = (isoString: string) => {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString("ka-GE");
    const formattedTime = date.toLocaleTimeString("ka-GE", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return { formattedDate, formattedTime };
};