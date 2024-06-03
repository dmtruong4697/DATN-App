import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../constants/api";
import { UserStore } from "../../mobx/auth";

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
              Authorization: UserStore.user.token,
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