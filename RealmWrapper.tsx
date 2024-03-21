import { ActivityIndicator, SafeAreaView } from "react-native";
import App from "./App";
import { RealmContext } from "./src/realm/models";

const {RealmProvider} = RealmContext;

function RealmWrapper(): JSX.Element {

    return (
        <SafeAreaView style={{flex: 1}}> 
                <RealmProvider>
                    <App/>
                </RealmProvider>
        </SafeAreaView>
    )
}

export default RealmWrapper;