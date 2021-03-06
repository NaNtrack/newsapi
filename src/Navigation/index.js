import React from 'react';
import {connect} from 'react-redux';
import MainNavigation from './main';
import {InitializingApp} from '@Components';

class Navigation extends React.Component {
  render() {
    return !this.props.isInitialized ? (
      <InitializingApp />
    ) : (
      <MainNavigation />
    );
  }
}

const mapStateToProps = state => ({
  isInitialized: state.app.initialized,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
