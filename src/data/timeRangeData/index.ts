import { ExportDataStore } from "../../mobx/exportData"

export const TimeRangeData = [
    {
        id: '1',
        type: 'alltime',
        name: 'All time',
        onPress: () => {
            ExportDataStore.setAllTime();
        }
    },

    {
        id: '2',
        type: 'thisweek',
        name: 'This week',
        onPress: () => {
            ExportDataStore.setThisWeek();
        }
    },
    {
        id: '3',
        type: 'thismonth',
        name: 'This month',
        onPress: () => {
            ExportDataStore.setThisMonth();
        }
    },
    {
        id: '4',
        type: 'thisyear',
        name: 'This year',
        onPress: () => {
            ExportDataStore.setThisYear();
        }
    },
]