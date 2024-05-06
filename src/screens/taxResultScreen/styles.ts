import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
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

    txtTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginTop: 5,
    },

    viewGroup: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },

    viewItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF',
        // justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    txtBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111111',
    },

    txtBoldTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111111',
        flex: 1,
    },

    txtDefault: {
        fontSize: 16,
        fontWeight: '400',
        color: '#111111',
    },

    txtDefaultTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#111111',
        flex: 1,
    },

    viewSub: {
        alignSelf: 'flex-end',
        width: '80%',
        padding: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    txtSub: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    viewTax: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 1,
    },

    txtTax: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111111',
    },

    imgDown: {
        width: 24,
        height: 24,
        marginRight: 10,
    },

    viewButton: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})