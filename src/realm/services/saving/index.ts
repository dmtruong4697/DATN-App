import { Realm } from "realm";
import { Saving } from "../../models/Saving";

type SavingType = {
    _id: Realm.BSON.ObjectId;
    name: string,
    total: number,
    createAt: string,
    profit: number,
}

export function getAllSaving(realm: Realm) {
    const savings = realm.objects<Saving>('Saving');
    return savings;
};

export function getSavingById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const saving = realm.objectForPrimaryKey<Saving>('Saving', _id);
    return saving;
};

export function addSaving(
    realm: Realm, 
    saving: SavingType
) {
    realm.write(() => {
        realm.create('Saving', saving);
      });
};

export function updateSavingById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    updatedSaving: SavingType,
) {
    const saving = realm.objectForPrimaryKey<Saving>('Saving', _id);

    realm.write(() => {
        saving!.name = updatedSaving.name;
        saving!.total = updatedSaving.total;
        saving!.profit = updatedSaving.profit;
    })
};

export function deleteSavingById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const saving = realm.objectForPrimaryKey<Saving>('Saving', _id);

    realm.write(() => {
        realm.delete(saving);
    })
};