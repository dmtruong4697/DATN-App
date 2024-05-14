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

    txtTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginTop: 5,
    },

    viewWalletList: {
        flex: 1,
        padding: 10,
    },

    btnAddWallet: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        // borderStyle: 'dashed',
        borderColor: '#DDDDDD',
        // borderColor: colors.PrimaryColor,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#ffffff',
    },

    txtAddWalletButton: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666666',
    },

    imgAddWalletButton: {
        height: 24,
        width: 24,
        // resizeMode: 'contain',
        marginRight: 5,
    },
    

})