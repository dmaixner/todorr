import { connect } from 'react-redux';
import Alert from '../components/Alert';
import { getAlertText, getAlertStyle } from '../selectors';
import { setAlert } from '../actions';

const mapStateToProps = (state) => {
  return {
    text: getAlertText(state),
    style: getAlertStyle(state)
  }
}

const actions = {
  setAlert
}

const AlertContainer = connect(
  mapStateToProps,
  actions
)(Alert);

export default AlertContainer;
