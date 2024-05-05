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

    viewTopInfo: {
        width: '100%',
        gap: 2,
        flexDirection: 'row',
        marginBottom: 5,
    },

    viewInfo: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    txtInfoTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    txtInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111111',
    },

    viewList: {
        width: '100%',
    },
})