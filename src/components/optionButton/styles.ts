import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewAddButton: {
        // flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        // borderBottomWidth: 1,
        borderColor: '#d4d4d4'
        // backgroundColor: 'pink'
    },

    btnAddButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    txtAddButton: {
        fontSize: 16,
        fontWeight: '500',
        color: '#268eff',
    }
})