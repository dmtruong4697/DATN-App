import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        alignItems: 'center',
    },

    viewIcon: {
        width: 50,
        height: 50,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        marginRight: 10,
    },

    viewContent: {
        flexDirection: 'column',
        flex: 1,
    },

    txtName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 4,
    },

    txtOwner: {
        fontSize: 14,
        fontWeight: '400',
    },

    txtProfit: {
        fontSize: 32,
        fontWeight: '400',
        color: colors.PrimaryColor,
    }

})