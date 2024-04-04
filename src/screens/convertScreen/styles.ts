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

    viewConvertCard: {
        width: '95%',
        // height: 300,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    viewCardItem: {
        width: '100%',
        flexDirection: 'column',
    },

    txtItemTitle: {
        fontSize: 15,
        color: '#989898',
        fontWeight: '400',
        marginBottom: 10,
    },

    viewInfo: {
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },

    btnCurrency: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },

    imgFlag: {
        height: 45,
        width: 45,
        borderRadius: 1000,
        backgroundColor: 'pink',
    },

    txtCurrency: {
        fontSize: 20,
        fontWeight: '700',
        color: '#26278D',
        flex: 1,
        marginLeft: 10,
    },

    imgDown: {
        height: 20,
        width: 20,
        marginRight: 10,
    },

    viewInput: {
        flex: 1,
        borderRadius: 7,
        backgroundColor: '#EFEFEF',
        padding: 5,
        fontSize: 20,
        fontWeight: '700',
        color: '#3C3C3C',
        textAlign: 'right',
    },

    viewSwap: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    viewLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#E7E7EE',
        position: 'absolute',
    },

    btnSwap: {
        height: 44,
        width: 44,
        borderRadius: 1000,
        backgroundColor: colors.PrimaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imgSwap: {
        height: 30,
        width: 30,
    },
})