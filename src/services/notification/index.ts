import { ActiveStore } from "../../mobx/active";

function isSameDay(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

export const generateDailyNotification = () => {
    const notiBody = (isSameDay(ActiveStore.lastTransaction))? 'Cùng nhau xem lại các giao dịch bạn đã thực hiện trong ngày nhé!':'Hôm nay bạn chưa có giao dịch nào, cùng nhau ghi chép nhé!';
    
    return notiBody;
}