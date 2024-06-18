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
        backgroundColor: '#F0F6F5',
        marginRight: 10,
    },

    txtType: {
        fontSize: 24,
        fontWeight: '400',
        color: '#222222',
    },

    txtTotal: {
        fontSize: 30,
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
    },

    viewFormItemContainer: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 13,
        padding: 10,
    },

    txtFormItemTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 5,
    },

    imgPhoto: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 5,
    },
})