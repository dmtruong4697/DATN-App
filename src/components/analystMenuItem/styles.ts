import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewContainer: {
        width: 150,
        height: 150,

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

        borderRadius: 10,

        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    imgIcon: {
        height: 35,
        width: 35,
        marginBottom: 15,
    },

    txtTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#444444',
    },
})