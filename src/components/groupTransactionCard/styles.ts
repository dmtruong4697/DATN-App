import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginBottom: 10,
        // backgroundColor: 'pink',
    },

    viewIcon: {
        height: 50,
        width: 50,
        borderRadius: 8,
        // backgroundColor: '#F0F6F5',
        backgroundColor: 'white',
        marginRight: 10,
        padding: 5,
    },


    viewContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    txtName: {
        fontSize: 16,
        fontWeight: '700',
    },

    txtTime: {
        fontSize: 13,
        fontWeight: '400',
    },

    txtTotal: {
        fontSize: 18,
        fontWeight: '700',
        color: '#25A969',
    }

})