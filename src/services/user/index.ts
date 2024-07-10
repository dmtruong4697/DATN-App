import axios from "axios";
import { API } from "../../constants/api";
import { UserStore } from "../../mobx/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUserInfo(
    userId: String,
  ): Promise<any> {
    try {
      const responce = await axios.post(API + '/user-detail',
        {
            userId: userId,
        }
      );
    const result = responce.data.user;
    // console.log(result)
      return result;
    } catch (error) {
      console.log(error);
        throw error;
    }
  }

export async function updateProfile(
  // isUpdateAvatar: boolean,
  // form: FormData,
  userName: string,
  phoneNumber: string,
) {
  try {
      const token = await AsyncStorage.getItem('token');
      const responce = await axios.post(API + '/update-profile', {
        userName: userName,
        phoneNumber: phoneNumber,
      },
      {
        headers: {
          Authorization: token,
        }
      });

      if (responce.status == 200) {
        const message = 'Update Successfully';
        UserStore.setName(userName);
        UserStore.setPhoneNumber(phoneNumber);
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

export async function updateAvatar(
  // isUpdateAvatar: boolean,
  file: FormData,
) {
  try {
      const token = await AsyncStorage.getItem('token');
      const responce = await axios.post(API + '/update-avatar', 
        file
      ,
      {
        headers: {
          Authorization: token,
          "Accept": "multipart/form-data",
          "Content-Type": "multipart/form-data",
        }
      });

      if (responce.status == 200) {
        const message = 'Update avatar Successfully';
        UserStore.setAvatar(responce.data.url)
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
