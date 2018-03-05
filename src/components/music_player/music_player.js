/**
 * Created by shahartaite on 23/11/2016.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import playerCloseRest from 'images/player/player_close.svg';
import playerCloseActive from 'images/player/player_close_active.svg'
import styles from "./music_player.css";
import CustomLoader from "components/custom_loader/custom_loader";
import MusicFilePlayer from "components/music_file_player/music_file_player";
import HoverableButton from "components/hoverable_button/hoverable_button";
import PlayerDigitalClock from "components/player_digital_clock/player_digital_clock";
import consts from 'consts'
import _ from 'lodash'
const PLAYER_NUMBER = {
    FIRST: 'FIRST',
    SECOND: 'SECOND'
};


class MusicPlayer extends Component {

    constructor(props) {
        super(props);
        this.initialState = { // used to rest component state
            indexFirstPlayerIsPlaying: 0,
            indexSecondPlayerIsPlaying: 1,
            playerPlaying: PLAYER_NUMBER.FIRST,
            isFirstPlayerFileReadyToPlay: false,
            isSecondPlayerFileReadyToPlay: false,
            isPaused: false,
            currentPlayingFilePositionInMilli: 0, //how many milliseconds into the file
            currentFileDuration: 0,

            playerSpeed: props.shouldPlayHalfSpeed ? consts.PLAYER_SPEED.x1_2 : consts.PLAYER_SPEED.x1,
            shouldNormalizePlayerWaveBars: !!props.shouldNormalizePlayerWaveBars,
            repeatOne: !!props.shouldRepeatOne,
        };
        // this.repeatOne = false;
        this.state = {...this.initialState};
        // this.firstPositionSec = 0; // Player position. Is outside of state to prevent render on every change
        // this.secondPositionSec = 0; // Player position. Is outside of state to prevent render on every change
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.isLoading) || this.props.filesToPlay.length !== 0 && !_.isEqual(this.props.filesToPlay,nextProps.filesToPlay)) {
            this.setState(this.initialState);
            // this.firstPositionSec = 0;
            // this.secondPositionSec = 0;
        }
        this.setState({
            playerSpeed: nextProps.shouldPlayHalfSpeed ? consts.PLAYER_SPEED.x1_2 : consts.PLAYER_SPEED.x1,
            shouldNormalizePlayerWaveBars: !!nextProps.shouldNormalizePlayerWaveBars,
            repeatOne: !!nextProps.shouldRepeatOne,
        })
    }

    toggleIsPaused = (shouldPause) => {
        let updateStateWith = {isPaused: shouldPause};
        if (shouldPause) {
            const currentPlayingFilePositionInMilli = Math.floor(this[`player_${this.state.playerPlaying}`].wavesurfer.getCurrentTime() * 1000);
            updateStateWith.currentPlayingFilePositionInMilli = currentPlayingFilePositionInMilli;
        }
        this.setState(updateStateWith);
    };

    resetPlayer = () => {
        const firstFileDuration = this.state.currentFileDuration;
        this.setState(
            {
                ...this.initialState,
                isPaused: true,
                currentFileDuration: firstFileDuration
            }
        );
    };
    onFinishedPlaylist = () => {
        if (this.props.onFinishedPlaylist) {
            this.props.onFinishedPlaylist()
        }
        else {
            this.resetPlayer();
        }
    };

    onFinishedPlayingFile = (playerNumber) => {
        let updateStateWith = {};
        updateStateWith.currentPlayingFilePositionInMilli = 0;
        if (!this.state.repeatOne) {
            if (playerNumber === PLAYER_NUMBER.FIRST) {
                updateStateWith = {
                    indexFirstPlayerIsPlaying: this.state.indexFirstPlayerIsPlaying + 2,
                    playerPlaying: PLAYER_NUMBER.SECOND,
                };
            }
            else {
                updateStateWith = {
                    indexSecondPlayerIsPlaying: this.state.indexSecondPlayerIsPlaying + 2,
                    playerPlaying: PLAYER_NUMBER.FIRST,
                };
            }
            this[`player_${playerNumber}`].createPlayer();
        }
        else {
            updateStateWith.isPaused = true;
        }

        this.setState(updateStateWith);
        const isNoMoreFilesToPlay = (this.props.filesToPlay.length > 0 &&
            ((this.state.playerPlaying === PLAYER_NUMBER.FIRST && this.state.indexFirstPlayerIsPlaying >= this.props.filesToPlay.length) ||
                (this.state.playerPlaying === PLAYER_NUMBER.SECOND && this.state.indexSecondPlayerIsPlaying >= this.props.filesToPlay.length)));

        if (isNoMoreFilesToPlay) {
            this.onFinishedPlaylist();
        }
    };

    onStartedPlaying = (duration) => {
        this.props.onFilePlayingChanged(this.state.playerPlaying === PLAYER_NUMBER.FIRST ?
            this.props.filesToPlay[this.state.indexFirstPlayerIsPlaying] :
            this.props.filesToPlay[this.state.indexSecondPlayerIsPlaying]);
        this.setState({
            currentFileDuration: duration,
            isPaused: false
        })
    };

    onRepeatClicked = () => {
        this.setState({
            repeatOne: !this.state.repeatOne
        });
        this.props.toggleRepeatOne();
    };

    setPlayerReady = (playerNumber,isReady) => {
        let updateStateWith = {};
        if (playerNumber === PLAYER_NUMBER.FIRST) {
            console.log(`setPlayerReady PLAYER_NUMBER.FIRST:${isReady}`);
            updateStateWith.isFirstPlayerFileReadyToPlay = isReady;
        }
        else {
            updateStateWith.isSecondPlayerFileReadyToPlay = isReady;
        }
        this.setState(updateStateWith);
    };

    onError = (fileUrl) => this.props.onErrorPlayingFile(fileUrl);

    createPlayer = (playerNumber) => {

        const firstPlayingIndex = this.state.indexFirstPlayerIsPlaying;
        const secondPlayingIndex = this.state.indexSecondPlayerIsPlaying;
        let fileToPlay;

        // player doesn't have more files we don't it to get an error loading an undefined file
        // so we just load the first file which we know for sure exists, it won't play, just won't fail to load
        if (playerNumber === PLAYER_NUMBER.FIRST) {
            fileToPlay = firstPlayingIndex >= 0 && firstPlayingIndex < this.props.filesToPlay.length ? this.props.filesToPlay[firstPlayingIndex] : this.props.filesToPlay[0];
        }
        else {
            fileToPlay = secondPlayingIndex >= 0 && secondPlayingIndex < this.props.filesToPlay.length ? this.props.filesToPlay[secondPlayingIndex] : this.props.filesToPlay[0];
        }

        const isReady = playerNumber === PLAYER_NUMBER.FIRST ? this.state.isFirstPlayerFileReadyToPlay : this.state.isSecondPlayerFileReadyToPlay;
        return <MusicFilePlayer
            ref={(ref) => this[`player_${playerNumber}`] = ref}
            playerNumber={playerNumber}
            fileUrl={fileToPlay.url}
            fileDownloadUrl={fileToPlay.fileDownloadUrl}
            saveAsFileName={fileToPlay.saveAsFileName}
            isHidden={this.state.playerPlaying !== playerNumber}
            isPlaying={this.state.playerPlaying === playerNumber && !this.state.isPaused && isReady}
            isPaused={this.state.isPaused}
            onError={this.onError}
            onReadyChanged={this.setPlayerReady}
            onFinish={this.onFinishedPlayingFile}
            onPosChange={this.onPosChange}
            onStartedPlaying={this.onStartedPlaying}
            toggleIsPaused={this.toggleIsPaused}
            playerSpeed={this.state.playerSpeed}
            isRepeatOne={this.state.repeatOne}
            onTogglePlayerSpeed={this.togglePlayerSpeed}
            shouldNormalizePlayerWaveBars={this.state.shouldNormalizePlayerWaveBars}
            toggleNormalizePlayerWaveBars={this.toggleNormalizePlayerWaveBars}
            onRepeatClicked={this.onRepeatClicked}
        />
    };

    onPosChange = (relativePosition) => { //relative position in file 0-1

        const currentFileDuration = this.state.currentFileDuration;
        const currentPlayingFilePositionInMilli = Math.floor(relativePosition * (currentFileDuration * 1000));

        this.setState({
            currentPlayingFilePositionInMilli: currentPlayingFilePositionInMilli
        })
    };

    toggleNormalizePlayerWaveBars = () => {
        this.setState({
            shouldNormalizePlayerWaveBars: !this.state.shouldNormalizePlayerWaveBars,
        });
        this.props.toggleNormalizeWaveBars();
    };

    togglePlayerSpeed = () => {
        this.setState({
            playerSpeed: this.state.playerSpeed === consts.PLAYER_SPEED.x1_2 ? consts.PLAYER_SPEED.x1 : consts.PLAYER_SPEED.x1_2
        })
    };

    render() {
        if (!this.props.isShow) {
            return <div/>
        }
        const backgroundStyle = {
            height: '114px',
            background: '#3D4145'
        };
        const foregroundStyle = {
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center'
        };

        const isFilesSuppliedToComponent = this.props.filesToPlay.length > 0;
        const isNoMoreFilesToPlay = (this.state.playerPlaying === PLAYER_NUMBER.FIRST && this.state.indexFirstPlayerIsPlaying >= this.props.filesToPlay.length) ||
            (this.state.playerPlaying === PLAYER_NUMBER.SECOND && this.state.indexSecondPlayerIsPlaying >= this.props.filesToPlay.length);
        const isSomeFileNotReadyToPlay = (this.state.playerPlaying === PLAYER_NUMBER.FIRST && !this.state.isFirstPlayerFileReadyToPlay) ||
            (this.state.playerPlaying === PLAYER_NUMBER.SECOND && !this.state.isSecondPlayerFileReadyToPlay);
        const isShowLoader = this.props.isLoading || isSomeFileNotReadyToPlay;
        const currentFileStartTime = isNoMoreFilesToPlay ? 0 : // not relevant if finished playing
            this.state.playerPlaying === PLAYER_NUMBER.FIRST ?
                this.props.filesToPlay[this.state.indexFirstPlayerIsPlaying].startTime :
                this.props.filesToPlay[this.state.indexSecondPlayerIsPlaying].startTime;
        const isReady = this.state.playerPlaying === PLAYER_NUMBER.FIRST ? this.state.isFirstPlayerFileReadyToPlay : this.state.isSecondPlayerFileReadyToPlay;
        console.log(`playerPlaying: ${this.state.playerPlaying}  isPaused:${this.state.isPaused}  isReady:${isReady}`);
        return (
            <CustomLoader
                priority={8}
                loading={isShowLoader}
                backgroundStyle={backgroundStyle}
                foregroundStyle={foregroundStyle}
                isRenderChildrenWhileShowing={true}>
                {
                    (!this.props.isLoading && isFilesSuppliedToComponent) &&
                    <div>
                        <div className={styles.playerAreaContainer}>

                            <div className={styles.playerContainer}>
                                {this.createPlayer(PLAYER_NUMBER.FIRST)}
                                {this.createPlayer(PLAYER_NUMBER.SECOND)}
                            </div>
                            <HoverableButton
                                restImageSrc={playerCloseRest}
                                activeImageSrc={playerCloseActive}
                                imgClassName={styles.closeBtn}
                                wrappingDivClassName={styles.closeBtnWrapper}
                                onClick={this.props.onUserClosedPlayer}/>
                        </div>
                        <PlayerDigitalClock
                            shouldPauseTime={this.state.isPaused || !isReady}
                            startTime={currentFileStartTime}
                            shouldShowTimestamp={true}
                            positionInMilli={this.state.currentPlayingFilePositionInMilli}
                            durationInSeconds={this.state.currentFileDuration}
                            label={this.props.labelForPlayer}
                            clockTimezone={this.props.clockTimezone}
                            onStartTimeCopiedToClipboard={this.props.onStartTimeCopiedToClipboard}
                        />
                    </div>
                }
                {
                    (this.props.isLoading) &&
                    <div>
                        <div>
                            <HoverableButton
                                restImageSrc={playerCloseRest}
                                activeImageSrc={playerCloseActive}
                                imgClassName={styles.loadingCloseBtn}
                                wrappingDivClassName={styles.loadingCloseBtnWrapper}
                                onClick={this.props.onUserClosedPlayer}/>
                        </div>
                        <div className={styles.emptyLoader}/>
                    </div>
                }

            </CustomLoader>
        )
    }
}

MusicPlayer.defaultProps = {
    isShow: false,
    isLoading: false,
    filesToPlay: [], // file_example =  url, startTime, fileDownloadUrl, saveAsFileName
    labelForPlayer: '',
    shouldNormalizePlayerWaveBars: false,
    shouldPlayHalfSpeed: false,
    onUserClosedPlayer: () => {},
    onFilePlayingChanged: () => {},
    onFinishedPlaylist: () => {},
    onErrorPlayingFile: () => {},
    toggleNormalizeWaveBars: () => {},
    toggleRepeatOne: () => {},
    onStartTimeCopiedToClipboard: () => {},
};

MusicPlayer.propTypes = {
    isShow: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    filesToPlay: PropTypes.array.isRequired,
    shouldNormalizePlayerWaveBars: PropTypes.bool,
    shouldPlayHalfSpeed: PropTypes.bool,
    shouldRepeatOne: PropTypes.bool,
    labelForPlayer: PropTypes.string,
    clockTimezone: PropTypes.string,


    onFilePlayingChanged: PropTypes.func,
    onFinishedPlaylist: PropTypes.func,
    onUserClosedPlayer: PropTypes.func,
    toggleNormalizeWaveBars: PropTypes.func,
    toggleRepeatOne: PropTypes.func,
    onErrorPlayingFile: PropTypes.func,
    onStartTimeCopiedToClipboard: PropTypes.func,
};

export default MusicPlayer;
