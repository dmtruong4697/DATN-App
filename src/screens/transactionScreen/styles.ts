import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },

    viewHeader: {
        // flex : 1,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff'
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

    txtPeriod: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
    },

    viewSearch: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#FFFFFF',
        // backgroundColor: 'pink',
    },

    inputSearch: {
        width: '100%',
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        padding: 5,
        color: '#666666',
        fontSize: 15,
    },
})