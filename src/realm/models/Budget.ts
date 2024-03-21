import { createRealmContext } from "@realm/react";
import { ImageSourcePropType } from "react-native";
import { Realm } from "realm";

export class Budget extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    total!: number;
    period!: number;
    repeat!: boolean;
    repeatType!: string;
    walletId!: string;

    static schema = {
        name: 'Budget',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            total: 'int',
            period: 'int',
            repeat: 'bool',
            repeatType: 'string',
            walletId: 'string',
        }
    }
}
