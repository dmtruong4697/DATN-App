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
        // borderBottomWidth: 1,
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

    viewButtonGroup: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        gap: 10,
        marginVertical: 10,
    },

    viewItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFFFFF',

        alignItems: 'center',

        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },

    imgIcon: {
        height: 30,
        width: 30,
    },

    txtItemTitle: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: '400',
        color: '#555555',
    },

    txtTotal: {
        fontSize: 16,
        fontWeight: '500',
    },

    imgRight: {
        height: 20,
        width: 20,
        marginLeft: 10,
    },

    viewGroup: {
        width: '100%',
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopColor: '#e6e6e6',

        marginBottom: 30,
    },
})