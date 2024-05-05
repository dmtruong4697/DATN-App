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
        alignItems: 'center',
        backgroundColor: '#ffffff',
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
        // marginTop: 5,
    },

    view1: {
        width: '100%',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        padding: 10,
        marginTop: 30,
    },

    imgTypeIcon: {
        height: 40,
        width: 40,
        borderRadius: 1000,
        backgroundColor: 'gray',
        marginRight: 10,
    },

    txtType: {
        fontSize: 24,
        fontWeight: '400',
        color: '#222222',
    },

    txtTotal: {
        fontSize: 24,
        fontWeight: '400',
    },

    view2: {
        width: '100%',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        padding: 10,
        marginTop: 30,
    },

    imgDateIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },

    txtDate: {
        fontSize: 16,
        fontWeight: '400',
        color: '#222222',
    },

    txtEdit: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.PrimaryColor,
    },

    btnEdit: {
        width: '100%',
        // backgroundColor: '#ffffff',
        flexDirection: 'row',
        padding: 15,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtDelete: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.ErrorColor,
    },

    btnDelete: {
        width: '100%',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },

    viewTopGroup: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    viewMember: {
        width: 155,
        height: 155,
        borderRadius: 10,
        // alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: 12,

        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    txtOwnerText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
    },

    viewInviteCode: {
        flexDirection: 'row',
        borderRadius: 5,
        padding: 3,
        backgroundColor: '#e8e8e8',
    },

    imgCopy: {
        width: 18,
        height: 18,
    },

    txtInviteCode: {
        fontSize: 20,
        fontWeight: '500',
        color: '#222222',
    },

    btnAddTransaction: {
        width: '100%',
        height: 35,
        borderRadius: 5,
        backgroundColor: colors.PrimaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },

    txtButton: {
        fontSize: 16,
        fontWeight: '400',
        color: '#ffffff',
    },

    viewTransactionHistory: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        marginBottom: 5,
    },

    viewTitle: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },

    txtSeeAll: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    viewMemberImage: {
        width: 30,
        height: 30,
        borderRadius: 2,
        backgroundColor: '#e8e8e8',
    },
})