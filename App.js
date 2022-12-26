import { store } from './Redux/Store'
import { Provider } from 'react-redux'
import Index from './Index';

export default function App() {
  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  );
}

// ## INTRODUCTION 
// • A Social-Media App built on React Native with Firebase as backend.

// • Developed a modern and easy-to-use frontend with React Native for Android/iOS devices, along with Global State Management with Redux, and implemented React Navigation

// • Implemented the backend on Google Firebase, with Authentication, Firestore and Storage.


// ## TECHNOLOGIES USED 
// React Native, Expo, React Navigation, Redux, Firebase
