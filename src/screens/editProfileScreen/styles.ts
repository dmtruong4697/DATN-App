import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },

    viewHeader: {
        // flex : 1,
        width: '100%',
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
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
        // marginTop: 5,
    },
    
    txtEdit: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.PrimaryColor,
    },

    imgButtonDone: {
        height: 30,
        resizeMode: 'contain',
    },

    viewAvatar: {
        height: 110,
        width: 110,
        // backgroundColor: 'pink',
        marginTop: 20,
        marginBottom: 30,
    },

    imgAvatar: {
        height: 110,
        width: 110,
        borderRadius: 1000,
        borderWidth: 3,
        borderColor: '#dbdbdb',
    },

    viewEdit: {
        width: 24,
        height: 24,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',

        position: 'absolute',
        bottom: 0,
        right: 18,
    },

    imgEdit: {
        height: 16,
        width: 16,
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