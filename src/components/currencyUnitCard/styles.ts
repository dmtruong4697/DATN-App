import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    txtName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666666',
    },

    txtCode: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.PrimaryColor,
        marginRight: 10,
    },
})