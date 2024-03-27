import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {

    },

    viewTopContainer: {
        // backgroundColor: 'pink',
        height: 250,
        alignItems: 'center',
        marginBottom: 10,
    },
    
    viewHeaderBar: {
        flexDirection: 'row',
        height: 200,
        width: '100%',
        // padding: 10,
        backgroundColor: colors.PrimaryColor,
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        overflow : 'hidden',
    },

    viewHeaderText: {
        flexDirection: 'column',
        flex: 1,
    },

    txtGreeting: {
        fontSize: 14,
        color: '#FFFFFF',
    },

    txtName: {
        fontSize: 20,
        color: '#FFFFFF',
    },

    btnNotification: {
        height: 40,
        width: 40,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#16b58f',
    },

    imgButtonNotification: {
        height: 23,
        resizeMode: 'contain',
    },

    viewBalanceCard: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        width: '90%',
        height: 160,
        borderRadius: 20,
        backgroundColor: '#018767',
        padding: 10,
        flexDirection: 'column',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    viewTotal: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        marginBottom: 10,
    },

    viewTotalContent: {
        flexDirection: 'column',
        flex: 1,
    },

    txtTotalBalance: {
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
    },

    txtBalance: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
    },

    btnOption: {
        height: 40,
        width: 40,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#16b58f',
    },

    imgButtonOption: {
        width: 23,
        resizeMode: 'contain',
    },

    viewStatic: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    viewIncome: {
        flexDirection: 'column',
    },

    viewExpent: {
        flexDirection: 'column',
    },

    viewExpentText: {
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
    },

    viewIncomeText: {
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
    },

    txtIncome: {
        fontSize: 14,
        fontWeight: '300',
        color: 'white',
    },

    txtIncomeTotal: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },

    viewIncomeImage: {
        width: 24,
        height: 24,
        borderRadius: 1000,
        backgroundColor: '#16b58f',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imgIncomeImage: {
        height: 18,
        width: 18,
    },

    viewTransactionHistory: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
    },

    viewTitle: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    txtTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
    },

    txtSeeAll: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },
})