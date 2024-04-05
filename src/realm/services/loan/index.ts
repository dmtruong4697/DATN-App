import { ContextType, useCallback } from "react";
import { Transaction } from "../../models/Transaction";
import { BSON, OpenRealmBehaviorType } from "realm";
import { Realm } from "realm";
import { Wallet } from "../../models/Wallet";
import { TransactionStore } from "../../../mobx/transaction";
import { createRealmContext } from "@realm/react";
import { Budget } from "../../models/Budget";
import { RealmContext } from "../../models";
import { Loan } from "../../models/Loan";

type LoanType = {
    _id: Realm.BSON.ObjectId;
    name: string,
    total: number,
    isLoan: boolean,
    createAt: string,
    walletId: Realm.BSON.ObjectID,
    people:string,
    interest:number,
    cycle: string,
    note: string,
    imageUrl: string,
}

export function getAllLoan(realm: Realm) {
    const loans = realm.objects<Loan>('Loan');
    return loans;
};

export function addLoan(
    realm: Realm, 
    loan: LoanType
) {
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', loan.walletId);

    // update wallet balance
    realm.write(() => {
        if(loan.isLoan == true) {
            wallet!.balance = wallet!.balance + loan.total;
        } else {
            wallet!.balance = wallet!.balance - loan.total;
        }
    })

    // create loan
    realm.write(() => {
      realm.create('Loan', loan);
    });
};