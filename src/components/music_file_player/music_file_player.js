/**
 * Created by Asaf Pinhassi on 30/11/2017.
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import Wavesurfer from "wavesurfer.js";
import playButtonIcon from "images/player/play.svg";
import pauseButtonIcon from "images/player/pause.svg";
import repeatImgSrc from 'images/player/play-once-rest.svg';
import repeatHoverActiveImgSrc from 'images/player/play-once-hover-and-active.svg';
import halfSpeedImgSrc from 'images/player/slow-motion-rest.svg';
import halfSpeedHoverActiveImgSrc from 'images/player/slow-motion-hover-and-active.svg';
import moreImgSrc from 'images/player/more.svg';
import moreHoverActiveImgSrc from 'images/player/more-hover-and-active.svg';
import HoverableButton from 'components/hoverable_button/hoverable_button';
import styles from "./music_file_player.css";
import classNames from "classnames";
import PlayerMoreMenu from 'components/player_more_menu/player_more_menu';
import consts from 'consts';
class MusicFilePlayer extends Component {
    
    state = { // used to rest component state
        isMoreMenuOpen: false,
        flacFileStatus: consts.REMOTE_FILE_STATUS.EXIST,
    };
    
    constructor(props) {
        super(props);
        this.isStartedPlayingYet = false;
    }
    
    componentDidMount() {
        this.createPlayer(this.props.playerNumber)
    }
    
    componentWillUnmount() {
        this.wavesurfer.destroy();
    }
    
    componentWillReceiveProps(nextProps) {
        const playerPlayingChanged = this.props.isPlaying !== nextProps.isPlaying;
        if (playerPlayingChanged) {
            if (nextProps.isPlaying) {
                this.wavesurfer.play();
            }
            else {
                this.wavesurfer.pause();
            }
        }
        if (this.props.fileUrl !== nextProps.fileUrl) {
            this.isStartedPlayingYet = false;
            this.wavesurfer.load(nextProps.fileUrl)
        }
        const shouldNormalizePlayerWaveBarsChanged = this.props.shouldNormalizePlayerWaveBars !== nextProps.shouldNormalizePlayerWaveBars;
        const playerSettingsChanged = shouldNormalizePlayerWaveBarsChanged;
        if (playerSettingsChanged) {

            this.createPlayer();
        }
        const playerSpeedChanged = this.props.playerSpeed !== nextProps.playerSpeed
        if(playerSpeedChanged){
            this.wavesurfer.setPlaybackRate(nextProps.playerSpeed === consts.PLAYER_SPEED.x1_2 ? 0.5 : 1);
        }
    }
    
    createPlayer = () => {
        if(this.wavesurfer) {
            this.wavesurfer.destroy();
        }
        this.wavesurferOptions = {
            container: `#waveform${this.props.playerNumber}`,
            progressColor: '#4EBAF6',
            waveColor: '#6D747B',
            cursorWidth: 0,
            height: 70,
            normalize: this.props.shouldNormalizePlayerWaveBars,
            audioRate: this.props.playerSpeed,
            hideScrollbar: true,
            responsive: true,
        };
        this.wavesurfer = Wavesurfer.create(this.wavesurferOptions);
        const waveSurferEvents = {
            'error': (() => {
                this.props.onError(this.props.fileUrl)
            }).bind(this),
            'ready': (() => {
                const that = this;
                setTimeout(() => that.props.onReady(that.props.playerNumber), 1000) //timeout fixes problem in safari where seek doesn't work properly
            }).bind(this),
            'finish': (() => {
                this.props.onFinish(this.props.playerNumber)
            }).bind(this),
            'waveform-ready': (() => {
            }).bind(this),
            'seek': ((relativePosition) => { //relative position in file 0-1
                this.props.onPosChange(relativePosition, this.props.playerNumber)
            }).bind(this),
            'play': (() => {
                if (!this.isStartedPlayingYet) {
                    this.isStartedPlayingYet = true;
                    this.props.onStartedPlaying(this.wavesurfer.getDuration())
                }
            }).bind(this),
        };
        Object.entries(waveSurferEvents).forEach(([eventName, handler]) => {
            this.wavesurfer.on(eventName, handler)
        });
        this.wavesurfer.load(this.props.fileUrl)
    }
    
    render() {
        const hiddenClass = classNames({[styles.hidePlayer]: this.props.isHidden}, styles.hovering);
        const fileDownloadUrl = this.props.fileDownloadUrl ? this.props.fileDownloadUrl : this.props.fileUrl;
        return (
            <div className={hiddenClass}>
                <div className={styles.playerContainer}>
                    
                    <HoverableButton
                        tooltip="Play once"
                        restImageSrc={repeatImgSrc}
                        activeImageSrc={repeatHoverActiveImgSrc}
                        onClick={this.props.onRepeatClicked}
                        isActive={false} //this.props.shouldPlayInLoop
                        imgClassName={styles.repeatImg}
                        wrappingDivClassName={styles.repeatImageContainer}
                    />
                    <HoverableButton
                        tooltip="Play sound in slow motion"
                        restImageSrc={halfSpeedImgSrc}
                        activeImageSrc={halfSpeedHoverActiveImgSrc}
                        onClick={this.props.onTogglePlayerSpeed}
                        isActive={false} //this.props.playerSpeed === consts.PLAYER_SPEED.x1_2
                        wrappingDivClassName={styles.halfSpeedBtnContainer}
                        imgClassName={styles.halfSpeedImg}
                    />
                    <img src={this.props.isPaused ? playButtonIcon : pauseButtonIcon}
                         onClick={() => this.props.toggleIsPaused(!this.props.isPaused)}
                         className={styles.btnPlayPause}/>
                    
                    <div
                        className={styles.waveform}
                        id={`waveform${this.props.playerNumber}`}/>
                    <HoverableButton
                        restImageSrc={moreImgSrc}
                        activeImageSrc={moreHoverActiveImgSrc}
                        onClick={this.onMoreClicked}
                        isActive={this.state.isMoreMenuOpen}
                        imgClassName={styles.moreBtn}
                        wrappingDivClassName={styles.moreBtnContainer}
                    />
                </div>
                {this.state.isMoreMenuOpen &&
                <PlayerMoreMenu
                    onClickOutsideMenu={() => this.onMoreClicked(false)}
                    downloadUrl={fileDownloadUrl}
                    saveAsFileName={`${this.props.saveAsFileName}`}
                    shouldNormalizePlayerWaveBars={this.props.shouldNormalizePlayerWaveBars}
                    toggleNormalizePlayerWaveBars={this.props.toggleNormalizePlayerWaveBars}
                    flacFileStatus={this.state.flacFileStatus}
                />
                }
            </div>
        
        )
    }
    
    onMoreClicked = () => {
        this.props.toggleIsPaused(true);
        this.setState((prevState) => ({
            isMoreMenuOpen: !prevState.isMoreMenuOpen,
        }));
    };
}
MusicFilePlayer.propTypes = {
    playerNumber: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
    fileDownloadUrl: PropTypes.string,
    saveAsFileName: PropTypes.string,
    isHidden: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    onError: PropTypes.func.isRequired,
    onReady: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    onPosChange: PropTypes.func.isRequired,
    // onPosChange: PropTypes.func.isRequired,
    onStartedPlaying: PropTypes.func.isRequired,
    toggleIsPaused: PropTypes.func.isRequired,
    shouldNormalizePlayerWaveBars : PropTypes.bool.isRequired,
    toggleNormalizePlayerWaveBars: PropTypes.func.isRequired,
    playerSpeed: PropTypes.number.isRequired,
    onTogglePlayerSpeed : PropTypes.func.isRequired,
    onRepeatClicked: PropTypes.func.isRequired,
    
};

export default MusicFilePlayer;