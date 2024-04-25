import { createRealmContext } from "@realm/react";
import { Transaction } from "./Transaction";
import { TransactionType } from "./TransactionType";
import { Wallet } from "./Wallet";
import { Budget } from "./Budget";
import { Saving } from "./Saving";
import { Loan } from "./Loan";
import { ShoppingList } from "./ShoppingList";
import { ShoppingListItem } from "./ShoppingListItem";

export const RealmContext = createRealmContext({
    schema: [
        Transaction,
        TransactionType,
        Wallet,
        Budget,
        Saving,
        Loan,
        ShoppingList,
        ShoppingListItem,
    ],
})