import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        height: '130%',
        // flex: 1,
    },

    viewHeader: {
        // flex : 1,
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderColor: '#DDDDDD',
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

    viewEmpty: {
        width: '100%',
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
    },

    imgEmpty: {
        width: 300,
        height: 300,
        marginBottom: 0,
    },

    txtEmptyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111111',
        marginBottom: 10,
        textAlign: 'center',
    },

    txtEmptyDescription: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
        marginBottom: 10,
        textAlign: 'center',
    },

    btnAdd: {
        padding: 10,
    },

    txtAdd: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.PrimaryColor,
    },

    btnDate: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        marginBottom: 10,
    },

    txtDate: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111111',
    },

    viewProgressContainer: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },

    viewInfo: {
        width: '100%',
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    viewDevine: {
        width: 1,
        height: '70%',
        backgroundColor: '#707070',
    },

    viewInfoItem: {
        width: '32%',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
        paddingHorizontal: 10,
        gap: 5,
    },

    txtItemInfo: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111111',
    },

    txtItemTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    viewProgress: {
        width: '100%',
        // backgroundColor: 'pink',
        alignItems: 'center',
    },

    txtAmount: {
        fontSize: 32,
        fontWeight: '500',
        color: '#2ac962',
    },

    btnTransactions: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
    },

    txtTransactions: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111111',
        flex: 1,
    },

    imgRight: {
        height: 24,
        width: 24,
    },

    viewChart: {
        width: '110%',
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 10,
    },

    txtChartTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111111',
        marginBottom: 20,
    },

    txtOver: {
        fontSize: 24,
        fontWeight: '500',
        color: colors.ErrorColor,
    },

    viewSuggest: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    viewSuggestItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
    },

    txtSuggestTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    txtSuggest: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111111',
    },

    viewModal: {
        flex: 1,
        paddingHorizontal: 15,
        flexDirection: 'column',
        gap: 10,
    },

    inputName: {
        width: '100%',
        height: 40,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#e0e0de',
        alignSelf: 'center',

        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
    },

    btnOption: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    imgOptionIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },

    txtOptionButton: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#111111',
    },

    txtModalTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginTop: 5,
        width: '100%',
    },
})