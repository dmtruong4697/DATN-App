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
            wallet!.balance = wallet!.balance - loan.total;
        } else {
            wallet!.balance = wallet!.balance + loan.total;
        }
    })

    realm.write(() => {
      realm.create('Loan', loan);
    });
};

export function getLoanById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const loan = realm.objectForPrimaryKey<Loan>('Loan', _id);
    return loan;
};

export function updateLoanById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    updatedLoan: LoanType,
) {
    const loan = realm.objectForPrimaryKey<Loan>('Loan', _id);
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', loan!.walletId);

    // return money to wallet
    let balance = wallet?.balance;
    if(loan!.isLoan == true) {
        balance = balance! + loan!.total;
    } else {
        balance = balance! - loan!.total;
    }

    // update wallet balance
    if(updatedLoan.isLoan == true) {
        balance = balance! - updatedLoan.total;
    } else {
        balance = balance! + updatedLoan.total;
    }

    realm.write(() => {
        wallet!.balance = balance!;
    })

    realm.write(() => {
        loan!.isLoan = updatedLoan.isLoan;
        loan!.people = updatedLoan.people;
        loan!.total = updatedLoan.total;
        loan!.createAt = updatedLoan.createAt;
        loan!.note = updatedLoan.note;
        loan!.interest = updatedLoan.interest;
        loan!.cycle = updatedLoan.cycle;
    })
};

export function deleteLoanById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const loan = realm.objectForPrimaryKey<Loan>('Loan', _id);
    const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', loan!.walletId);

    //return money to wallet
    let balance = wallet?.balance;
    if(loan!.isLoan == true) {
        balance = balance! - loan!.total;
    } else {
        balance = balance! + loan!.total;
    }
    realm.write(() => {
        wallet!.balance = balance!;
    })

    realm.write(() => {
        realm.delete(loan);
    })
};
export function getListLoanByType(
    realm: Realm,
    isLoan: boolean,
) {
    const loans = realm.objects<Loan>('Loan');
    return loans.filtered('isLoan = $0', isLoan);
};
