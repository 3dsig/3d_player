/**
 * Created by shahartaite on 23/11/2016.
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
// import clientAuthentication from "js/authentication/client_authentication";
// import playerCloseRest from 'images/player/player_close.svg';
// import playerCloseActive from 'images/player/player_close_active.svg'
import styles from "./music_player.css";
import CustomLoader from "components/custom_loader/custom_loader";
import MusicFilePlayer from "components/music_file_player/music_file_player";
// import HoverableDonutButton from "../hoverable_donut_button/hoverable_donut_button";

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
        };
        
        this.state = {...this.initialState};
        // this.firstPositionSec = 0; // Player position. Is outside of state to prevent render on every change
        // this.secondPositionSec = 0; // Player position. Is outside of state to prevent render on every change
        this.createPlayer = this.createPlayer.bind(this);
        this.toggleIsPaused = this.toggleIsPaused.bind(this);
        this.onFinishedPlayingFile = this.onFinishedPlayingFile.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.setPlayerAsReady = this.setPlayerAsReady.bind(this);
        this.onError = this.onError.bind(this);
        this.createPlayer = this.createPlayer.bind(this);
    }
    
    toggleIsPaused = (shouldPause) => {
        this.setState({isPaused: shouldPause});
    };
    
    onFinishedPlayingFile = (playerNumber) => {
        
        if (playerNumber === PLAYER_NUMBER.FIRST) {
            this.setState({
                indexFirstPlayerIsPlaying: this.state.indexFirstPlayerIsPlaying + 2,
                playerPlaying: PLAYER_NUMBER.SECOND,
            });
        }
        else {
            this.setState({
                indexSecondPlayerIsPlaying: this.state.indexSecondPlayerIsPlaying + 2,
                playerPlaying: PLAYER_NUMBER.FIRST,
            });
        }
        
        const isNoMoreFilesToPlay = (this.props.filesToPlay.length > 0 &&
            ((this.state.playerPlaying === PLAYER_NUMBER.FIRST && this.state.indexFirstPlayerIsPlaying >= this.props.filesToPlay.length) ||
                (this.state.playerPlaying === PLAYER_NUMBER.SECOND && this.state.indexSecondPlayerIsPlaying >= this.props.filesToPlay.length)));
        
        if (isNoMoreFilesToPlay) {
            this.props.onFinishedPlaylist();
        }
    };
    
    onPlay = () => {
        this.props.onFilePlayingChanged(this.state.playerPlaying === PLAYER_NUMBER.FIRST ?
            this.props.filesToPlay[this.state.indexFirstPlayerIsPlaying] :
            this.props.filesToPlay[this.state.indexSecondPlayerIsPlaying]);
    };
    
    setPlayerAsReady = (playerNumber) => {
        if (playerNumber === PLAYER_NUMBER.FIRST) {
            this.setState({
                isFirstPlayerFileReadyToPlay: true,
            });
        }
        else {
            this.setState({
                isSecondPlayerFileReadyToPlay: true,
            });
        }
    };
    
    onError = (fileUrl) => this.props.onErrorPlayingFile(fileUrl);
    
    createPlayer = (playerNumber) => {
        
        const firstPlayingIndex = this.state.indexFirstPlayerIsPlaying;
        const secondPlayingIndex = this.state.indexSecondPlayerIsPlaying;
        let fileToPlay;
        
        // player doesn't have more files we don't it to get an error loading an undefined file
        // so we just load the other file which we know for sure exists, it won't play, just won't fail to load
        if (playerNumber === PLAYER_NUMBER.FIRST) {
            fileToPlay = firstPlayingIndex >= 0 && firstPlayingIndex < this.props.filesToPlay.length ? this.props.filesToPlay[firstPlayingIndex] : this.props.filesToPlay[secondPlayingIndex];
        }
        else {
            fileToPlay = secondPlayingIndex >= 0 && secondPlayingIndex < this.props.filesToPlay.length ? this.props.filesToPlay[secondPlayingIndex] : this.props.filesToPlay[firstPlayingIndex];
        }
        
        const isReady = playerNumber === PLAYER_NUMBER.FIRST ? this.state.isFirstPlayerFileReadyToPlay : this.state.isSecondPlayerFileReadyToPlay;
        // const jwt = clientAuthentication.getToken();
        // const url =`/audio/file?thing=${this.props.thingPlaying}&timestamp=${fileToPlay}&type=mp3&token=${jwt}`;
        return <MusicFilePlayer
            playerNumber={playerNumber}
            fileUrl={fileToPlay}
            isHidden={this.state.playerPlaying !== playerNumber}
            isPlaying={this.state.playerPlaying === playerNumber && !this.state.isPaused && isReady}
            isPaused={this.state.isPaused}
            onError={this.onError}
            onReady={(playerNumber) => this.setPlayerAsReady(playerNumber)}
            onFinish={(playerNumber) => this.onFinishedPlayingFile(playerNumber)}
            onPosChange={this.onPosChange}
            onPlay={this.onPlay}
            toggleIsPaused={this.toggleIsPaused}
        />
    };
    
    componentWillReceiveProps(nextProps) {
        const isNoMoreFilesToPlay = (nextProps.filesToPlay.length > 0 &&
            ((this.state.playerPlaying === PLAYER_NUMBER.FIRST && this.state.indexFirstPlayerIsPlaying >= nextProps.filesToPlay.length) ||
                (this.state.playerPlaying === PLAYER_NUMBER.SECOND && this.state.indexSecondPlayerIsPlaying >= nextProps.filesToPlay.length)));
        if ((nextProps.isLoading || isNoMoreFilesToPlay)) {
            this.setState(this.initialState);
            // this.firstPositionSec = 0;
            // this.secondPositionSec = 0;
        }
    }
    hidePlayer = () => {
    
    }
    
    render() {
        const backgroundStyle = {
            height: '114px',
            background: '#3D4145'
        };
        const foregroundStyle = {
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center'
        };
        
        const isNoMoreFilesToPlay = (this.state.playerPlaying === PLAYER_NUMBER.FIRST && this.state.indexFirstPlayerIsPlaying >= this.props.filesToPlay.length) ||
            (this.state.playerPlaying === PLAYER_NUMBER.SECOND && this.state.indexSecondPlayerIsPlaying >= this.props.filesToPlay.length);
        
        if (this.props.isLoading || isNoMoreFilesToPlay) {
            return (
                <CustomLoader
                    priority={8}
                    loading={true}
                    backgroundStyle={backgroundStyle}
                    foregroundStyle={foregroundStyle}
                    isRenderChildrenWhileShowing={true}>
                    
                    <div className={styles.emptyLoader}/>
                
                </CustomLoader>
            )
        }
        
        let isShowLoader = this.props.isLoading ||
            (this.state.playerPlaying === PLAYER_NUMBER.FIRST && !this.state.isFirstPlayerFileReadyToPlay) ||
            (this.state.playerPlaying === PLAYER_NUMBER.SECOND && !this.state.isSecondPlayerFileReadyToPlay);
        
        
        return (
            <CustomLoader
                priority={8}
                loading={isShowLoader}
                backgroundStyle={backgroundStyle}
                foregroundStyle={foregroundStyle}
                isRenderChildrenWhileShowing={true}>
                {/*<HoverableDonutButton
                    restImageSrc={playerCloseRest}
                    activeImageSrc={playerCloseActive}
                    imgClassName={styles.closeBtn}
                    wrappingDivClassName={styles.closeBtnWrapper}
                    onClick={this.hidePlayer}/>*/}
                <div className={styles.playerContainer}>
                    {this.createPlayer(PLAYER_NUMBER.FIRST)}
                    {this.createPlayer(PLAYER_NUMBER.SECOND)}
                </div>
            </CustomLoader>
        );
    }
}

MusicFilePlayer.defaultProps = {
    isShow : false,
    isLoading : false,
    filesToPlay : [],
    onFilePlayingChanged : () => {},
    onFinishedPlaylist : () => {},
    onErrorPlayingFile : () => {}
}

MusicPlayer.propTypes = {
    isShow : PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    filesToPlay: PropTypes.array.isRequired,
    onFilePlayingChanged : PropTypes.func,
    onFinishedPlaylist: PropTypes.func,
    onErrorPlayingFile: PropTypes.func,
};

export default MusicPlayer;
