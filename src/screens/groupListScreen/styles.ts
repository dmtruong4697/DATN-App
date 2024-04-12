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

    viewGroupList: {
        // flex: 1,
        padding: 10,
    },

    viewSearchInput: {
        width: '100%',
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#c7c7c7',
        marginBottom: 10,
    },

    txtEdit: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.PrimaryColor,
    },

})