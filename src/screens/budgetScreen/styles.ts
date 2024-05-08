import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },

    viewEmpty: {
        width: '100%',
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
    },

    imgEmpty: {
        width: 300,
        height: 300,
        marginBottom: 0,
    },

    txtEmptyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111111',
        marginBottom: 10,
        textAlign: 'center',
    },

    txtEmptyDescription: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
        marginBottom: 10,
        textAlign: 'center',
    },

    btnAdd: {
        padding: 10,
    },

    txtAdd: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.PrimaryColor,
    },
})