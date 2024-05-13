import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        // backgroundColor: '#FFFFFF',
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

    imgButtonDone: {
        height: 30,
        resizeMode: 'contain',
    },

    txtTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginTop: 5,
    },

    viewWalletList: {
        width: '100%',
        backgroundColor: '#FFFFFF',

        borderBottomWidth: 1,
        borderBottomColor: '#dedede',

        borderTopWidth: 1,
        borderTopColor: '#dedede',
    },

    viewAllContainer: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
    },

    viewAllCheck: {
        width: 20,
        height: 20,
        borderRadius: 3,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },

    imgAllCheck: {
        width: 18,
        height: 18,
    },

    txtAll: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#111111',
        marginHorizontal: 15,
    },

    txtSelected: {
        fontSize: 15,
        fontWeight: '400',
        color: '#666666',
    },

})