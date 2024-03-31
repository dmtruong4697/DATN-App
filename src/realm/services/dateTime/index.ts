export function generateWeek(numOfWeeks: number) {
    const dataArray = [];

    // Hàm để tính ngày bắt đầu của tuần hiện tại
    function getStartOfWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7; // Lấy ngày trong tuần (0 - 6), chuyển thành (1 - 7)
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2 - dayOfWeek);
    }

    // Hàm để tính ngày kết thúc của tuần hiện tại
    function getEndOfWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7; // Lấy ngày trong tuần (0 - 6), chuyển thành (1 - 7)
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8 - dayOfWeek);
    }

    // Tạo mảng dữ liệu
    for (let i = 0; i < numOfWeeks; i++) {
        const startTime = new Date(getStartOfWeek());
        startTime.setDate(startTime.getDate() - 7 * i); // Điều chỉnh ngày bắt đầu cho tuần trước
        const finishTime = new Date(getEndOfWeek());
        finishTime.setDate(finishTime.getDate() - 7 * i); // Điều chỉnh ngày kết thúc cho tuần trước
        const id = (i + 1).toString(); // ID bắt đầu từ 1
        dataArray.push({
            id: id,
            startTime: startTime.toISOString().slice(0, 10), // Format ngày YYYY/MM/DD
            finishTime: finishTime.toISOString().slice(0, 10),
            name: startTime.toISOString().slice(0, 10).toString() + ' - ' + finishTime.toISOString().slice(0, 10).toString(),
        });
    }

    return dataArray;
}

export function generateMonth(monthCount: number) {
    const currentDate = new Date(); // Lấy thời gian hiện tại
    const result = [];

    // Lặp qua số lượng tháng cần tạo
    for (let i = 0; i < monthCount; i++) {
        const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 2); // Ngày đầu tiên của tháng
        const finishTime = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1); // Ngày cuối cùng của tháng
        const id = i + 1; // ID của tháng, bắt đầu từ 1

        result.push({
            startTime: startTime.toISOString().slice(0, 10),
            finishTime: finishTime.toISOString().slice(0, 10),
            id: id,
            name: Number(startTime.getMonth() + 1).toString() + ' - ' + startTime.getFullYear().toString(),
        });
    }

    return result;
}
