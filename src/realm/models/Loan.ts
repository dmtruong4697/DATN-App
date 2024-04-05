import { createRealmContext } from "@realm/react";
import { Realm } from "realm";

export class Loan extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    total!: number;
    isLoan!: boolean;
    createAt!: string;
    walletId!: Realm.BSON.ObjectID;
    people!:string;
    interest!:number;
    cycle!: string;
    note!: string;
    imageUrl!: string;

    static schema = {
        name: 'Loan',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            total: 'int',
            isLoan: 'bool',
            createAt: 'string',
            walletId: 'objectId',
            people:'string',
            interest:'float',
            cycle: 'string',
            note: 'string',
            imageUrl: 'string',
        }
    }
}
