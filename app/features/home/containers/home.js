import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/home';
import * as duck from '../duck';

@connect(
    (state) => state.homeReducers,
    (dispatch) => ({ actions: bindActionCreators(duck, dispatch) })
)
class HomeContainer extends React.Component {
    render() {
        const {children} = this.props;

        return (<Home children={children} />);
    }
}
export default HomeContainer;