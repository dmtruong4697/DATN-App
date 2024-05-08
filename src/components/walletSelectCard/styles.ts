import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    viewCheck: {
        width: 20,
        height: 20,
        borderRadius: 3,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },

    imgCheck: {
        width: 18,
        height: 18,
    },

    txtName: {
        fontSize: 15,
        fontWeight: '400',
        color: '#111111',
    },

    txtBalance: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.PrimaryColor,
    },

    viewContent: {
        flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
        marginHorizontal: 15,
    },


})