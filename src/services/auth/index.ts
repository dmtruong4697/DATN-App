import { NavigationProp } from "@react-navigation/native";
import { User, UserStore } from "../../mobx/auth";
import axios from "axios";
import { API } from "../../constants/api";
import { uploadData } from "../sync";
import { Realm } from "realm";
import { deleteAllBudget } from "../../realm/services/budgets";
import { deleteAllLoan } from "../../realm/services/loan";
import { deleteAllSaving } from "../../realm/services/saving";
import { deleteAllShoppingList, deleteAllShoppingListItem } from "../../realm/services/shoppingList";
import { deleteAllTransaction } from "../../realm/services/transactions";
import { deleteAllTransactionType } from "../../realm/services/transactionType";
import { deleteAllWallet } from "../../realm/services/wallets";

export async function login(
    navigation: NavigationProp<any, any>,
    email: string,
    password: string,
    deviceToken: string,
) {
    try {
        UserStore.setIsLoading(true);
        const responce = await axios.post(API + '/login', {
            email: email,
            password: password,
            deviceToken: UserStore.deviceToken,
        });

        if (responce.status == 200) {
            const user: User = {
                id: responce.data.id,
                userName: responce.data.userName,
                email: responce.data.email,
                avatarImage: responce.data.avatarImage,
                token: responce.data.token,
                deviceToken: deviceToken,
                phoneNumber: responce.data.phoneNumber,
                dataId: responce.data.dataId,
            }

            const message = 'Login success';

            UserStore.setCurrentUser(user);
            console.log(responce.data);
            UserStore.setIsLoading(false);
            navigation.navigate('Home');
            return message;
        } else {
            console.log(responce.status);
            UserStore.setIsLoading(false);
            const message = responce.data.message;
            return message;
        }
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            console.error("Error message:", error.message);
            if (error.response) {
              console.error("Error details:", error.response.data);
              message = error.response.data.message;
            }    
          } else {
              console.error("Unhandled error:", error);
              message = 'Unhandled error';
            }

        UserStore.setIsLoading(false);
        return message;
    }
}

export async function logout(
    navigation: NavigationProp<any, any>,
    userId: object | null,
    deviceToken: string,
    realm: Realm,
) {

    await uploadData(realm);
    try {
        // UserStore.setIsLoading(true);
        const responce = await axios.post(API + '/logout', 
        {
            userId: userId,
            deviceToken: deviceToken,
        },
        {
            headers: {
                Authorization: UserStore.user.token,
            }
        });

        if (responce.status == 200) {
            const message = 'Logout Successfully'

            deleteAllBudget(realm);
            deleteAllLoan(realm);
            deleteAllSaving(realm);
            deleteAllShoppingList(realm);
            deleteAllShoppingListItem(realm);
            deleteAllTransaction(realm);
            deleteAllTransactionType(realm);
            deleteAllWallet(realm);

            UserStore.logoutUser();
            console.log(responce.data);
            navigation.navigate('SignIn');
            return message;
        } else {
            console.log(responce.status);
            UserStore.setIsLoading(false);
            const message = responce.data.message;
            return message;
        }
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            console.error("Error message:", error.message);
            if (error.response) {
              console.error("Error details:", error.response.data);
              message = error.response.data.message;
            }    
          } else {
              console.error("Unhandled error:", error);
              message = 'Unhandled error';
            }

        UserStore.setIsLoading(false);
        return message;
    }
}

export async function signUp(
    navigation: NavigationProp<any, any>,
    userName: string,
    email: string,
    password: string,
    phoneNumber: string,
) {
    try {
        UserStore.setIsLoading(true);
        const responce = await axios.post(API + '/signup', {
            email: email,
            password: password,
            userName: userName,
            phoneNumber: phoneNumber,
        });

        if (responce.status == 201) {

            const message = 'Sign up success';

            console.log(responce.data);
            navigation.navigate('ValidateEmail', {email: email});
            return message;
        } else {
            console.log(responce.status);
            UserStore.setIsLoading(false);
            const message = responce.data.message;
            return message;
        }
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            console.error("Error message:", error.message);
            if (error.response) {
              console.error("Error details:", error.response.data);
              message = error.response.data.message;
            }    
          } else {
              console.error("Unhandled error:", error);
              message = 'Unhandled error';
            }

        UserStore.setIsLoading(false);
        return message;
    }
}

export async function validateEmail(
    navigation: NavigationProp<any, any>,
    email: string,
    validateCode: string,
) {
    try {
        // UserStore.setIsLoading(true);
        const responce = await axios.post(API + '/validate-email', {
            email: email,
            validateCode: validateCode,
        });

        if (responce.status == 200) {

            const message = 'Validated Successfully';

            console.log(responce.data);
            navigation.navigate('SignIn');
            return message;
        } else {
            console.log(responce.status);
            // UserStore.setIsLoading(false);
            const message = responce.data.message;
            return message;
        }
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            console.error("Error message:", error.message);
            if (error.response) {
              console.error("Error details:", error.response.data);
              message = error.response.data.message;
            }    
          } else {
              console.error("Unhandled error:", error);
              message = 'Unhandled error';
            }

        UserStore.setIsLoading(false);
        return message;
    }
}