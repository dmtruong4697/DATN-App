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
                token: responce.data.token,
                deviceToken: deviceToken,
            }

            UserStore.setCurrentUser(user);
            console.log(responce.data);
            UserStore.setIsLoading(false);
            navigation.navigate('Home');
        } else {
            console.log(responce.status);
        }
    } catch (error) {
      console.log(error);
      UserStore.setIsLoading(false);
        throw error;
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