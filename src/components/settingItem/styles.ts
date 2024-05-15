import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 10,
        flexDirection: 'row',

        // borderTopWidth: 1,
        // borderTopColor: '#d6d6d6',
        borderBottomWidth: 1,
        borderBottomColor: '#d6d6d6',

        alignItems: 'center',
    },

    txtTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#111111',

        flex: 1,
    },

    txtState: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.PrimaryColor,
        marginHorizontal: 10,
    },

    imgRight: {
        height: 24,
        width: 24,
    },
})