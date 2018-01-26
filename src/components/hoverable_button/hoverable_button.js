/**
 * Created by shahartaite on 09/07/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './hoverable_button.css';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip'
import {I18n} from 'react-redux-i18n';

class HoverableButton extends Component {
    constructor(props) {
        super(props);
        this.onHover = this.onHover.bind(this);
        this.onHoverEnd = this.onHoverEnd.bind(this);
        this.state = {
            isHovered: false
        }
    }

    onHover() {
        this.setState({
            isHovered: true
        });
    }

    onHoverEnd() {
        this.setState({
            isHovered: false
        })
    }



    render() {
        const imgSrc = this.props.isActive || this.state.isHovered ? this.props.activeImageSrc : this.props.restImageSrc;
        const divWrapperClasses = classNames(styles.wrapperDiv, {[this.props.wrappingDivClassName]: this.props.wrappingDivClassName}); //we add wrapping div class if exists
        const imgClasses = classNames(styles.btnImg, {[this.props.imgClassName]: this.props.imgClassName});
        return (
            <div className={divWrapperClasses}
                 data-tip={this.props.tooltip && I18n.t(`indicator.tooltip.${this.props.tooltip}`)}
                 onClick={this.props.onClick}
                 onMouseEnter={this.onHover}
                 onMouseLeave={this.onHoverEnd}>
                {
                    this.props.tooltip &&
                    <ReactTooltip
                        effect="solid"
                        type="dark"/>
                }
                <img src={imgSrc}
                     className={imgClasses}/>
            </div>
        );
    }
}

HoverableButton.propTypes = {
    restImageSrc: PropTypes.string.isRequired,
    activeImageSrc: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    imgClassName: PropTypes.string,
    wrappingDivClassName: PropTypes.string,
    isActive: PropTypes.bool,
    tooltip: PropTypes.string
};
export default HoverableButton;