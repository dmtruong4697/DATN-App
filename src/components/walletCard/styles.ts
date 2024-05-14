import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        // height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,

        backgroundColor: '#FFFFFF',
    },

    txtCode: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.PrimaryColor,
        marginRight: 10,
    },

    viewDetail: {
        flex: 1,
        flexDirection: 'column',
    },

    txtName: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    txtBalance: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000000',
    }

})