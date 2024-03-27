import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },

    viewTopContainer: {
        // backgroundColor: 'pink',
        height: 250,
        alignItems: 'center',
        marginBottom: 10,
    },
    
    viewHeaderBar: {
        flexDirection: 'row',
        height: 200,
        width: '100%',
        // padding: 10,
        backgroundColor: colors.PrimaryColor,
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        overflow : 'hidden',
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
        color: '#FFFFFF',
        marginTop: 5,
    },

    viewFormContainer: {
        width: '90%',
        // height: 540,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 15,
        position: 'absolute',
        alignSelf: 'center',
        top: 90,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    viewFormItemContainer: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 15,
    },

    txtFormItemTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 5,
    },

    viewFormItem: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },

    txtTypeName: {
        fontSize: 15,
        fontWeight: '400',
        color: '#000000',
        flex: 1,
    },

    viewRadioGroup: {
        width: '100%',
        marginBottom: 15,
        flexDirection: 'row',
    },

    viewRadioItem: {
        flexDirection: 'row',
        width: '50%',
    },

    txtRadioItem: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 5,
    },

    btnRadioItem: {
        width: 24,
        height: 24,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnSelectedItem: {
        width: 20,
        height: 20,
        borderRadius: 1000,
        backgroundColor: colors.PrimaryColor,
    }
})