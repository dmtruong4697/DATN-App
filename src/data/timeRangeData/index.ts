import { useTranslation } from "react-i18next";
import { ExportDataStore } from "../../mobx/exportData"

const {t} = useTranslation();

export const TimeRangeData = [
    {
        id: '1',
        type: 'alltime',
        name: t('trd-all time'),
        onPress: () => {
            ExportDataStore.setAllTime();
        }
    },

    {
        id: '2',
        type: 'thisweek',
        name: t('trd-this week'),
        onPress: () => {
            ExportDataStore.setThisWeek();
        }
    },
    {
        id: '3',
        type: 'thismonth',
        name: t('trd-this month'),
        onPress: () => {
            ExportDataStore.setThisMonth();
        }
    },
    {
        id: '4',
        type: 'thisyear',
        name: t('trd-this year'),
        onPress: () => {
            ExportDataStore.setThisYear();
        }
    },
]