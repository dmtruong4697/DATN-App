export function generateDay(numOfDays: number) {
    const today = new Date();
    const dataArray = [];

    for (let i = 0; i < numOfDays; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const id = (i + 1).toString(); 
        dataArray.push({
            id: id,
            startTime: date.toISOString().slice(0, 10), 
            finishTime: date.toISOString().slice(0, 10),
            name: date.toISOString().slice(0, 10).toString(),
        });
    }

    return dataArray;
}

export function generateWeek(numOfWeeks: number) {
    const dataArray = [];

    function getStartOfWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7; 
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2 - dayOfWeek);
    }

    function getEndOfWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7; 
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8 - dayOfWeek);
    }

    for (let i = 0; i < numOfWeeks; i++) {
        const startTime = new Date(getStartOfWeek());
        startTime.setDate(startTime.getDate() - 7 * i); 
        const finishTime = new Date(getEndOfWeek());
        finishTime.setDate(finishTime.getDate() - 7 * i); 
        const id = (i + 1).toString(); 
        dataArray.push({
            id: id,
            startTime: startTime.toISOString().slice(0, 10), 
            finishTime: finishTime.toISOString().slice(0, 10),
            name: startTime.toISOString().slice(0, 10).toString() + ' ~ ' + finishTime.toISOString().slice(0, 10).toString(),
        });
    }

    return dataArray;
}

export function generateMonth(monthCount: number) {
    const currentDate = new Date(); 
    const result = [];

    for (let i = 0; i < monthCount; i++) {
        const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 2); 
        const finishTime = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1);
        const id = (i + 1).toString(); 

        result.push({
            id: id,
            startTime: startTime.toISOString().slice(0, 10),
            finishTime: finishTime.toISOString().slice(0, 10),
            name: Number(startTime.getMonth() + 1).toString() + ' - ' + startTime.getFullYear().toString(),
        });
    }

    return result;
}

export function generateCustomTime(startTime: string, finishTime: string,) {
    const result = [];

    result.push({
        id: '1',
        startTime: startTime,
        finishTime: finishTime,
        name: startTime + ' ~ ' + finishTime,
    });

    return result;
}

export function getWeekStart(date: Date) {
    const dayOfWeek = date.getDay() || 7; 
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2 - dayOfWeek);
}

export function getWeekEnd(date: Date) {
    const dayOfWeek = date.getDay() || 7; 
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 8 - dayOfWeek);
}

export function getMonthStart(date: Date) {
    const startTime = new Date(date.getFullYear(), date.getMonth(), 2);
    return startTime;
}

export function getMonthEnd(date: Date) {
    const finishTime = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return finishTime;
}

