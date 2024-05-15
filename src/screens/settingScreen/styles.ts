import { StyleSheet } from "react-native";

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

    txtGroupTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#666666',
        padding: 5,
    },

    viewGroup: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',

        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        // borderBottomWidth: 1,
        // borderBlockColor: '#e3e3e3',
    },
})