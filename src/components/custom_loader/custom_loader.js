/**
 * Created by oferaffias on 21/12/2016.
 */

import React, {Component} from 'react';

import LoaderContainer from 'react-loader-advanced';
import Spinner from 'react-loading';
import styles from './custom_loader.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class CustomLoader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: props.loading
        };
        this.setIsLoading = this.setIsLoading.bind(this);
    }

    setIsLoading(isLoading) {
        this.setState({
            isLoading
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading !== this.state.isLoading) {
            this.setState({
                isLoading: nextProps.loading
            })
        }
    }

    render = () => {
        const spinner = <span><Spinner type="bars" color="#0da9f6"/></span>;
        const childrenDivClasses = classNames({[styles.invisible]: (!this.props.isRenderChildrenWhileShowing && this.props.loading)});
        const loaderHeightStyle = this.props.hasOwnProperty('defaultLoaderHeight') ? {height: this.props.defaultLoaderHeight} : {};
        return (
            <LoaderContainer
                priority={this.props.priority || 0}
                show={this.state.isLoading}
                backgroundStyle={this.props.backgroundStyle}
                foregroundStyle={this.props.foregroundStyle}
                hideContentOnLoad={false}
                message={spinner}>
                {
                    (this.props.loading && !this.props.isRenderChildrenWhileShowing) ? <div style={loaderHeightStyle}/> :
                        <div className={childrenDivClasses}>
                            {this.props.children}
                        </div>
                }
            </LoaderContainer>
        );
    };
}

CustomLoader.propTypes = {
    priority: PropTypes.number,
    loading: PropTypes.bool,
    backgroundStyle: PropTypes.object,
    defaultLoaderHeight: PropTypes.string,
    foregroundStyle: PropTypes.object,
    isRenderChildrenWhileShowing: PropTypes.bool,
    children: PropTypes.node
};

export default CustomLoader;
