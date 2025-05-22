// Logic tổng hợp ✅ ✅ ✅

// Viết Hoa chữ cái đầu:
export const capitalizeFirstLetter = (value) => {
    if (!value) return '';
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

// Ham giu cho!
export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceholderCard: true,
    };
};