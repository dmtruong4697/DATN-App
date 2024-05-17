import { NavigationProp } from "@react-navigation/native";
import { User, UserStore } from "../../mobx/auth";
import axios from "axios";
import { API } from "../../constants/api";

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
            deviceToken: deviceToken,
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
) {
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
            UserStore.logoutUser();
            console.log(responce.data);
            navigation.navigate('SignIn');
        } else {
            console.log(responce.status);
        }
    } catch (error) {
      console.log(error);
        throw error;
    }
}