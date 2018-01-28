/**
 * Created by Asaf Pinhassi on 30/11/2017.
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import Wavesurfer from "wavesurfer.js";
import playButtonIcon from "images/player/play.svg";
import pauseButtonIcon from "images/player/pause.svg";
import styles from "./music_file_player.css";
import classNames from "classnames";

class MusicFilePlayer extends Component {
    
    constructor(props){
        super(props);
        this.isStartedPlayingYet = false;
    }

    componentDidMount() {
        this.wavesurferOptions = {
            container: `#waveform${this.props.playerNumber}`,
            progressColor: '#4EBAF6',
            waveColor: '#6D747B',
            cursorWidth: 0,
            height: 70,
            normalize: true,
            hideScrollbar: true,
            responsive: true,
        };
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
    }


    createPlayer() {
        this.wavesurfer = Wavesurfer.create(this.wavesurferOptions);
        const waveSurferEvents = {
            'error': (() => {
                this.props.onError(this.props.fileUrl)
            }).bind(this),
            'ready': (() => {
                this.props.onReady(this.props.playerNumber)
            }).bind(this),
            'finish': (() => {
                this.props.onFinish(this.props.playerNumber)
            }).bind(this),
            'waveform-ready': (() => {
                this.props.onReady(this.props.playerNumber)
            }).bind(this),
            'seek': ((relativePosition) => { //relative position in file 0-1
                this.props.onPosChange(relativePosition, this.props.playerNumber)
            }).bind(this),
            'play': (() => {
                if(!this.isStartedPlayingYet) {
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
        return (
            <div className={hiddenClass}>
                <div className={styles.playerGrid}>
                    <img src={this.props.isPaused ? playButtonIcon : pauseButtonIcon}
                         onClick={() => this.props.toggleIsPaused(!this.props.isPaused)}
                         className={styles.btnPlayPause}/>
                    <div
                        className={styles.waveform}
                        id={`waveform${this.props.playerNumber}`}/>
                </div>
            </div>
            
        )
    }
}

MusicFilePlayer.propTypes = {
    playerNumber: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
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
};

export default MusicFilePlayer;