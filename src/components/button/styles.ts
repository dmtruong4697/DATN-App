import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewAddButton: {
        // flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        // backgroundColor: 'pink'
    },

    btnAddButton: {
        width: '100%',
        height: 64.48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: colors.PrimaryColor,
    },

    txtAddButton: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    }
})