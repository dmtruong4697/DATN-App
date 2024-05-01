import { StyleSheet } from "react-native";

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
        fontWeight: '500',
        color: '#111111',
        flex: 1,
        marginHorizontal: 10,
    },

    txtQuantity: {
        fontSize: 14,
        fontWeight: '400',
        color: '#707070',
    },
})