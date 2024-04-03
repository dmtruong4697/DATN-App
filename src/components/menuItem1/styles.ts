import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '95%',
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 5,
    },

    imgIcon: {
        height: 20,
        width: 20,
        marginLeft: 5,
    },

    txtTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
        marginHorizontal: 10,
    },

    imgNext: {
        height: 30,
        width: 30,
    }
})