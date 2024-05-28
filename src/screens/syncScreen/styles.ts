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

    viewLoading: {
        // height: 100,
        // width: 100,
        // backgroundColor: 'pink',
        // position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    imgSync: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginVertical: 10,
    },

    txtDescription: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666666',
        textAlign: 'center',
    },

    txtLastSync: {
        fontSize: 16,
        fontWeight: '400',
        color: '#111111',
        marginTop: 40,
        padding: 15,
        textAlign: 'center',
    },

    viewButtonGroup: {
        width: '100%',
        padding: 10,
        marginTop: 20,
    },
})