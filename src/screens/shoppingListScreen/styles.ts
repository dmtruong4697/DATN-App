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

    txtTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginTop: 5,
    },

    viewList: {
        flex: 1,
        // padding: 10,
    },

    btnAdd: {
        width: 110,
        height: 40,
        padding: 10,
        borderRadius: 1000,
        backgroundColor: '#0576ff',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        bottom: 100,
        right: 30,
    },

    txtButtonAdd: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    imgShopping: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },

    txtEmptyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111111',
        marginBottom: 20,
    },

    txtDescription: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    viewGroup: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 40,
    },

    txtModalTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        marginTop: 5,
        width: '100%',
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

})