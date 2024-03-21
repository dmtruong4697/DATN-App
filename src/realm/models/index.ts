import { createRealmContext } from "@realm/react";
import { Transaction } from "./Transaction";
import { TransactionType } from "./TransactionType";
import { Wallet } from "./Wallet";
import { Budget } from "./Budget";

export const RealmContext = createRealmContext({
    schema: [
        Transaction,
        TransactionType,
        Wallet,
        Budget,
    ],
})