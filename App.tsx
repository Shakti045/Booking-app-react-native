import { StatusBar } from 'expo-status-bar';
import StackNavigator from './navigation/StackNavigator';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message'
import Notification from './components/Notification';
export default function App() {
  return (
    <>
      <StatusBar  backgroundColor='#003580'/>
      <Provider store={store}>
      <StackNavigator/>
       <Toast/>
      </Provider>
      <Notification/>
    </>
  );
}


