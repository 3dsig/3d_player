/**
 * Created by Asaf Pinhassi on 30/11/2017.
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import Wavesurfer from "wavesurfer.js";
import playButtonIcon from "images/player/play.svg";
import pauseButtonIcon from "images/player/pause.svg";
import styles from "./music_file_player.css";
// import PlayerDigitalClock from "js/components/player_digital_clock/player_digital_clock";
//import HoverableBooButton from "../hoverable_boo_button/hoverable_boo_button";
import classNames from "classnames";

class MusicFilePlayer extends Component {

    constructor(props) {
        super(props);
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
        if (this.props.fileUrl !== nextProps.url) {
            this.wavesurfer.load(nextProps.url)
        }
    }


    createPlayer(playerNumber) {
        // if (this.wavesurfer) {
        //     this.wavesurfer.destroy();
        // }
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
            // 'seek': ((e) => {
            //     //console.log(`Wavesurfer.onSeek position:${position.originalArgs[0]}`);
            //     console.log('player seek ' + playerNumber)
            //     this.forceUpdate(); // request render to update stopper position
            // }).bind(this),
            // onPosChange: (position) => this.props.onPosChange(position, this.props.playerNumber),
            'play': (() => {
                this.props.onPlay()
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


    /*{/!*{!this.props.isHidden && // recreate element when player is displayed
    <PlayerDigitalClock
        startTime={this.props.startTime}
        position={this.props.positionSec * 1000}
        shouldPauseTime={this.props.shouldPauseClock}
        shouldShowTimestamp={this.props.shouldShowTimestamp}
        realThing={this.props.realThing}
        duration={this.props.durationSec * 1000}
        playerSpeed={this.props.playerSpeed}
        onTimestampCopiedToClipboard={this.props.onTimestampCopiedToClipboard}
    />
    }*!/}*/

}

MusicFilePlayer.propTypes = {
    playerNumber: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
    // startTime: PropTypes.number.isRequired,
    // realThing: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    // shouldPauseClock: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    onError: PropTypes.func.isRequired,
    onReady: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    onPosChange: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    toggleIsPaused: PropTypes.func.isRequired,
};

export default MusicFilePlayer;