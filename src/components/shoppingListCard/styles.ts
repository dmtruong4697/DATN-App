import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        padding: 15,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    viewName: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    txtName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111111',
        flex: 1,
    },

    btnOption: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewProgress: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    viewProgressBar: {
        flex: 1,
        // width: '100%',
        height: 5,
        borderRadius: 1000,
        backgroundColor: '#cccccc',
        marginRight: 10,
    },

    viewDoneBar: {
        height: 5,
        borderRadius: 1000,
        backgroundColor: colors.PrimaryColor,
    },

    txtProgress: {
        fontSize: 14,
        fontWeight: '400',
        color: '#111111',
    }

})