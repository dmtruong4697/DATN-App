import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',

        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
    },

    txtTitle: {
        fontWeight: '500',
        fontSize: 16,
        color: '#111111',

        flex: 1,
    },

    viewTotal: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',

        gap: 5,
    },

    txtIncome: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.PrimaryColor,
    },

    txtExpense: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.ErrorColor,
    },

    txtTotal: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111111',

        borderTopColor: '#DDDDDD',
        borderTopWidth: 1,
    },

})