import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        // backgroundColor: '#FFFFFF',

        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',

        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d1',
    },

    imgFlag: {
        width: 36,
        height: 24,
        borderRadius: 3,
    },

    viewText: {
        flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
        marginHorizontal: 10,
    },

    txtName: {
        fontSize: 15,
        fontWeight: '400',
        color: '#111111',
    },

    txtEName: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    viewRangeItem: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',

        borderBottomWidth:1,
        borderBottomColor: '#dedede',

        alignItems: 'center',
    },

    viewCustomItem: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',

        // borderBottomWidth:1,
        // borderBottomColor: '#dedede',

        alignItems: 'center',
    },

    viewRange: {
        width: '100%',
        padding: 15,
        paddingHorizontal: 35,
        flexDirection: 'row',
    },

    txtRange: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
        width: 60,
        textAlign: 'left',
    },

    txtRangeDate: {
        fontSize: 15,
        fontWeight: '400',
        color: '#111111',
    },

    txtItem: {
        fontSize: 15,
        fontWeight: '400',
        color: '#111111',

        flex: 1,
    },

    viewCheck: {
        width: 20,
        height: 20,
        borderRadius: 1000,
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,

        backgroundColor: colors.PrimaryColor,
    },

    imgCheck: {
        width: 18,
        height: 18,
    },

})