import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewContainer: {
        width: 90,
        alignItems: 'center',
        // justifyContent: 'center',
    },

    btnContainer: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',

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
        height: 60,
        width: 60,
    },

    txtTitle: {
        fontSize: 13,
        fontWeight: '400',
        color: '#666666',
        marginTop: 5,
        textAlign: 'center',
    },
})