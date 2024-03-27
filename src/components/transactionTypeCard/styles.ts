import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        // borderStyle: 'dashed',
        borderColor: '#DDDDDD',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    txtName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000',
    },

    imgIcon: {
        height: 24,
        width: 24,
        // resizeMode: 'contain',
        marginRight: 5,
    },
})