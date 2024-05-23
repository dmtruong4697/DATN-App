import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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

    imgPassword: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginVertical: 10,
    },

    txtDescription: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111111',
        textAlign: 'center',
    },

    viewInputContainer: {
        width: '100%',
        padding: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
        flexDirection: 'column',
    },

    txtInputTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    txtInput: {
        fontSize: 16,
        fontWeight: '400',
        color: '#111111',
        // backgroundColor: 'pink',
    },

    viewButtonGroup: {
        width: '100%',
        padding: 10,
        marginTop: 20,
    },
})