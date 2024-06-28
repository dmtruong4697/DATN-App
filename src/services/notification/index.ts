import { ActiveStore } from "../../mobx/active";
import { RealmContext } from "../../realm/models";
import { getAllBudget } from "../../realm/services/budgets";
import { getExpensesTotalByTime } from "../../realm/services/transactions";

function isSameDay(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

function isOverBudget() {
  const {useRealm} = RealmContext;
  const realm = useRealm();

  const budget = getAllBudget(realm)[0];

  const t = getExpensesTotalByTime(realm, (new Date()).toISOString().slice(0,10), (new Date()).toISOString().slice(0,10), 'VND');
  const f = new Date(budget!.finishTime);
  const s = new Date(budget!.startTime);

  const day = Number(f.getDate()) - Number(s.getDate());

  if((budget.total/day) < t) return true;
  return false;
}

export const generateDailyNotification = () => {
    let notiBody = (isSameDay(ActiveStore.lastTransaction))? 'Cùng nhau xem lại các giao dịch bạn đã thực hiện trong ngày nhé!':'Hôm nay bạn chưa có giao dịch nào, cùng nhau ghi chép nhé!';
    if (isOverBudget()) notiBody = 'Hôm nay bạn đã chi tiêu vượt ngân sách, hãy cùng xem lại thống kê nhé!'

    return notiBody;
}