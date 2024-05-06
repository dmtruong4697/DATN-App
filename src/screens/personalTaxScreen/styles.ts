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

    viewGroup1: {
        width: '100%',
        flexDirection: 'column',
        gap: 1,
        marginBottom: 10,
    },

    viewInputContainer: {
        width: '100%',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#FFFFFF',
    },

    txtInputTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#707070',
    },

    inputField: {
        color: colors.PrimaryColor,
        fontSize: 30,
        fontWeight: '600',

        textAlign: 'right',
        width: '100%',
    },

    viewInput2Container: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    input2Field: {
        flex: 1,
        color: '#111111',
        fontSize: 18,
        fontWeight: '500',

        textAlign: 'right',
    },

})