import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../constants/api";
import { UserStore } from "../../mobx/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function createGroupTransaction(
    navigation: NavigationProp<any, any>,
    userId: string,
    groupId: string,
    name: string,
    total: number,
    createAt: string,
    createTime: string,
    note: string,
    imageUrls: string,
) {
    try {
      const token = await AsyncStorage.getItem('token');
      const responce = await axios.post(API + '/create-transaction',
        {
            userId: userId,
            groupId: groupId,
            name: name,
            total: total,
            createAt: createAt,
            createTime: createTime,
            note: note,
            imageUrls: imageUrls,
        },
        {
          headers: {
              Authorization: token,
          }
        }
      )
      if (responce.status == 201) {
        navigation.navigate('GroupDetail', {_id: groupId})
        return responce.data;
      }
    } catch (error) {
      console.log(error);
        throw error;
    }
}

export async function getGroupTransaction(transactionId: string): Promise<any> {
  try {
    const token = await AsyncStorage.getItem('token');
    const responce = await axios.post(API + '/get-transaction',
      {
        transactionId: transactionId,
      },
      {
          headers: {
              Authorization: token,
          }
      }
    );
  const result = responce.data.transaction;
  // console.log(responce.status)
    return result;
  } catch (error) {
    console.log(error);
      throw error;
  }
}

export async function deleteTransaction(
  navigation: NavigationProp<any, any>,
  transactionId: string,
  groupId: string,
): Promise<any> {
  try {
    const token = await AsyncStorage.getItem('token');
    const responce = await axios.post(API + '/delete-transaction',
      {
        transactionId: transactionId,
        groupId: groupId,
      },
      {
          headers: {
              Authorization: token,
          }
      }
    );

    if (responce.status == 200) {
      navigation.goBack();
      return responce.data.message;
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error message:", error.message);
      if (error.response) {
        console.error("Error details:", error.response.data);
        return error.response.data.message;
      }    
    } else {
        console.error("Unhandled error:", error);
        return error;
      }
  }
}