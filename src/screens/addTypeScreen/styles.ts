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
})