import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    imgEmail: {
        width: 150,
        height: 150,
        resizeMode: 'contain',

        marginTop: 30,
    },

    txtTitle: {
        fontSize: 24,
        fontWeight: '500',
        color: '#111111',
    },

    txtDescription: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
        marginBottom: 20,
    },

    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 44,
      height: 44,
      lineHeight: 44,
      fontSize: 24,
      borderWidth: 1.5,
      borderRadius: 6,
      borderColor: '#00000030',
      textAlign: 'center',
    //   justifyContent: 'center',
    //   alignItems: 'center',
      margin: 5,
      color: '#111111',
    },
    focusCell: {
      borderColor: colors.PrimaryColor,
    },

    viewButtonGroup: {
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
    },

    viewLoading: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
})