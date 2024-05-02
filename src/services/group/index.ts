import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../constants/api";
import { UserStore } from "../../mobx/auth";

export async function createGroup(
    navigation: NavigationProp<any, any>,
    name: string,
    currencyUnit: string,
) {
    try {
      const responce = await axios.post(API + '/create-group',
        {
          name: name,
          currencyUnit: currencyUnit,
          createAt: new Date().toISOString(),
        },
        {
          headers: {
              Authorization: UserStore.user.token,
          }
        }
      )
      if (responce.status == 201) {
        navigation.navigate('GroupDetail', {_id: responce.data.group._id})
        return responce.data.group;
      }
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
  groupId: string,
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
  const result = responce.data.users;
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
  const result = responce.data.transactions;
  // console.log(responce.status)
    return result;
  } catch (error) {
    console.log(error);
      throw error;
  }
}

export async function joinGroup(inviteCode: string): Promise<any> {
  try {
    const responce = await axios.post(API + '/group-transactions',
      {
        inviteCode: inviteCode,
      },
      {
          headers: {
              Authorization: UserStore.user.token,
          }
      }
    );
  const result = responce.data.message;
  // console.log(result)
    return result;
  } catch (error) {
    console.log(error);
      throw error;
  }
}