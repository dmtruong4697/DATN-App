import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewSlideContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    imgSlideImage: {
      width: 262,
      height: 304,
      marginTop: -180,
    },

    txtTitle: {
      fontSize: 24,
      marginTop: 16,
      fontWeight: '700',
      color: '#000000',
    },

    txtContent: {
      width: '95%',
      textAlignVertical: 'center',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      color: '#646982',
      marginTop: 8,
    },

    txtButton: {
        textAlign: 'center',
        fontSize: 16,
    },

    btnSkip: {
      width: 306,
      height: 66,
      borderRadius: 12,
      // backgroundColor: "#FFFFFF",
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },

    btnNext: {
        width: 306,
        height: 66,
        borderRadius: 12,
        backgroundColor: colors.PrimaryColor,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },

    btnDone: {
        width: 306,
        height: 66,
        borderRadius: 12,
        backgroundColor: colors.PrimaryColor,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },

    viewActiveDot: {
        backgroundColor: colors.PrimaryColor,
        width: 8,
        height:8,
    },

    viewDot: {
        backgroundColor: '#bcd6d0',
        width: 8,
        height:8,
    },
  });