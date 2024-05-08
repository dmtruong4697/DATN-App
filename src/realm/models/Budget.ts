import { createRealmContext } from "@realm/react";
import { ImageSourcePropType } from "react-native";
import { Realm } from "realm";

export class Budget extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    total!: number;
    period!: number;
    repeatType!: string;
    startTime!: string;
    finishTime!: string;
    walletIds!: Realm.BSON.ObjectId[];
    unitCurrency!: string;
    status!: string;

    static schema = {
        name: 'Budget',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            name: 'string',
            total: 'int',
            period: 'int',
            repeatType: 'string',
            startTime: 'string',
            finishTime: 'string',
            walletIds: {type: 'list', objectType: 'objectId'},
            unitCurrency: 'string',
            status: 'string',
        }
    }
}
