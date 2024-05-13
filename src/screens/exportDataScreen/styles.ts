import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

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

    viewItem: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },

    imgIcon: {
        width: 24,
        height: 24,
    },

    txtItem: {
        flex: 1,
        color: '#111111',
        fontSize: 16,
        fontWeight: '400',
        marginHorizontal: 10,
    },

    viewButtonGroup: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        gap: 10,
        marginVertical: 10,
    },

})