import RNFS from 'react-native-fs';
import { getAllLoan } from '../../realm/services/loan';
import { Realm } from "realm";
import { getAllTransaction } from '../../realm/services/transactions';
import { getAllTransactionType } from '../../realm/services/transactionType';
import { getAllWallet } from '../../realm/services/wallets';

export const makeDataFile = async (realm: Realm) => {
    try {
        const loans = getAllLoan(realm);
        const transactions = getAllTransaction(realm);
        const transactionTypes = getAllTransactionType(realm);
        const wallets = getAllWallet(realm);

      const loanPath = RNFS.DocumentDirectoryPath + '/loan.json';
      const transactionPath = RNFS.DocumentDirectoryPath + '/transaction.json';
      const typePath = RNFS.DocumentDirectoryPath + '/type.json';
      const walletPath = RNFS.DocumentDirectoryPath + '/wallet.json';

      await RNFS.writeFile(loanPath, JSON.stringify(loans), "utf8");
      await RNFS.writeFile(transactionPath, JSON.stringify(transactions), "utf8");
      await RNFS.writeFile(typePath, JSON.stringify(transactionTypes), "utf8");
      await RNFS.writeFile(walletPath, JSON.stringify(wallets), "utf8");

      console.log("written to file");
      console.log(RNFS.DocumentDirectoryPath);
    } catch (error) { //if the function throws an error, log it out.
      console.log(error);
    }
  };