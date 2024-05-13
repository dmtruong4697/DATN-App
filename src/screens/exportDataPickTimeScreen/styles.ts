import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    viewHeader: {
        // flex : 1,
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
    },

    btnBack: {
        width: 40,
        height: 40,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imgButtonBack: {
        height: 20,
        resizeMode: 'contain',
    },

    imgButtonAdd: {
        height: 40,
        resizeMode: 'contain',
    },

    txtTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginTop: 5,
    },

    imgButtonDone: {
        height: 30,
        resizeMode: 'contain',
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

    viewList: {
        width: '100%',
        backgroundColor: '#FFFFFF',
    },

})