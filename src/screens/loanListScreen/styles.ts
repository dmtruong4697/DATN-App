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
        // borderBottomWidth: 1,
        // borderColor: '#DDDDDD',
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

    viewTypeList: {
        flex: 1,
        padding: 10,
    },

    btnAddType: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        // borderStyle: 'dashed',
        borderColor: '#DDDDDD',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#ffffff',
    },

    txtAddTypeButton: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666666',
    },

    imgAddTypeButton: {
        height: 24,
        width: 24,
        // resizeMode: 'contain',
        marginRight: 5,
    },
})