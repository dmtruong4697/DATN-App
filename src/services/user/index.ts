import axios from "axios";
import { API } from "../../constants/api";
import { UserStore } from "../../mobx/auth";

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