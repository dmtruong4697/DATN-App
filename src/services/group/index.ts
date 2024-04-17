import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../constants/api";
import { UserStore } from "../../mobx/auth";

export async function createGroup(
    navigation: NavigationProp<any, any>,
    userId: object | null,
    deviceToken: string,
) {
    try {
      
    } catch (error) {
      console.log(error);
        throw error;
    }
}

export async function getGroupList(): Promise<any> {
    try {
      const responce = await axios.post(API + '/group-list',
        {
            
        },
        {
            headers: {
                Authorization: UserStore.user.token,
            }
        }
      );
    const result = responce.data.groupIds;
    // console.log(result)
      return result;
    } catch (error) {
      console.log(error);
        throw error;
    }
}

export async function getGroupDetail(
  groupId: String,
): Promise<any> {
  try {
    const responce = await axios.post(API + '/get-group',
      {
          groupId: groupId,
      },
      {
          headers: {
              Authorization: UserStore.user.token,
          }
      }
    );
  const result = responce.data.group;
  // console.log(result)
    return result;
  } catch (error) {
    console.log(error);
      throw error;
  }
}

export async function getGroupMember(groupId: string): Promise<any> {
  try {
    const responce = await axios.post(API + '/group-member',
      {
        groupId: groupId,
      },
      {
          headers: {
              Authorization: UserStore.user.token,
          }
      }
    );
  const result = responce.data;
  // console.log(result)
    return result;
  } catch (error) {
    console.log(error);
      throw error;
  }
}

export async function getGroupTransactions(groupId: string): Promise<any> {
  try {
    const responce = await axios.post(API + '/group-transactions',
      {
        groupId: groupId,
      },
      {
          headers: {
              Authorization: UserStore.user.token,
          }
      }
    );
  const result = responce.data;
  // console.log(result)
    return result;
  } catch (error) {
    console.log(error);
      throw error;
  }
}