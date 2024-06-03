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
        marginBottom: 10,
        paddingTop: 0,
    },

    viewTabContainer: {
        flex: 1,
        height: '120%',
    },

    viewTab: {
        // flex: 1,
        // padding: 10,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',

        marginBottom: 10,
    },

    viewType: {
        width: '100%',
        // padding: 10,
        flexDirection: 'row',
        marginBottom: 15,
    },

    viewTypeItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtType: {
        fontSize: 14,
        fontWeight: '400',
        color: '#555555',
    },

    viewTypeColor: {
        width: 12,
        height: 12,
        borderRadius: 1000,
        marginRight: 10,
    },

})