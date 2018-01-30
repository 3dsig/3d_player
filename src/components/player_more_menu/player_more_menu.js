/**
 * Created by Asaf Pinhassi on 25/10/2017.
 */
import React, {Component} from 'react';
import styles from './player_more_menu.css';
import PropTypes from 'prop-types';
import switchOnIcon from "images/player/switch-on.svg";
import switchOffIcon from "images/player/switch-off.svg";
import downloadButtonIcon from "images/player/download-enabled.svg";
import downloadActiveButtonIcon from "images/player/download-hover-and-active.svg";
import downloadDisabledButtonIcon from "images/player/download-disabled.svg";
import ReactTooltip from 'react-tooltip'
import enhanceWithClickOutside from 'react-click-outside';
import consts from 'consts';


class PlayerMoreMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDownloadButtonHovered: false
        };
    }

    handleKeyPress = (event) => {
        event.stopPropagation();
    };

    handleClickOutside = (event) => {
        event.stopPropagation();
        if (this.props.onClickOutsideMenu)
            this.props.onClickOutsideMenu();
    };


    render() {
        const linkRef = this.props.flacFileStatus === consts.REMOTE_FILE_STATUS.EXIST ? {href: this.props.downloadUrl} : {};

        let downloadButtonLayout, downloadImageSrc, toolTipText;
        if (this.props.flacFileStatus === consts.REMOTE_FILE_STATUS.EXIST ||
            this.props.flacFileStatus === consts.REMOTE_FILE_STATUS.CHECKING) {
            if (this.state.isDownloadButtonHovered) {
                //toolTipText = undefined;
                downloadButtonLayout = styles.downloadBtnActive;
                downloadImageSrc = downloadActiveButtonIcon;
            } else {
                //toolTipText = undefined;
                downloadButtonLayout = styles.downloadBtnEnabled;
                downloadImageSrc = downloadButtonIcon;
            }
        } else if (this.props.flacFileStatus === consts.REMOTE_FILE_STATUS.NOT_EXIST) {
            //toolTipText = 'File does not exits';
            downloadButtonLayout = styles.downloadBtnDisabled;
            downloadImageSrc = downloadDisabledButtonIcon;
        }

        return (
            <div className={styles.mainContainer} > {/*onClick={this.handleKeyPress}*/}
                <div className={styles.moreMenuRow}>
                    <div className={styles.stretchedPlayerViewContent}>
                        <div>Stretch player view</div>
                        <img
                            onClick={this.props.toggleNormalizePlayerWaveBars}
                            className={styles.switchImage}
                             src={this.props.shouldNormalizePlayerWaveBars ? switchOnIcon : switchOffIcon}
                        />
                    </div>
                </div>
                <div className={styles.moreMenuBottomRow}>
                    <a {...linkRef}
                       download={this.props.saveAsFileName}
                       data-tip={toolTipText}
                       onMouseEnter={() => this.setState({isDownloadButtonHovered: true})}
                       onMouseLeave={() => this.setState({isDownloadButtonHovered: false})}
                       className={downloadButtonLayout}>
                        <div>Download file</div>
                        <img src={downloadImageSrc} style={{cursor: "inherit"}}/>
                    </a>
                    <ReactTooltip
                        effect="solid"
                        type="dark"/>
                </div>
            </div>
        );
    }
}

PlayerMoreMenu.propTypes = {
    onClickOutsideMenu: PropTypes.func.isRequired,
    downloadUrl: PropTypes.string.isRequired,
    saveAsFileName: PropTypes.string.isRequired,
    shouldNormalizePlayerWaveBars: PropTypes.bool.isRequired,
    toggleNormalizePlayerWaveBars: PropTypes.func.isRequired,
    flacFileStatus: PropTypes.string.isRequired,
};

export default enhanceWithClickOutside(PlayerMoreMenu);