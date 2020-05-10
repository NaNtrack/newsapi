import Toast from 'react-native-simple-toast';
import {CommonActions} from '@react-navigation/native';
import Strings from '@I18n';
import GlobalActions from '@Redux/Globals';

export default (
  {dispatch, module = 'app', property = 'loading', navigateBack = false, api = false},
  error,
) => {
  let message = Strings.defaultError;
  const {apiError} = Strings;
  console.log({error});
  if (!error) {
    message = api ? apiError.no_internet : Strings.unknownError;
  } else if ('data' in error) {
    const {data} = error;

    // Message could be named as ErrorMessage or Message
    if (data && (data.ErrorMessage || data.message)) {
      message = data.ErrorMessage || data.message;
    }
  } else if ('message' in error) {
    message = error.message;
  }

  const apiMessage = `${message}`;
  if (apiMessage in apiError) {
    message = apiError[apiMessage];
  }

  // Stop loading animation
  dispatch(GlobalActions.changeState(module, property, false));

  // Navigate back if it's needed
  if (navigateBack) {
    dispatch(CommonActions.goBack());
  }

  // Fire Error Notification
  Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
};
