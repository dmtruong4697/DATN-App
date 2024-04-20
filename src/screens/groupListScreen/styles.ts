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
        fontWeight: '500',
        color: colors.PrimaryColor,
    },

    btnBottomSheet: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        // justifyContent: 'center',
        marginBottom: 10,
    },

    imgButtomIcon: {
        width: 26,
        height: 26,
        marginHorizontal: 15,
    },

    txtButton: {
        fontSize: 17,
        fontWeight: '400',
        color: '#666666',
    },

    inputCode: {
        width: '92%',
        height: 40,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#e0e0de',
        alignSelf: 'center',

        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
    },

})