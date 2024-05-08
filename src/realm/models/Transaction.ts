import { createRealmContext } from "@realm/react";
import { Realm } from "realm";

export class Transaction extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    income!: boolean;
    total!: number;
    createAt!: string;
    createTime!: string;
    transactionTypeId!: Realm.BSON.ObjectID;
    walletId!: Realm.BSON.ObjectID;
    note!: string;
    imageUrl!: string;

    static schema = {
        name: 'Transaction',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            income: 'bool',
            total: 'int',
            createAt: 'string',
            createTime: 'string',
            transactionTypeId: 'objectId',
            walletId: 'objectId',
            note: 'string',
            imageUrl: 'string',
        }
    }
}

// export const RealmContext = createRealmContext({
//     schema: [Transaction],
// })