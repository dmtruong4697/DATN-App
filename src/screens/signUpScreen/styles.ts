import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        height: '100%',
    },

    title1: {
        marginTop: 15,
        width: '90%',
    },

    title2: {
        marginTop: 10,
        width: '90%',
    },

    inputForm: {
        width: '88%',
        //height: 500,
        //marginTop: 20,
        //backgroundColor: 'pink',
    },

    inputField: {
        marginTop: 15,
    },

    inputFieldTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0D0D0D',
    },

    textInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 52,
        backgroundColor: '#EBEBEB',
        borderWidth: 1,
        borderColor: '#DEDEDE',
        borderRadius: 8,
        marginTop: 8,
        // padding: 14,
        // fontSize: 16,
        // fontWeight: '500',
        // color: '#939393',
    },

    signInButton: {
        width: '88%',
        height: 53,
        backgroundColor: colors.PrimaryColor,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },

    socialButton: {
        flexDirection: 'row',
        width: 328,
        height: 54,
        borderWidth: 2,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#9F9F9F',
    },

    socialButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#0D0D0D',
    },

    mediaIcon: {
        height: 26, 
        width: 26,
        marginRight: 5,
    },

    buttonGroup: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    txtTitle: {
        fontSize: 24, 
        fontWeight: '700', 
        color: '#32343E',
    },

    txtTitle2: {
        fontSize: 24, 
        fontWeight: '700', 
        color: colors.PrimaryColor,
    },

    viewInput: {
        flex: 1,
        height: '100%',
        padding: 14,
        fontSize: 16,
        fontWeight: '500',
        color: '#939393',
    },

    viewLoading: {
        // height: 100,
        // width: 100,
        // backgroundColor: 'pink',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtLoading: {
        fontSize: 30,
        fontWeight: '700',
    }
})