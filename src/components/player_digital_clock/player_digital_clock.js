/**
 * Created by shahartaite on 16/12/2016.
 */
import React, {Component} from 'react';
import moment from 'moment-timezone';
import styles from './player_digital_clock.css';
import PropTypes from 'prop-types';
import copyTimestampActiveBtn from "images/player/copy_active.svg";
import copyTimestampBtn from "images/player/copy.svg";
import CopyToClipboard from 'react-copy-to-clipboard';

const timeFormat = `H:mm:ss.S`;
const shortTimeFormat = `s.S`;
const dateFormat = `dddd, MMMM Do, YYYY`;

class PlayerDigitalClock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCopyButtonHovered: false
        };
        if(props.clockTimezone) {
            moment.tz.setDefault(props.clockTimezone);
        }
        
    }

    startUpdatingTime() {
        this.timeUpdatingMethodID = window.setInterval(function () {
            const millisToAdd = 100 * this.props.playerSpeed;
            if (this.positionInMilli) {
                this.positionInMilli.add(millisToAdd, 'ms');
                if (document.getElementById('playerClockPosition')) {
                    document.getElementById('playerClockPosition').textContent = this.positionInMilli.format(shortTimeFormat);
                }
            }
            if (this.time) {
                this.time.add(millisToAdd, 'ms');
                if (document.getElementById('playerClockTime')) {
                    document.getElementById('playerClockTime').textContent = this.time.format(timeFormat);
                }
                if (document.getElementById('playerClockDate')) {
                    document.getElementById('playerClockDate').textContent = `/ ${this.time.format(dateFormat)}`;
                }
            }
        }.bind(this), 100);
    }

    stopUpdatingTime() {
        if (this.timeUpdatingMethodID) {
            clearInterval(this.timeUpdatingMethodID);
        }
        if (document.getElementById('playerClockPosition')) {
            document.getElementById('playerClockPosition').textContent = '0.0';
        }
    }

    onTimestampCopied = () => {
        if (this.props.onStartTimeCopiedToClipboard)
            this.props.onStartTimeCopiedToClipboard(this.props.startTime);
    };


    render() {
        this.stopUpdatingTime();
        this.time = moment(this.props.startTime + this.props.positionInMilli);
        this.positionInMilli = moment.utc(this.props.positionInMilli);
        const fileDuration = this.props.durationInSeconds
        const secondsWithinDuration = Math.floor(fileDuration % 60);
        const millisecondsWithinDuration = ((fileDuration - Math.floor(fileDuration))*10).toFixed(0)
        const duration = `${secondsWithinDuration}.${millisecondsWithinDuration}`;
        if (!this.props.shouldPauseTime) {
            this.startUpdatingTime();
        }

        return (
            <div className={styles.playerBottomContainer}>
                <div className={styles.playerBottomContent}>
                    <div className={styles.playerBottomLeft}>
                            <div id="playerClockPosition" className={styles.playerBottomPanelElapsed}>{this.positionInMilli.format(shortTimeFormat)}</div>
                            <div className={styles.playerBottomPanelLength}>{`/ ${duration}`}</div>
                            <div id="playerClockTime" className={styles.playerBottomPanelTime}>{this.time.format(timeFormat)}</div>
                            <div id="playerClockDate" className={styles.playerBottomPanelDate}>{`/ ${this.time.format(dateFormat)}`}</div>
                    </div>

                    <div className={styles.playerBottomCenter}>
                        <div className={styles.playerBottomPanelElapsed}>Timestamp:</div>
                        <CopyToClipboard text={`${this.props.startTime}`}>
                            <div className={this.state.isCopyButtonHovered ? styles.playerBottomPanelTimestampContentActive : styles.playerBottomPanelTimestampContentNormal }
                                 onClick={this.onTimestampCopied}
                                 onMouseOver={() => this.setState({isCopyButtonHovered: true})}
                                 onMouseLeave={() => this.setState({isCopyButtonHovered: false})}>
                                <div className={styles.playerBottomPanelTimestampValue}>{this.props.startTime}</div>
                                <img
                                    alt={"copy"}
                                    src={this.state.isCopyButtonHovered ? copyTimestampActiveBtn : copyTimestampBtn}
                                    className={styles.copyBtn}
                                />
                            </div>
                        </CopyToClipboard>
                    </div>

                    <div className={styles.playerBottomRight}>
                        <div className={styles.playerBottomPanelLabel}>{this.props.label}</div>
                    </div>

                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.stopUpdatingTime();
    }
}

PlayerDigitalClock.defaultProps = {
    shouldShowTimestamp : true,
    label : '',
    playerSpeed : 1
};

PlayerDigitalClock.propTypes = {
    shouldPauseTime: PropTypes.bool.isRequired,
    startTime: PropTypes.number.isRequired,
    shouldShowTimestamp: PropTypes.bool,
    positionInMilli: PropTypes.number.isRequired,

    durationInSeconds: PropTypes.number.isRequired,
    label: PropTypes.string,
    playerSpeed: PropTypes.number,
    clockTimezone: PropTypes.string,
    onStartTimeCopiedToClipboard: PropTypes.func,
};
export default PlayerDigitalClock;
