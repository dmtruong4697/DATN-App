import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#d4d4d4',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    imgAvatar: {
        width: 28,
        height: 28,
        backgroundColor: 'gray',
        borderRadius: 1000,
    },

    viewName: {
        flex: 1,
        marginHorizontal: 10,
        // alignItems: 'center',
    },

    txtName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111111',
    },

    viewMoney: {
        flexDirection: 'column',
    },

    txtTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
    },

    txtMoney: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})