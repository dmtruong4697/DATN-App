import { useCallback } from "react";
import { RealmContext } from "../../models";
import { TransactionType } from "../../models/TransactionType";
import { BSON } from "realm";

export function transactionManager() {
    const {useRealm, useQuery, useObject} = RealmContext
    const realm = useRealm();
    const transactionTypes = useQuery(TransactionType);

    const addTransactionType = useCallback((
        name: string,
        income: boolean,
        iconUrl: string,
    ) => {
        realm.write(() => {
            realm.create(
                'TransactionType',
                {
                    _id: new BSON.ObjectId(),
                    name: name,
                    income: income,
                    iconUrl: iconUrl,
                }
            )
        })
    }, [realm]);
}