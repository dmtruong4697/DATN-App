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
        height: 500,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 15,
        position: 'absolute',
        alignSelf: 'center',
        top: 100,

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

    imgTypeIcon: {
        width: 32,
        height: 32,
        borderRadius: 1000,
        marginRight: 5,
    },

    txtTypeName: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
        flex: 1,
    },

    viewTypeList: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
    },

    btnAddType: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderColor: '#DDDDDD',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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