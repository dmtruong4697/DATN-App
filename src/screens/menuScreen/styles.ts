import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { SettingStore } from "../../mobx/setting";

export const styles = StyleSheet.create({
    viewContainer: {
        // flex: 1,
        paddingBottom: 50,
        // backgroundColor: '#FFFFFF',
    },

    viewTopContainer: {
        // backgroundColor: 'pink',
        height: 250,
        alignItems: 'center',
        marginBottom: 10,
    },
    
    viewHeaderBar: {
        flexDirection: 'row',
        height: 150,
        width: '100%',
        // padding: 10,
        backgroundColor: colors.PrimaryColor,
        // backgroundColor: SettingStore.themeColor,
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        overflow : 'hidden',
    },

    viewHeaderText: {
        flexDirection: 'column',
        flex: 1,
    },

    btnNotification: {
        height: 40,
        width: 40,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#16b58f',
    },

    imgButtonNotification: {
        height: 23,
        resizeMode: 'contain',
    },

    viewSyncNoti: {
        width: 20,
        height: 20,
        borderRadius: 1000,
        // backgroundColor: colors.ErrorColor,

        position: 'absolute',
        top: -5,
        right: -5,
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

    viewInfo: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
    },

    imgAvatar: {
        height: 130,
        width: 130,
        borderRadius: 1000,
        backgroundColor: 'white',
        borderColor: '#efefef',
        borderWidth: 2,
    },

    txtName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222222',
    },

    btnEdit: {
        width: 22,
        height: 22,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c7c7c7',
        marginLeft: 5,
    },

    imgEdit: {
        height: 16,
        width: 16,
    },

    txtEmail: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.PrimaryColor,
    },

    viewList: {
        // width: '100%',
        backgroundColor: '#FFFFFF',
        margin: 10,
        borderRadius: 10,
        padding: 5,
        paddingVertical: 17,
    },

})