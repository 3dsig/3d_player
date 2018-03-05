(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["3d_player"] = factory();
	else
		root["3d_player"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonp3d_player([1],{

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _player_close = __webpack_require__(213);

var _player_close2 = _interopRequireDefault(_player_close);

var _player_close_active = __webpack_require__(214);

var _player_close_active2 = _interopRequireDefault(_player_close_active);

var _music_player = __webpack_require__(215);

var _music_player2 = _interopRequireDefault(_music_player);

var _custom_loader = __webpack_require__(218);

var _custom_loader2 = _interopRequireDefault(_custom_loader);

var _music_file_player = __webpack_require__(292);

var _music_file_player2 = _interopRequireDefault(_music_file_player);

var _hoverable_button = __webpack_require__(79);

var _hoverable_button2 = _interopRequireDefault(_hoverable_button);

var _player_digital_clock = __webpack_require__(358);

var _player_digital_clock2 = _interopRequireDefault(_player_digital_clock);

var _consts = __webpack_require__(55);

var _consts2 = _interopRequireDefault(_consts);

var _lodash = __webpack_require__(370);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by shahartaite on 23/11/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PLAYER_NUMBER = {
    FIRST: 'FIRST',
    SECOND: 'SECOND'
};

var MusicPlayer = function (_Component) {
    _inherits(MusicPlayer, _Component);

    function MusicPlayer(props) {
        _classCallCheck(this, MusicPlayer);

        var _this = _possibleConstructorReturn(this, (MusicPlayer.__proto__ || Object.getPrototypeOf(MusicPlayer)).call(this, props));

        _this.toggleIsPaused = function (shouldPause) {
            var updateStateWith = { isPaused: shouldPause };
            if (shouldPause) {
                var currentPlayingFilePositionInMilli = Math.floor(_this["player_" + _this.state.playerPlaying].wavesurfer.getCurrentTime() * 1000);
                updateStateWith.currentPlayingFilePositionInMilli = currentPlayingFilePositionInMilli;
            }
            _this.setState(updateStateWith);
        };

        _this.resetPlayer = function () {
            var firstFileDuration = _this.state.currentFileDuration;
            _this.setState(_extends({}, _this.initialState, {
                isPaused: true,
                currentFileDuration: firstFileDuration
            }));
        };

        _this.onFinishedPlaylist = function () {
            if (_this.props.onFinishedPlaylist) {
                _this.props.onFinishedPlaylist();
            } else {
                _this.resetPlayer();
            }
        };

        _this.onFinishedPlayingFile = function (playerNumber) {
            var updateStateWith = {};
            updateStateWith.currentPlayingFilePositionInMilli = 0;
            if (!_this.state.repeatOne) {
                if (playerNumber === PLAYER_NUMBER.FIRST) {
                    updateStateWith = {
                        indexFirstPlayerIsPlaying: _this.state.indexFirstPlayerIsPlaying + 2,
                        playerPlaying: PLAYER_NUMBER.SECOND
                    };
                } else {
                    updateStateWith = {
                        indexSecondPlayerIsPlaying: _this.state.indexSecondPlayerIsPlaying + 2,
                        playerPlaying: PLAYER_NUMBER.FIRST
                    };
                }
                _this["player_" + playerNumber].createPlayer();
            } else {
                updateStateWith.isPaused = true;
            }

            _this.setState(updateStateWith);
            var isNoMoreFilesToPlay = _this.props.filesToPlay.length > 0 && (_this.state.playerPlaying === PLAYER_NUMBER.FIRST && _this.state.indexFirstPlayerIsPlaying >= _this.props.filesToPlay.length || _this.state.playerPlaying === PLAYER_NUMBER.SECOND && _this.state.indexSecondPlayerIsPlaying >= _this.props.filesToPlay.length);

            if (isNoMoreFilesToPlay) {
                _this.onFinishedPlaylist();
            }
        };

        _this.onStartedPlaying = function (duration) {
            _this.props.onFilePlayingChanged(_this.state.playerPlaying === PLAYER_NUMBER.FIRST ? _this.props.filesToPlay[_this.state.indexFirstPlayerIsPlaying] : _this.props.filesToPlay[_this.state.indexSecondPlayerIsPlaying]);
            _this.setState({
                currentFileDuration: duration,
                isPaused: false
            });
        };

        _this.onRepeatClicked = function () {
            _this.setState({
                repeatOne: !_this.state.repeatOne
            });
            _this.props.toggleRepeatOne();
        };

        _this.setPlayerReady = function (playerNumber, isReady) {
            var updateStateWith = {};
            if (playerNumber === PLAYER_NUMBER.FIRST) {
                console.log("setPlayerReady PLAYER_NUMBER.FIRST:" + isReady);
                updateStateWith.isFirstPlayerFileReadyToPlay = isReady;
            } else {
                updateStateWith.isSecondPlayerFileReadyToPlay = isReady;
            }
            _this.setState(updateStateWith);
        };

        _this.onError = function (fileUrl) {
            return _this.props.onErrorPlayingFile(fileUrl);
        };

        _this.createPlayer = function (playerNumber) {

            var firstPlayingIndex = _this.state.indexFirstPlayerIsPlaying;
            var secondPlayingIndex = _this.state.indexSecondPlayerIsPlaying;
            var fileToPlay = void 0;

            // player doesn't have more files we don't it to get an error loading an undefined file
            // so we just load the first file which we know for sure exists, it won't play, just won't fail to load
            if (playerNumber === PLAYER_NUMBER.FIRST) {
                fileToPlay = firstPlayingIndex >= 0 && firstPlayingIndex < _this.props.filesToPlay.length ? _this.props.filesToPlay[firstPlayingIndex] : _this.props.filesToPlay[0];
            } else {
                fileToPlay = secondPlayingIndex >= 0 && secondPlayingIndex < _this.props.filesToPlay.length ? _this.props.filesToPlay[secondPlayingIndex] : _this.props.filesToPlay[0];
            }

            var isReady = playerNumber === PLAYER_NUMBER.FIRST ? _this.state.isFirstPlayerFileReadyToPlay : _this.state.isSecondPlayerFileReadyToPlay;
            return _react2.default.createElement(_music_file_player2.default, {
                ref: function ref(_ref) {
                    return _this["player_" + playerNumber] = _ref;
                },
                playerNumber: playerNumber,
                fileUrl: fileToPlay.url,
                fileDownloadUrl: fileToPlay.fileDownloadUrl,
                saveAsFileName: fileToPlay.saveAsFileName,
                isHidden: _this.state.playerPlaying !== playerNumber,
                isPlaying: _this.state.playerPlaying === playerNumber && !_this.state.isPaused && isReady,
                isPaused: _this.state.isPaused,
                onError: _this.onError,
                onReadyChanged: _this.setPlayerReady,
                onFinish: _this.onFinishedPlayingFile,
                onPosChange: _this.onPosChange,
                onStartedPlaying: _this.onStartedPlaying,
                toggleIsPaused: _this.toggleIsPaused,
                playerSpeed: _this.state.playerSpeed,
                isRepeatOne: _this.state.repeatOne,
                onTogglePlayerSpeed: _this.togglePlayerSpeed,
                shouldNormalizePlayerWaveBars: _this.state.shouldNormalizePlayerWaveBars,
                toggleNormalizePlayerWaveBars: _this.toggleNormalizePlayerWaveBars,
                onRepeatClicked: _this.onRepeatClicked
            });
        };

        _this.onPosChange = function (relativePosition) {
            //relative position in file 0-1

            var currentFileDuration = _this.state.currentFileDuration;
            var currentPlayingFilePositionInMilli = Math.floor(relativePosition * (currentFileDuration * 1000));

            _this.setState({
                currentPlayingFilePositionInMilli: currentPlayingFilePositionInMilli
            });
        };

        _this.toggleNormalizePlayerWaveBars = function () {
            _this.setState({
                shouldNormalizePlayerWaveBars: !_this.state.shouldNormalizePlayerWaveBars
            });
            _this.props.toggleNormalizeWaveBars();
        };

        _this.togglePlayerSpeed = function () {
            _this.setState({
                playerSpeed: _this.state.playerSpeed === _consts2.default.PLAYER_SPEED.x1_2 ? _consts2.default.PLAYER_SPEED.x1 : _consts2.default.PLAYER_SPEED.x1_2
            });
        };

        _this.initialState = { // used to rest component state
            indexFirstPlayerIsPlaying: 0,
            indexSecondPlayerIsPlaying: 1,
            playerPlaying: PLAYER_NUMBER.FIRST,
            isFirstPlayerFileReadyToPlay: false,
            isSecondPlayerFileReadyToPlay: false,
            isPaused: false,
            currentPlayingFilePositionInMilli: 0, //how many milliseconds into the file
            currentFileDuration: 0,

            playerSpeed: props.shouldPlayHalfSpeed ? _consts2.default.PLAYER_SPEED.x1_2 : _consts2.default.PLAYER_SPEED.x1,
            shouldNormalizePlayerWaveBars: !!props.shouldNormalizePlayerWaveBars,
            repeatOne: !!props.shouldRepeatOne
        };
        // this.repeatOne = false;
        _this.state = _extends({}, _this.initialState);
        // this.firstPositionSec = 0; // Player position. Is outside of state to prevent render on every change
        // this.secondPositionSec = 0; // Player position. Is outside of state to prevent render on every change
        return _this;
    }

    _createClass(MusicPlayer, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.isLoading || this.props.filesToPlay.length !== 0 && !_lodash2.default.isEqual(this.props.filesToPlay, nextProps.filesToPlay)) {
                this.setState(this.initialState);
                // this.firstPositionSec = 0;
                // this.secondPositionSec = 0;
            }
            this.setState({
                playerSpeed: nextProps.shouldPlayHalfSpeed ? _consts2.default.PLAYER_SPEED.x1_2 : _consts2.default.PLAYER_SPEED.x1,
                shouldNormalizePlayerWaveBars: !!nextProps.shouldNormalizePlayerWaveBars,
                repeatOne: !!nextProps.shouldRepeatOne
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.props.isShow) {
                return _react2.default.createElement("div", null);
            }
            var backgroundStyle = {
                height: '114px',
                background: '#3D4145'
            };
            var foregroundStyle = {
                'display': 'flex',
                'alignItems': 'center',
                'justifyContent': 'center'
            };

            var isFilesSuppliedToComponent = this.props.filesToPlay.length > 0;
            var isNoMoreFilesToPlay = this.state.playerPlaying === PLAYER_NUMBER.FIRST && this.state.indexFirstPlayerIsPlaying >= this.props.filesToPlay.length || this.state.playerPlaying === PLAYER_NUMBER.SECOND && this.state.indexSecondPlayerIsPlaying >= this.props.filesToPlay.length;
            var isSomeFileNotReadyToPlay = this.state.playerPlaying === PLAYER_NUMBER.FIRST && !this.state.isFirstPlayerFileReadyToPlay || this.state.playerPlaying === PLAYER_NUMBER.SECOND && !this.state.isSecondPlayerFileReadyToPlay;
            var isShowLoader = this.props.isLoading || isSomeFileNotReadyToPlay;
            var currentFileStartTime = isNoMoreFilesToPlay ? 0 : // not relevant if finished playing
            this.state.playerPlaying === PLAYER_NUMBER.FIRST ? this.props.filesToPlay[this.state.indexFirstPlayerIsPlaying].startTime : this.props.filesToPlay[this.state.indexSecondPlayerIsPlaying].startTime;
            var isReady = this.state.playerPlaying === PLAYER_NUMBER.FIRST ? this.state.isFirstPlayerFileReadyToPlay : this.state.isSecondPlayerFileReadyToPlay;
            console.log("playerPlaying: " + this.state.playerPlaying + "  isPaused:" + this.state.isPaused + "  isReady:" + isReady);
            return _react2.default.createElement(
                _custom_loader2.default,
                {
                    priority: 8,
                    loading: isShowLoader,
                    backgroundStyle: backgroundStyle,
                    foregroundStyle: foregroundStyle,
                    isRenderChildrenWhileShowing: true },
                !this.props.isLoading && isFilesSuppliedToComponent && _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "div",
                        { className: _music_player2.default.playerAreaContainer },
                        _react2.default.createElement(
                            "div",
                            { className: _music_player2.default.playerContainer },
                            this.createPlayer(PLAYER_NUMBER.FIRST),
                            this.createPlayer(PLAYER_NUMBER.SECOND)
                        ),
                        _react2.default.createElement(_hoverable_button2.default, {
                            restImageSrc: _player_close2.default,
                            activeImageSrc: _player_close_active2.default,
                            imgClassName: _music_player2.default.closeBtn,
                            wrappingDivClassName: _music_player2.default.closeBtnWrapper,
                            onClick: this.props.onUserClosedPlayer })
                    ),
                    _react2.default.createElement(_player_digital_clock2.default, {
                        shouldPauseTime: this.state.isPaused || !isReady,
                        startTime: currentFileStartTime,
                        shouldShowTimestamp: true,
                        positionInMilli: this.state.currentPlayingFilePositionInMilli,
                        durationInSeconds: this.state.currentFileDuration,
                        label: this.props.labelForPlayer,
                        clockTimezone: this.props.clockTimezone,
                        onStartTimeCopiedToClipboard: this.props.onStartTimeCopiedToClipboard
                    })
                ),
                this.props.isLoading && _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(_hoverable_button2.default, {
                            restImageSrc: _player_close2.default,
                            activeImageSrc: _player_close_active2.default,
                            imgClassName: _music_player2.default.loadingCloseBtn,
                            wrappingDivClassName: _music_player2.default.loadingCloseBtnWrapper,
                            onClick: this.props.onUserClosedPlayer })
                    ),
                    _react2.default.createElement("div", { className: _music_player2.default.emptyLoader })
                )
            );
        }
    }]);

    return MusicPlayer;
}(_react.Component);

MusicPlayer.defaultProps = {
    isShow: false,
    isLoading: false,
    filesToPlay: [], // file_example =  url, startTime, fileDownloadUrl, saveAsFileName
    labelForPlayer: '',
    shouldNormalizePlayerWaveBars: false,
    shouldPlayHalfSpeed: false,
    onUserClosedPlayer: function onUserClosedPlayer() {},
    onFilePlayingChanged: function onFilePlayingChanged() {},
    onFinishedPlaylist: function onFinishedPlaylist() {},
    onErrorPlayingFile: function onErrorPlayingFile() {},
    toggleNormalizeWaveBars: function toggleNormalizeWaveBars() {},
    toggleRepeatOne: function toggleRepeatOne() {},
    onStartTimeCopiedToClipboard: function onStartTimeCopiedToClipboard() {}
};

MusicPlayer.propTypes = {
    isShow: _propTypes2.default.bool.isRequired,
    isLoading: _propTypes2.default.bool.isRequired,
    filesToPlay: _propTypes2.default.array.isRequired,
    shouldNormalizePlayerWaveBars: _propTypes2.default.bool,
    shouldPlayHalfSpeed: _propTypes2.default.bool,
    shouldRepeatOne: _propTypes2.default.bool,
    labelForPlayer: _propTypes2.default.string,
    clockTimezone: _propTypes2.default.string,

    onFilePlayingChanged: _propTypes2.default.func,
    onFinishedPlaylist: _propTypes2.default.func,
    onUserClosedPlayer: _propTypes2.default.func,
    toggleNormalizeWaveBars: _propTypes2.default.func,
    toggleRepeatOne: _propTypes2.default.func,
    onErrorPlayingFile: _propTypes2.default.func,
    onStartTimeCopiedToClipboard: _propTypes2.default.func
};

exports.default = MusicPlayer;

/***/ }),

/***/ 213:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNyI+CiAgICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC4zOTQgOC44MDhsNi4wMjQtNi4wMjRhLjk4Ljk4IDAgMCAwIDAtMS4zODRsLS4yMTgtLjIxNWEuOTgzLjk4MyAwIDAgMC0xLjM4NCAwTDguNzk0IDcuMjA4IDIuNzY4IDEuMTgyYS45OC45OCAwIDAgMC0xLjM4MiAwbC0uMjE4LjIxOGEuOTg2Ljk4NiAwIDAgMCAuMDAxIDEuMzg2bDYuMDIyIDYuMDIyLTYuMDIzIDYuMDI1YS45ODMuOTgzIDAgMCAwIDAgMS4zODRsLjIxOC4yMTdhLjk4Mi45ODIgMCAwIDAgMS4zODIgMGw2LjAyNi02LjAyNSA2LjAyNCA2LjAyNWEuOTg0Ljk4NCAwIDAgMCAxLjM4NCAwbC4yMTYtLjIxOWEuOTc4Ljk3OCAwIDAgMCAwLTEuMzgybC02LjAyNC02LjAyNXoiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 214:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTEuOTk5cHgiIGhlaWdodD0iMTEuOTk5cHgiIHZpZXdCb3g9IjAgMCAxMS45OTkgMTEuOTk5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMS45OTkgMTEuOTk5IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjMzhCOEVBIiBkPSJNNy4yMTQsNmw0LjU2OS00LjU2OWMwLjI4OC0wLjI4OCwwLjI4OC0wLjc2Mi0wLjAwMS0xLjA1bC0wLjE2NS0wLjE2NGMtMC4yODktMC4yODgtMC43NjItMC4yODgtMS4wNSwwDQoJCQlMNiw0Ljc4NUwxLjQzMSwwLjIxNmMtMC4yODktMC4yODgtMC43NjEtMC4yODgtMS4wNSwwTDAuMjE3LDAuMzgxYy0wLjI4OCwwLjI5LTAuMjg4LDAuNzYyLDAuMDAxLDEuMDUxbDQuNTY3LDQuNTY3bC00LjU2OCw0LjU2OQ0KCQkJYy0wLjI4OSwwLjI5LTAuMjg5LDAuNzYzLDAsMS4wNTFsMC4xNjQsMC4xNjRjMC4yODgsMC4yODgsMC43NjEsMC4yODgsMS4wNSwwTDYsNy4yMTRsNC41NjksNC41NjkNCgkJCWMwLjI4OCwwLjI4OCwwLjc2LDAuMjg4LDEuMDQ5LDBsMC4xNjQtMC4xNjVjMC4yODktMC4yODgsMC4yODktMC43NjIsMC0xLjA1TDcuMjE0LDZ6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(216);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(17)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./music_player.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./music_player.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, ".music_player__playerContainer___1Kb1K {\n    width: calc(100% - 15px);\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    height: 94px;\n}\n.music_player__playerAreaContainer___1i-a6{\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.music_player__emptyLoader___2AVsC {\n    min-height: 114px;\n}\n\n.music_player__rowContent___2yK48 {\n    width: 100%;\n    display: inline-block;\n}\n\n.music_player__waveRowContainer___bHrlg {\n    text-align: left;\n    height: 94px;\n    width: 100%;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-pack: center;\n        justify-content: center;\n}\n\n.music_player__waveRowLeft___15jUh {\n    text-align: center;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -ms-flex-direction: row-reverse;\n        flex-direction: row-reverse;\n    -ms-flex-align: center;\n        align-items: center;\n    width: 9%;\n    margin-right: 0.5%;\n}\n\n.music_player__repeatImageContainer___1KDIh {\n    position: relative;\n    width: 24px;\n    height: 18px;\n    margin-right: 14%;\n}\n\n.music_player__halfSpeedBtnContainer___2Kbcb {\n    width: 30px;\n    height: 15px;\n    margin-right: 8%;\n}\n\n.music_player__hoverableBooButtonOverride___2HEGh {\n    height: 100%;\n}\n\n.music_player__waveRowRight___3DC4Q {\n    text-align: center;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-align: start;\n        align-items: flex-start;\n    padding-top: 15px;\n    width: 8%;\n    height: 100%;\n}\n\n.music_player__waveRowMiddle___2RQgu {\n    text-align: center;\n    display: inline-block;\n    width: 82.5%;\n}\n\n.music_player__middleDiv___30Tw3 {\n    /*height: 3.125vh*/\n}\n\n.music_player__deviceText___2BtWj {\n    color: #ffffff;\n    font-size: 13px;\n    /*margin-top: 0.9765625vh;*/\n    margin-bottom: 0.9765625vh;\n    text-transform: capitalize;\n}\n\n.music_player__inlineBlockCtrl___2gAWc {\n    display: inline-block;\n    vertical-align: middle;\n    margin-right: 1%;\n}\n\n.music_player__playDownloadButtonsWrapper___3YgOd {\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    vertical-align: middle;\n    margin-right: 1%;\n}\n\n.music_player__btnPlayPause___2iIRv {\n    width: 23px;\n    min-width: 23px;\n    height: 24px;\n}\n\n.music_player__btnDownload___2Nsu_ {\n    position: relative;\n    right: 20px;\n}\n\n.music_player__wave___1hF9N {\n    width: 80%;\n}\n\n.music_player__rightSideButtons___2jdP4 {\n    right: 2.3%\n}\n.music_player__closeBtn___1_5_3{\n    height: 15px !important;\n    margin: 0 !important;\n}\n.music_player__closeBtnWrapper___QgvWw{\n    width: 15px;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    z-index: 1 !important;\n    margin-right: 10px;\n    margin-top: 10px;\n}\n\n.music_player__loadingCloseBtn___2Sqkk{\n    height: 15px !important;\n    margin: 0 !important;\n    z-index: 11;\n}\n.music_player__loadingCloseBtnWrapper___25Dxu{\n    width: 15px;\n    float: right;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    z-index: 1 !important;\n    margin-right: 10px;\n    margin-top: 10px;\n}\n\n.music_player__morePlayerBtn___bnnmV {\n    padding-top: 5.5px;\n    padding-bottom: 5.5px;\n    margin-right: 15%;\n    width: 22px;\n    height: 17px;\n}\n\n.music_player__digitalClock___2pSTa {\n    margin-top: 0.9765625vh;\n    /*margin-bottom: 0.9765625vh;*/\n    /*height: 3.125vh;*/\n}\n\n.music_player__thingName___2Ew6c {\n    /*height: 1.5625vh;*/\n}\n\n.music_player__hidePlayer___pmEUc {\n    display: none;\n}\n\n", ""]);

// exports
exports.locals = {
	"playerContainer": "music_player__playerContainer___1Kb1K",
	"playerAreaContainer": "music_player__playerAreaContainer___1i-a6",
	"emptyLoader": "music_player__emptyLoader___2AVsC",
	"rowContent": "music_player__rowContent___2yK48",
	"waveRowContainer": "music_player__waveRowContainer___bHrlg",
	"waveRowLeft": "music_player__waveRowLeft___15jUh",
	"repeatImageContainer": "music_player__repeatImageContainer___1KDIh",
	"halfSpeedBtnContainer": "music_player__halfSpeedBtnContainer___2Kbcb",
	"hoverableBooButtonOverride": "music_player__hoverableBooButtonOverride___2HEGh",
	"waveRowRight": "music_player__waveRowRight___3DC4Q",
	"waveRowMiddle": "music_player__waveRowMiddle___2RQgu",
	"middleDiv": "music_player__middleDiv___30Tw3",
	"deviceText": "music_player__deviceText___2BtWj",
	"inlineBlockCtrl": "music_player__inlineBlockCtrl___2gAWc",
	"playDownloadButtonsWrapper": "music_player__playDownloadButtonsWrapper___3YgOd",
	"btnPlayPause": "music_player__btnPlayPause___2iIRv",
	"btnDownload": "music_player__btnDownload___2Nsu_",
	"wave": "music_player__wave___1hF9N",
	"rightSideButtons": "music_player__rightSideButtons___2jdP4",
	"closeBtn": "music_player__closeBtn___1_5_3",
	"closeBtnWrapper": "music_player__closeBtnWrapper___QgvWw",
	"loadingCloseBtn": "music_player__loadingCloseBtn___2Sqkk",
	"loadingCloseBtnWrapper": "music_player__loadingCloseBtnWrapper___25Dxu",
	"morePlayerBtn": "music_player__morePlayerBtn___bnnmV",
	"digitalClock": "music_player__digitalClock___2pSTa",
	"thingName": "music_player__thingName___2Ew6c",
	"hidePlayer": "music_player__hidePlayer___pmEUc"
};

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactLoaderAdvanced = __webpack_require__(219);

var _reactLoaderAdvanced2 = _interopRequireDefault(_reactLoaderAdvanced);

var _reactLoading = __webpack_require__(289);

var _reactLoading2 = _interopRequireDefault(_reactLoading);

var _custom_loader = __webpack_require__(290);

var _custom_loader2 = _interopRequireDefault(_custom_loader);

var _classnames = __webpack_require__(30);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by oferaffias on 21/12/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CustomLoader = function (_Component) {
    _inherits(CustomLoader, _Component);

    function CustomLoader(props) {
        _classCallCheck(this, CustomLoader);

        var _this = _possibleConstructorReturn(this, (CustomLoader.__proto__ || Object.getPrototypeOf(CustomLoader)).call(this, props));

        _this.render = function () {
            var spinner = _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_reactLoading2.default, { type: 'bars', color: '#0da9f6' })
            );
            var childrenDivClasses = (0, _classnames2.default)(_defineProperty({}, _custom_loader2.default.invisible, !_this.props.isRenderChildrenWhileShowing && _this.props.loading));
            var loaderHeightStyle = _this.props.hasOwnProperty('defaultLoaderHeight') ? { height: _this.props.defaultLoaderHeight } : {};
            return _react2.default.createElement(
                _reactLoaderAdvanced2.default,
                {
                    priority: _this.props.priority || 0,
                    show: _this.state.isLoading,
                    backgroundStyle: _this.props.backgroundStyle,
                    foregroundStyle: _this.props.foregroundStyle,
                    hideContentOnLoad: false,
                    message: spinner },
                _this.props.loading && !_this.props.isRenderChildrenWhileShowing ? _react2.default.createElement('div', { style: loaderHeightStyle }) : _react2.default.createElement(
                    'div',
                    { className: childrenDivClasses },
                    _this.props.children
                )
            );
        };

        _this.state = {
            isLoading: props.loading
        };
        _this.setIsLoading = _this.setIsLoading.bind(_this);
        return _this;
    }

    _createClass(CustomLoader, [{
        key: 'setIsLoading',
        value: function setIsLoading(isLoading) {
            this.setState({
                isLoading: isLoading
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.loading !== this.state.isLoading) {
                this.setState({
                    isLoading: nextProps.loading
                });
            }
        }
    }]);

    return CustomLoader;
}(_react.Component);

CustomLoader.propTypes = {
    priority: _propTypes2.default.number,
    loading: _propTypes2.default.bool,
    backgroundStyle: _propTypes2.default.object,
    defaultLoaderHeight: _propTypes2.default.string,
    foregroundStyle: _propTypes2.default.object,
    isRenderChildrenWhileShowing: _propTypes2.default.bool,
    children: _propTypes2.default.node
};

exports.default = CustomLoader;

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(291);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(17)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./custom_loader.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./custom_loader.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, ".custom_loader__invisible___1dil5{\n  visibility: hidden;\n}\n", ""]);

// exports
exports.locals = {
	"invisible": "custom_loader__invisible___1dil5"
};

/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _wavesurfer = __webpack_require__(293);

var _wavesurfer2 = _interopRequireDefault(_wavesurfer);

var _play = __webpack_require__(294);

var _play2 = _interopRequireDefault(_play);

var _pause = __webpack_require__(295);

var _pause2 = _interopRequireDefault(_pause);

var _playOnceRest = __webpack_require__(296);

var _playOnceRest2 = _interopRequireDefault(_playOnceRest);

var _playOnceHoverAndActive = __webpack_require__(297);

var _playOnceHoverAndActive2 = _interopRequireDefault(_playOnceHoverAndActive);

var _slowMotionRest = __webpack_require__(298);

var _slowMotionRest2 = _interopRequireDefault(_slowMotionRest);

var _slowMotionHoverAndActive = __webpack_require__(299);

var _slowMotionHoverAndActive2 = _interopRequireDefault(_slowMotionHoverAndActive);

var _more = __webpack_require__(300);

var _more2 = _interopRequireDefault(_more);

var _moreHoverAndActive = __webpack_require__(301);

var _moreHoverAndActive2 = _interopRequireDefault(_moreHoverAndActive);

var _hoverable_button = __webpack_require__(79);

var _hoverable_button2 = _interopRequireDefault(_hoverable_button);

var _music_file_player = __webpack_require__(340);

var _music_file_player2 = _interopRequireDefault(_music_file_player);

var _classnames = __webpack_require__(30);

var _classnames2 = _interopRequireDefault(_classnames);

var _player_more_menu = __webpack_require__(342);

var _player_more_menu2 = _interopRequireDefault(_player_more_menu);

var _consts = __webpack_require__(55);

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Asaf Pinhassi on 30/11/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MusicFilePlayer = function (_Component) {
    _inherits(MusicFilePlayer, _Component);

    function MusicFilePlayer(props) {
        _classCallCheck(this, MusicFilePlayer);

        var _this = _possibleConstructorReturn(this, (MusicFilePlayer.__proto__ || Object.getPrototypeOf(MusicFilePlayer)).call(this, props));

        _initialiseProps.call(_this);

        _this.isStartedPlayingYet = false;
        return _this;
    }

    _createClass(MusicFilePlayer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.createPlayer(this.props);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.wavesurfer.destroy();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var playerPlayingChanged = this.props.isPlaying !== nextProps.isPlaying;
            if (playerPlayingChanged) {
                if (nextProps.isPlaying) {
                    this.wavesurfer.play();
                } else {
                    this.wavesurfer.pause();
                }
            }
            if (this.props.fileUrl !== nextProps.fileUrl) {
                this.isStartedPlayingYet = false;
                this.props.onReadyChanged(this.props.playerNumber, false);
                this.wavesurfer.load(nextProps.fileUrl);
            }
            var shouldNormalizePlayerWaveBarsChanged = this.props.shouldNormalizePlayerWaveBars !== nextProps.shouldNormalizePlayerWaveBars;
            var playerSettingsChanged = shouldNormalizePlayerWaveBarsChanged;
            if (playerSettingsChanged) {
                this.createPlayer(nextProps);
            }
            var playerSpeedChanged = this.props.playerSpeed !== nextProps.playerSpeed;
            if (playerSpeedChanged) {
                this.wavesurfer.setPlaybackRate(nextProps.playerSpeed === _consts2.default.PLAYER_SPEED.x1_2 ? 0.5 : 1);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            // if (this.props.playerNumber === 'FIRST')
            //     console.log(`first player isPlaying: ${this.props.isPlaying}`);
            var hiddenClass = (0, _classnames2.default)(_defineProperty({}, _music_file_player2.default.hidePlayer, this.props.isHidden), _music_file_player2.default.hovering);
            var fileDownloadUrl = this.props.fileDownloadUrl ? this.props.fileDownloadUrl : this.props.fileUrl;
            return _react2.default.createElement(
                "div",
                { className: hiddenClass },
                _react2.default.createElement(
                    "div",
                    { className: _music_file_player2.default.playerContainer },
                    _react2.default.createElement(_hoverable_button2.default, {
                        tooltip: "Play once",
                        restImageSrc: _playOnceRest2.default,
                        activeImageSrc: _playOnceHoverAndActive2.default,
                        onClick: this.props.onRepeatClicked,
                        isActive: this.props.isRepeatOne,
                        imgClassName: _music_file_player2.default.repeatImg,
                        wrappingDivClassName: _music_file_player2.default.repeatImageContainer
                    }),
                    _react2.default.createElement(_hoverable_button2.default, {
                        tooltip: "Play sound in slow motion",
                        restImageSrc: _slowMotionRest2.default,
                        activeImageSrc: _slowMotionHoverAndActive2.default,
                        onClick: this.props.onTogglePlayerSpeed,
                        isActive: this.props.playerSpeed === _consts2.default.PLAYER_SPEED.x1_2,
                        wrappingDivClassName: _music_file_player2.default.halfSpeedBtnContainer,
                        imgClassName: _music_file_player2.default.halfSpeedImg
                    }),
                    _react2.default.createElement("img", { src: this.props.isPaused ? _play2.default : _pause2.default,
                        onClick: function onClick() {
                            return _this2.props.toggleIsPaused(!_this2.props.isPaused);
                        },
                        className: _music_file_player2.default.btnPlayPause }),
                    _react2.default.createElement("div", {
                        className: _music_file_player2.default.waveform,
                        id: "waveform" + this.props.playerNumber }),
                    _react2.default.createElement(_hoverable_button2.default, {
                        restImageSrc: _more2.default,
                        activeImageSrc: _moreHoverAndActive2.default,
                        onClick: this.onMoreClicked,
                        isActive: this.state.isMoreMenuOpen,
                        imgClassName: _music_file_player2.default.moreBtn,
                        wrappingDivClassName: _music_file_player2.default.moreBtnContainer
                    })
                ),
                this.state.isMoreMenuOpen && _react2.default.createElement(_player_more_menu2.default, {
                    onClickOutsideMenu: function onClickOutsideMenu() {
                        return _this2.onMoreClicked(false);
                    },
                    downloadUrl: fileDownloadUrl,
                    saveAsFileName: "" + this.props.saveAsFileName,
                    shouldNormalizePlayerWaveBars: this.props.shouldNormalizePlayerWaveBars,
                    toggleNormalizePlayerWaveBars: this.props.toggleNormalizePlayerWaveBars,
                    flacFileStatus: this.state.flacFileStatus
                })
            );
        }
    }]);

    return MusicFilePlayer;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.state = { // used to rest component state
        isMoreMenuOpen: false,
        flacFileStatus: _consts2.default.REMOTE_FILE_STATUS.EXIST
    };

    this.createPlayer = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.props;

        _this3.props.onReadyChanged(_this3.props.playerNumber, false);
        if (_this3.wavesurfer) {
            _this3.wavesurfer.destroy();
        }
        _this3.wavesurferOptions = {
            container: "#waveform" + props.playerNumber,
            progressColor: '#4EBAF6',
            waveColor: '#6D747B',
            cursorWidth: 0,
            height: 70,
            normalize: props.shouldNormalizePlayerWaveBars,
            audioRate: props.playerSpeed,
            hideScrollbar: true,
            responsive: true
        };
        _this3.wavesurfer = _wavesurfer2.default.create(_this3.wavesurferOptions);
        var waveSurferEvents = {
            'error': function error() {
                _this3.props.onReadyChanged(_this3.props.playerNumber, false);
                props.onError(props.fileUrl);
            },

            'ready': function ready() {
                props.onReadyChanged(props.playerNumber, true);
                //                setTimeout(() => props.onReadyChanged(props.playerNumber,true), 1000) //timeout fixes problem in safari where seek doesn't work properly
            },

            'finish': function finish() {
                props.onFinish(props.playerNumber);
            },

            'waveform-ready': function waveformReady() {},

            'seek': function seek(relativePosition) {
                //relative position in file 0-1
                props.onPosChange(relativePosition, props.playerNumber);
            },

            'play': function play() {
                if (!_this3.isStartedPlayingYet) {
                    _this3.isStartedPlayingYet = true;
                    props.onStartedPlaying(_this3.wavesurfer.getDuration());
                }
            }
        };
        Object.entries(waveSurferEvents).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                eventName = _ref2[0],
                handler = _ref2[1];

            _this3.wavesurfer.on(eventName, handler);
        });
        _this3.wavesurfer.load(props.fileUrl);
    };

    this.onMoreClicked = function () {
        _this3.props.toggleIsPaused(true);
        _this3.setState(function (prevState) {
            return {
                isMoreMenuOpen: !prevState.isMoreMenuOpen
            };
        });
    };
};

MusicFilePlayer.propTypes = {
    playerNumber: _propTypes2.default.string.isRequired,
    fileUrl: _propTypes2.default.string.isRequired,
    fileDownloadUrl: _propTypes2.default.string,
    saveAsFileName: _propTypes2.default.string,
    isHidden: _propTypes2.default.bool.isRequired,
    isPlaying: _propTypes2.default.bool.isRequired,
    isPaused: _propTypes2.default.bool.isRequired,
    onError: _propTypes2.default.func.isRequired,
    onReadyChanged: _propTypes2.default.func.isRequired,
    onFinish: _propTypes2.default.func.isRequired,
    onPosChange: _propTypes2.default.func.isRequired,
    onStartedPlaying: _propTypes2.default.func.isRequired,
    toggleIsPaused: _propTypes2.default.func.isRequired,
    shouldNormalizePlayerWaveBars: _propTypes2.default.bool.isRequired,
    toggleNormalizePlayerWaveBars: _propTypes2.default.func.isRequired,
    playerSpeed: _propTypes2.default.number.isRequired,
    onTogglePlayerSpeed: _propTypes2.default.func.isRequired,
    onRepeatClicked: _propTypes2.default.func.isRequired,
    isRepeatOne: _propTypes2.default.bool.isRequired

};

exports.default = MusicFilePlayer;

/***/ }),

/***/ 294:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTAuOTc5cHgiIGhlaWdodD0iMTEuOTk5cHgiIHZpZXdCb3g9IjAgMCAxMC45NzkgMTEuOTk5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMC45NzkgMTEuOTk5IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMC43OTgsNi4yMzljMC4yNDEtMC4xMzIsMC4yNDEtMC4zNDgsMC0wLjQ3OUwwLjQzNywwLjA1NUMwLjE5NS0wLjA3NywwLDAuMDM5LDAsMC4zMXYxMS4zOA0KCWMwLDAuMjcxLDAuMTk1LDAuMzg3LDAuNDM3LDAuMjU1TDEwLjc5OCw2LjIzOXoiLz4NCjwvc3ZnPg0K"

/***/ }),

/***/ 295:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTIuMDA5cHgiIGhlaWdodD0iMTIuMDA5cHgiIHZpZXdCb3g9IjAgMCAxMi4wMDkgMTIuMDA5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMi4wMDkgMTIuMDA5IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMi4wMDksMC41YzAtMC4yNzMtMC4yMjctMC41LTAuNTAyLTAuNUg3LjUwNWMtMC4yNzMsMC0wLjUsMC4yMjctMC41LDAuNXYxMS4wMDgNCgljMCwwLjI3NCwwLjIyNywwLjUwMSwwLjUsMC41MDFoNC4wMDJjMC4yNzUsMCwwLjUwMi0wLjIyNywwLjUwMi0wLjUwMVYwLjV6IE01LjAwMywwLjVjMC0wLjI3My0wLjIyNy0wLjUtMC41LTAuNUgwLjUwMQ0KCUMwLjIyNywwLDAsMC4yMjcsMCwwLjV2MTEuMDA4YzAsMC4yNzQsMC4yMjcsMC41MDEsMC41MDEsMC41MDFoNC4wMDJjMC4yNzMsMCwwLjUtMC4yMjcsMC41LTAuNTAxVjAuNXoiLz4NCjwvc3ZnPg0K"

/***/ }),

/***/ 296:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIyMiI+CiAgICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMC4xODYgOS43NTVjLS4zIDAtLjU0MS0uMS0uNzIzLS4zMDItLjE4MS0uMjAxLS4yNzItLjQ5OS0uMjcyLS44OTJWMy45ODhjLTEuMjQ5Ljk1OS0yLjA5IDEuNDM4LTIuNTIzIDEuNDM4YS43NDQuNzQ0IDAgMCAxLS41NDktLjI0Ny43OTYuNzk2IDAgMCAxLS4yNC0uNTcxYzAtLjI1MS4wNzktLjQzNS4yMzYtLjU1My4xNTgtLjExOC40MzUtLjI3MS44MzQtLjQ1Ny41OTUtLjI4IDEuMDctLjU3NSAxLjQyNy0uODg1LjM1Ni0uMzEuNjcyLS42NTYuOTQ3LTEuMDM5LjI3Ni0uMzg0LjQ1NS0uNjE5LjUzOS0uNzA4LjA4My0uMDg4LjI0MS0uMTMzLjQ3Mi0uMTMzLjI2IDAgLjQ2OS4xMDEuNjI3LjMwMy4xNTcuMjAxLjIzNi40NzkuMjM2LjgzM3Y2LjMwNWMwIC45ODgtLjMzNyAxLjQ4MS0xLjAxMSAxLjQ4MXptLTguMjM0IDEuMTYybC0uMDA2LjAwN2ExLjAyIDEuMDIgMCAwIDEtMS41NTEtMS4zMjVMMjIgNy43MjRINS40MDljLTEuMzU2IDAtMi4wMzQuOTc3LTIuMDM0IDIuMDMzVjExLjMxMWExLjAxNiAxLjAxNiAwIDEgMS0yLjAzNC0uMDI5VjkuNzU3YzAtMi4wNjQgMS42NDQtNC4wNjYgNC4wNjgtNC4wNjZIMjJsLTEuNjA1LTEuODlhMS4wMTcgMS4wMTcgMCAwIDEgLjY1MS0xLjY4NGMuMzQ1LS4wNC42ODYuMDk3LjkwNi4zNjVsMy4wNTEgMy41NThjLjMyNC4zOC4zMjQuOTM5IDAgMS4zMTlsLTMuMDUxIDMuNTU4ek01LjE1OSAxNi44NzRhMi41NDIgMi41NDIgMCAxIDEtNS4wODMtLjAwMSAyLjU0MiAyLjU0MiAwIDAgMSA1LjA4My4wMDF6bTUuNDI3LTMuNzAybC4wMDYtLjAwN2ExLjAyIDEuMDIgMCAwIDEgMS41NTEgMS4zMjZsLTEuNjA1IDEuODc0aDE2LjU5YzEuMzU2IDAgMi4wMzQtLjk3NyAyLjAzNC0yLjAzM3YtMS41MjUtLjAyOWExLjAxNyAxLjAxNyAwIDAgMSAyLjAzNC4wMjl2MS41MjVjMCAyLjA2NC0xLjY0MyA0LjA2Ni00LjA2OCA0LjA2NmgtMTYuNTlsMS42MDUgMS44OTFhMS4wMTUgMS4wMTUgMCAwIDEtLjY1MiAxLjY4MyAxLjAxNSAxLjAxNSAwIDAgMS0uOTA1LS4zNjVsLTMuMDUyLTMuNTU4YTEuMDE5IDEuMDE5IDAgMCAxIDAtMS4zMTlsMy4wNTItMy41NTh6Ii8+Cjwvc3ZnPgo="

/***/ }),

/***/ 297:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIyMiI+CiAgICA8cGF0aCBmaWxsPSIjNTJCOEYwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMC4xODYgOS43NTVjLS4zIDAtLjU0MS0uMS0uNzIzLS4zMDItLjE4MS0uMjAxLS4yNzItLjQ5OS0uMjcyLS44OTJWMy45ODhjLTEuMjQ5Ljk1OS0yLjA5IDEuNDM4LTIuNTIzIDEuNDM4YS43NDQuNzQ0IDAgMCAxLS41NDktLjI0Ny43OTYuNzk2IDAgMCAxLS4yNC0uNTcxYzAtLjI1MS4wNzktLjQzNS4yMzYtLjU1My4xNTgtLjExOC40MzUtLjI3MS44MzQtLjQ1Ny41OTUtLjI4IDEuMDctLjU3NSAxLjQyNy0uODg1LjM1Ni0uMzEuNjcyLS42NTYuOTQ3LTEuMDM5LjI3Ni0uMzg0LjQ1NS0uNjE5LjUzOS0uNzA4LjA4My0uMDg4LjI0MS0uMTMzLjQ3Mi0uMTMzLjI2IDAgLjQ2OS4xMDEuNjI3LjMwMy4xNTcuMjAxLjIzNi40NzkuMjM2LjgzM3Y2LjMwNWMwIC45ODgtLjMzNyAxLjQ4MS0xLjAxMSAxLjQ4MXptLTguMjM0IDEuMTYybC0uMDA2LjAwN2ExLjAyIDEuMDIgMCAwIDEtMS41NTEtMS4zMjVMMjIgNy43MjRINS40MDljLTEuMzU2IDAtMi4wMzQuOTc3LTIuMDM0IDIuMDMzVjExLjMxMWExLjAxNiAxLjAxNiAwIDEgMS0yLjAzNC0uMDI5VjkuNzU3YzAtMi4wNjQgMS42NDQtNC4wNjYgNC4wNjgtNC4wNjZIMjJsLTEuNjA1LTEuODlhMS4wMTcgMS4wMTcgMCAwIDEgLjY1MS0xLjY4NGMuMzQ1LS4wNC42ODYuMDk3LjkwNi4zNjVsMy4wNTEgMy41NThjLjMyNC4zOC4zMjQuOTM5IDAgMS4zMTlsLTMuMDUxIDMuNTU4ek01LjE1OSAxNi44NzRhMi41NDIgMi41NDIgMCAxIDEtNS4wODMtLjAwMSAyLjU0MiAyLjU0MiAwIDAgMSA1LjA4My4wMDF6bTUuNDI3LTMuNzAybC4wMDYtLjAwN2ExLjAyIDEuMDIgMCAwIDEgMS41NTEgMS4zMjZsLTEuNjA1IDEuODc0aDE2LjU5YzEuMzU2IDAgMi4wMzQtLjk3NyAyLjAzNC0yLjAzM3YtMS41MjUtLjAyOWExLjAxNyAxLjAxNyAwIDAgMSAyLjAzNC4wMjl2MS41MjVjMCAyLjA2NC0xLjY0MyA0LjA2Ni00LjA2OCA0LjA2NmgtMTYuNTlsMS42MDUgMS44OTFhMS4wMTUgMS4wMTUgMCAwIDEtLjY1MiAxLjY4MyAxLjAxNSAxLjAxNSAwIDAgMS0uOTA1LS4zNjVsLTMuMDUyLTMuNTU4YTEuMDE5IDEuMDE5IDAgMCAxIDAtMS4zMTlsMy4wNTItMy41NTh6Ii8+Cjwvc3ZnPgo="

/***/ }),

/***/ 298:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIxNSI+CiAgICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yOC44NjEgMy40MTVsLTIuNzU4IDMuNjk2IDMuMTEgNC40MzVjLjQ4Ny42OTQuNzMgMS4yMTYuNzMgMS41NjcgMCAuMzU5LS4xNTEuNjY4LS40NTMuOTI3LS4zMDIuMjU5LS42NzYuMzg4LTEuMTIxLjM4OC0uMzk0IDAtLjcyOC0uMTEzLTEtLjMzOC0uMjczLS4yMjYtLjU4Ni0uNTg1LS45MzgtMS4wNzhsLTIuNDkzLTMuNjQ2LTIuNTU2IDMuNjQ2Yy0uMzY5LjUxLS42ODEuODczLS45MzcgMS4wOS0uMjU2LjIxNy0uNTgyLjMyNi0uOTc2LjMyNi0uNDM3IDAtLjgwOC0uMTM2LTEuMTE0LS40MDctLjMwNy0uMjcxLS40Ni0uNTgzLS40Ni0uOTM0IDAtLjM1OS4yMzUtLjg3Mi43MDUtMS41NDFsMy4xMS00LjQzNS0yLjc1Ny0zLjY5NmMtLjQ3OS0uNjA5LS43MTgtMS4xNC0uNzE4LTEuNTkxIDAtLjM1MS4xNDMtLjY1NS40MjgtLjkxNC4yODYtLjI1OS42NTktLjM4OSAxLjEyMS0uMzg5LjQwMyAwIC43MzYuMTEzIDEgLjMzOS4yNjUuMjI1LjU3My41OC45MjYgMS4wNjVsMi4yMjggMy4wMzEgMi4xNjUtMy4wMzFjLjM2MS0uNTAyLjY3NC0uODYxLjkzOC0xLjA3OC4yNjUtLjIxNy41OTQtLjMyNi45ODktLjMyNi40NTMgMCAuODI4LjEyOCAxLjEyNi4zODMuMjk4LjI1NC40NDcuNTYxLjQ0Ny45MiAwIC4yNTktLjA2MS41MDgtLjE4Mi43NDVhNS42NTcgNS42NTcgMCAwIDEtLjU2Ljg0NnptLTE0LjA5OCA5LjU5YS41MzguNTM4IDAgMCAxIC4yNDguNDY2LjYwNi42MDYgMCAwIDEtLjIwMy40NTJjLS4xMzUuMTI4LS4zMzEuMTkyLS41ODkuMTkyaC0zLjkwMmMtLjMgMC0uNTM1LS4wNzItLjcwNi0uMjE1YS42NTUuNjU1IDAgMCAxLS4yNTctLjUxOWMwLS4yMTUuMDc1LS40MTkuMjI1LS42MTNhMy43MSAzLjcxIDAgMCAxIC41ODUtLjU4NmMuMjM5LS4xOTcuNjAyLS40OCAxLjA4OC0uODVsLjczMy0uNTA2Yy40NDYtLjMwNy43NjEtLjU2Mi45NDQtLjc2NWEuOTguOTggMCAwIDAgLjI3NC0uNjcxLjc2Ljc2IDAgMCAwLS4zMS0uNjIyIDEuMTk5IDEuMTk5IDAgMCAwLS43NjktLjI0NmMtLjMzNiAwLS41ODUuMDYyLS43NDYuMTg4LS4xNjIuMTI1LS4zLjMxMi0uNDE0LjU1OWEyLjMxMiAyLjMxMiAwIDAgMS0uMzMzLjU1NWMtLjEwOC4xMjItLjI4MS4xODMtLjUyMS4xODNhLjgxNC44MTQgMCAwIDEtLjUyMi0uMTdjLS4xNDQtLjExMy0uMjE2LS4yNzQtLjIxNi0uNDgzIDAtLjI5OC4xMDItLjYuMzA2LS45MDQuMjA0LS4zMDQuNTE3LS41NTUuOTQtLjc1Mi40MjItLjE5Ni45MzYtLjI5NSAxLjU0Mi0uMjk1LjYyOSAwIDEuMTQ1LjA5IDEuNTQ3LjI2OS40MDEuMTc5LjY5OC40MTcuODkuNzE1LjE5Mi4yOTkuMjg4LjYyMS4yODguOTY3IDAgLjM4OC0uMTE2LjczOS0uMzQ3IDEuMDUxLS4yMy4zMTQtLjU3Mi42MzEtMS4wMjUuOTU0LS40NTIuMzIyLS44NDkuNjAxLTEuMTkxLjgzNi0uMzQyLjIzNi0uNTk0LjQ0OS0uNzU2LjY0aDIuNDkxYy4zMDYgMCAuNTQxLjA1Ny43MDYuMTd6bS0xMC41NzkgMS4xMWMtLjIwNC4zMjgtLjQyNi40OTItLjY2Ni40OTJhLjY5Mi42OTIgMCAwIDEtLjQyMi0uMTU3LjQ4Ny40ODcgMCAwIDEtLjIwNy0uNDA3YzAtLjExOS4wNjMtLjI3MS4xODktLjQ1NkwxMC42MzEgMS40N2MuMTM4LS4yMzkuMjU0LS40MDkuMzQ2LS41MS4wOTMtLjEwMi4yMzYtLjE1Mi40MjgtLjE1Mi4xNzkgMCAuMzIyLjA1Mi40MjcuMTU3YS41NTcuNTU3IDAgMCAxIC4xNTcuNDE1YzAgLjE0NC0uMTA1LjM4Mi0uMzE1LjcxNmwtNy40OSAxMi4wMTl6bS0uNzM4LTYuMzYzYS44Mi44MiAwIDAgMS0uNTkzLS4yMjRjLS4xNTYtLjE0OS0uMjM0LS4zNTUtLjIzNC0uNjE3VjMuMTM0Yy0uODM5LjUxMy0xLjQwNi43Ny0xLjY5OS43N2EuNjk2LjY5NiAwIDAgMS0uNDcyLS4xNzUuNTQxLjU0MSAwIDAgMS0uMjAzLS40MjVjMC0uMzA0LjI3Ni0uNTQyLjgyOC0uNzE1LjM4OS0uMTMyLjcwOC0uMjg3Ljk1Ny0uNDY2YTMuNjUgMy42NSAwIDAgMCAuNjY2LS42MTdjLjE5NC0uMjMzLjM0LS4zOS40MzYtLjQ3LjA5Ni0uMDgxLjIzNy0uMTIxLjQyMi0uMTIxLjIyMiAwIC40MDEuMDczLjUzNS4yMTkuMTM1LjE0Ny4yMDMuMzQ1LjIwMy41OTV2NS4wMDNjMCAuNjgtLjI4MiAxLjAyLS44NDYgMS4wMnoiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 299:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIxNSI+CiAgICA8cGF0aCBmaWxsPSIjNTJCOEYwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yOC44NjEgMy40MTVsLTIuNzU4IDMuNjk2IDMuMTEgNC40MzVjLjQ4Ny42OTQuNzMgMS4yMTYuNzMgMS41NjcgMCAuMzU5LS4xNTEuNjY4LS40NTMuOTI3LS4zMDIuMjU5LS42NzYuMzg4LTEuMTIxLjM4OC0uMzk0IDAtLjcyOC0uMTEzLTEtLjMzOC0uMjczLS4yMjYtLjU4Ni0uNTg1LS45MzgtMS4wNzhsLTIuNDkzLTMuNjQ2LTIuNTU2IDMuNjQ2Yy0uMzY5LjUxLS42ODEuODczLS45MzcgMS4wOS0uMjU2LjIxNy0uNTgyLjMyNi0uOTc2LjMyNi0uNDM3IDAtLjgwOC0uMTM2LTEuMTE0LS40MDctLjMwNy0uMjcxLS40Ni0uNTgzLS40Ni0uOTM0IDAtLjM1OS4yMzUtLjg3Mi43MDUtMS41NDFsMy4xMS00LjQzNS0yLjc1Ny0zLjY5NmMtLjQ3OS0uNjA5LS43MTgtMS4xNC0uNzE4LTEuNTkxIDAtLjM1MS4xNDMtLjY1NS40MjgtLjkxNC4yODYtLjI1OS42NTktLjM4OSAxLjEyMS0uMzg5LjQwMyAwIC43MzYuMTEzIDEgLjMzOS4yNjUuMjI1LjU3My41OC45MjYgMS4wNjVsMi4yMjggMy4wMzEgMi4xNjUtMy4wMzFjLjM2MS0uNTAyLjY3NC0uODYxLjkzOC0xLjA3OC4yNjUtLjIxNy41OTQtLjMyNi45ODktLjMyNi40NTMgMCAuODI4LjEyOCAxLjEyNi4zODMuMjk4LjI1NC40NDcuNTYxLjQ0Ny45MiAwIC4yNTktLjA2MS41MDgtLjE4Mi43NDVhNS42NTcgNS42NTcgMCAwIDEtLjU2Ljg0NnptLTE0LjA5OCA5LjU5YS41MzguNTM4IDAgMCAxIC4yNDguNDY2LjYwNi42MDYgMCAwIDEtLjIwMy40NTJjLS4xMzUuMTI4LS4zMzEuMTkyLS41ODkuMTkyaC0zLjkwMmMtLjMgMC0uNTM1LS4wNzItLjcwNi0uMjE1YS42NTUuNjU1IDAgMCAxLS4yNTctLjUxOWMwLS4yMTUuMDc1LS40MTkuMjI1LS42MTNhMy43MSAzLjcxIDAgMCAxIC41ODUtLjU4NmMuMjM5LS4xOTcuNjAyLS40OCAxLjA4OC0uODVsLjczMy0uNTA2Yy40NDYtLjMwNy43NjEtLjU2Mi45NDQtLjc2NWEuOTguOTggMCAwIDAgLjI3NC0uNjcxLjc2Ljc2IDAgMCAwLS4zMS0uNjIyIDEuMTk5IDEuMTk5IDAgMCAwLS43NjktLjI0NmMtLjMzNiAwLS41ODUuMDYyLS43NDYuMTg4LS4xNjIuMTI1LS4zLjMxMi0uNDE0LjU1OWEyLjMxMiAyLjMxMiAwIDAgMS0uMzMzLjU1NWMtLjEwOC4xMjItLjI4MS4xODMtLjUyMS4xODNhLjgxNC44MTQgMCAwIDEtLjUyMi0uMTdjLS4xNDQtLjExMy0uMjE2LS4yNzQtLjIxNi0uNDgzIDAtLjI5OC4xMDItLjYuMzA2LS45MDQuMjA0LS4zMDQuNTE3LS41NTUuOTQtLjc1Mi40MjItLjE5Ni45MzYtLjI5NSAxLjU0Mi0uMjk1LjYyOSAwIDEuMTQ1LjA5IDEuNTQ3LjI2OS40MDEuMTc5LjY5OC40MTcuODkuNzE1LjE5Mi4yOTkuMjg4LjYyMS4yODguOTY3IDAgLjM4OC0uMTE2LjczOS0uMzQ3IDEuMDUxLS4yMy4zMTQtLjU3Mi42MzEtMS4wMjUuOTU0LS40NTIuMzIyLS44NDkuNjAxLTEuMTkxLjgzNi0uMzQyLjIzNi0uNTk0LjQ0OS0uNzU2LjY0aDIuNDkxYy4zMDYgMCAuNTQxLjA1Ny43MDYuMTd6bS0xMC41NzkgMS4xMWMtLjIwNC4zMjgtLjQyNi40OTItLjY2Ni40OTJhLjY5Mi42OTIgMCAwIDEtLjQyMi0uMTU3LjQ4Ny40ODcgMCAwIDEtLjIwNy0uNDA3YzAtLjExOS4wNjMtLjI3MS4xODktLjQ1NkwxMC42MzEgMS40N2MuMTM4LS4yMzkuMjU0LS40MDkuMzQ2LS41MS4wOTMtLjEwMi4yMzYtLjE1Mi40MjgtLjE1Mi4xNzkgMCAuMzIyLjA1Mi40MjcuMTU3YS41NTcuNTU3IDAgMCAxIC4xNTcuNDE1YzAgLjE0NC0uMTA1LjM4Mi0uMzE1LjcxNmwtNy40OSAxMi4wMTl6bS0uNzM4LTYuMzYzYS44Mi44MiAwIDAgMS0uNTkzLS4yMjRjLS4xNTYtLjE0OS0uMjM0LS4zNTUtLjIzNC0uNjE3VjMuMTM0Yy0uODM5LjUxMy0xLjQwNi43Ny0xLjY5OS43N2EuNjk2LjY5NiAwIDAgMS0uNDcyLS4xNzUuNTQxLjU0MSAwIDAgMS0uMjAzLS40MjVjMC0uMzA0LjI3Ni0uNTQyLjgyOC0uNzE1LjM4OS0uMTMyLjcwOC0uMjg3Ljk1Ny0uNDY2YTMuNjUgMy42NSAwIDAgMCAuNjY2LS42MTdjLjE5NC0uMjMzLjM0LS4zOS40MzYtLjQ3LjA5Ni0uMDgxLjIzNy0uMTIxLjQyMi0uMTIxLjIyMiAwIC40MDEuMDczLjUzNS4yMTkuMTM1LjE0Ny4yMDMuMzQ1LjIwMy41OTV2NS4wMDNjMCAuNjgtLjI4MiAxLjAyLS44NDYgMS4wMnoiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 300:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSI2Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE5LjI1IDBDMjAuNzY5IDAgMjIgMS4zNDMgMjIgM3MtMS4yMzEgMy0yLjc1IDMtMi43NS0xLjM0My0yLjc1LTMgMS4yMzEtMyAyLjc1LTN6TTExIDBjMS41MTkgMCAyLjc1IDEuMzQzIDIuNzUgM1MxMi41MTkgNiAxMSA2IDguMjUgNC42NTcgOC4yNSAzIDkuNDgxIDAgMTEgMHpNMi43NSAwQzQuMjY5IDAgNS41IDEuMzQzIDUuNSAzUzQuMjY5IDYgMi43NSA2IDAgNC42NTcgMCAzczEuMjMxLTMgMi43NS0zeiIvPgo8L3N2Zz4K"

/***/ }),

/***/ 301:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSI2Ij4KICAgIDxwYXRoIGZpbGw9IiM1MkI4RjAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE5LjI1IDBDMjAuNzY5IDAgMjIgMS4zNDMgMjIgM3MtMS4yMzEgMy0yLjc1IDMtMi43NS0xLjM0My0yLjc1LTMgMS4yMzEtMyAyLjc1LTN6TTExIDBjMS41MTkgMCAyLjc1IDEuMzQzIDIuNzUgM1MxMi41MTkgNiAxMSA2IDguMjUgNC42NTcgOC4yNSAzIDkuNDgxIDAgMTEgMHpNMi43NSAwQzQuMjY5IDAgNS41IDEuMzQzIDUuNSAzUzQuMjY5IDYgMi43NSA2IDAgNC42NTcgMCAzczEuMjMxLTMgMi43NS0zeiIvPgo8L3N2Zz4K"

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(303);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(17)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./hoverable_button.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./hoverable_button.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, ".hoverable_button__wrapperDiv___2TNNJ{\n    cursor: pointer;\n    height: 30px;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.hoverable_button__btnImg___2zGMx{\n    display: inline-block;\n    height: 75%;\n    margin : auto;\n}\n", ""]);

// exports
exports.locals = {
	"wrapperDiv": "hoverable_button__wrapperDiv___2TNNJ",
	"btnImg": "hoverable_button__btnImg___2zGMx"
};

/***/ }),

/***/ 321:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(341);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(17)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./music_file_player.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./music_file_player.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, ".music_file_player__playerContainer___3-8Sq{\n    background-color: #3d4145;\n    display: -ms-flexbox;\n    display: flex;\n    width: 100%;\n    margin: 0;\n    height: 94px;\n}\n.music_file_player__btnPlayPause___qIGkL{\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    width: 17px;\n    height: 19px;\n    margin: auto 10px auto 19px;\n}\n.music_file_player__waveform___30cDr{\n    /*display: inline-flex;*/\n    padding-top: 12px;\n    margin-right: 50px;\n    width: 100%;\n}\n.music_file_player__hidePlayer___-Ggzw {\n    visibility: hidden !important;\n}\n.music_file_player__hovering___1PyZn{\n    position: absolute;\n    width: 100%;\n    display: -ms-flexbox;\n    display: flex;\n}\n.music_file_player__repeatImageContainer___3z1to{\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    margin-top: auto;\n    margin-bottom: auto;\n    margin-left: 3%;\n}\n.music_file_player__repeatImg___kRNV1{\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    height: 15px;\n}\n\n.music_file_player__halfSpeedBtnContainer___1GwDi{\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    margin-top: auto;\n    margin-bottom: auto;\n    margin-left: 16px;\n}\n.music_file_player__halfSpeedImg___37MDH{\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    height: 15px;\n}\n.music_file_player__moreBtnContainer___2xO1T{\n\n}\n.music_file_player__moreBtn___11dwr{\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    height: 6px;\n    margin-right: 43px;\n    margin-top: 14px;\n}\n/*.hoverableBooButtonOverride{*/\n    /*display: inline-flex;*/\n    /*height: 15px;*/\n/*}*/", ""]);

// exports
exports.locals = {
	"playerContainer": "music_file_player__playerContainer___3-8Sq",
	"btnPlayPause": "music_file_player__btnPlayPause___qIGkL",
	"waveform": "music_file_player__waveform___30cDr",
	"hidePlayer": "music_file_player__hidePlayer___-Ggzw",
	"hovering": "music_file_player__hovering___1PyZn",
	"repeatImageContainer": "music_file_player__repeatImageContainer___3z1to",
	"repeatImg": "music_file_player__repeatImg___kRNV1",
	"halfSpeedBtnContainer": "music_file_player__halfSpeedBtnContainer___1GwDi",
	"halfSpeedImg": "music_file_player__halfSpeedImg___37MDH",
	"moreBtnContainer": "music_file_player__moreBtnContainer___2xO1T",
	"moreBtn": "music_file_player__moreBtn___11dwr"
};

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _player_more_menu = __webpack_require__(343);

var _player_more_menu2 = _interopRequireDefault(_player_more_menu);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _switchOn = __webpack_require__(351);

var _switchOn2 = _interopRequireDefault(_switchOn);

var _switchOff = __webpack_require__(352);

var _switchOff2 = _interopRequireDefault(_switchOff);

var _downloadEnabled = __webpack_require__(353);

var _downloadEnabled2 = _interopRequireDefault(_downloadEnabled);

var _downloadHoverAndActive = __webpack_require__(354);

var _downloadHoverAndActive2 = _interopRequireDefault(_downloadHoverAndActive);

var _downloadDisabled = __webpack_require__(355);

var _downloadDisabled2 = _interopRequireDefault(_downloadDisabled);

var _reactTooltip = __webpack_require__(80);

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _reactClickOutside = __webpack_require__(356);

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _consts = __webpack_require__(55);

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Asaf Pinhassi on 25/10/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PlayerMoreMenu = function (_Component) {
    _inherits(PlayerMoreMenu, _Component);

    function PlayerMoreMenu(props) {
        _classCallCheck(this, PlayerMoreMenu);

        var _this = _possibleConstructorReturn(this, (PlayerMoreMenu.__proto__ || Object.getPrototypeOf(PlayerMoreMenu)).call(this, props));

        _this.handleKeyPress = function (event) {
            event.stopPropagation();
        };

        _this.handleClickOutside = function (event) {
            event.stopPropagation();
            if (_this.props.onClickOutsideMenu) _this.props.onClickOutsideMenu();
        };

        _this.state = {
            isDownloadButtonHovered: false
        };
        return _this;
    }

    _createClass(PlayerMoreMenu, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var linkRef = this.props.flacFileStatus === _consts2.default.REMOTE_FILE_STATUS.EXIST ? { href: this.props.downloadUrl } : {};

            var downloadButtonLayout = void 0,
                downloadImageSrc = void 0,
                toolTipText = void 0;
            if (this.props.flacFileStatus === _consts2.default.REMOTE_FILE_STATUS.EXIST || this.props.flacFileStatus === _consts2.default.REMOTE_FILE_STATUS.CHECKING) {
                if (this.state.isDownloadButtonHovered) {
                    //toolTipText = undefined;
                    downloadButtonLayout = _player_more_menu2.default.downloadBtnActive;
                    downloadImageSrc = _downloadHoverAndActive2.default;
                } else {
                    //toolTipText = undefined;
                    downloadButtonLayout = _player_more_menu2.default.downloadBtnEnabled;
                    downloadImageSrc = _downloadEnabled2.default;
                }
            } else if (this.props.flacFileStatus === _consts2.default.REMOTE_FILE_STATUS.NOT_EXIST) {
                //toolTipText = 'File does not exits';
                downloadButtonLayout = _player_more_menu2.default.downloadBtnDisabled;
                downloadImageSrc = _downloadDisabled2.default;
            }

            return _react2.default.createElement(
                'div',
                { className: _player_more_menu2.default.mainContainer },
                ' ',
                _react2.default.createElement(
                    'div',
                    { className: _player_more_menu2.default.moreMenuRow },
                    _react2.default.createElement(
                        'div',
                        { className: _player_more_menu2.default.stretchedPlayerViewContent },
                        _react2.default.createElement(
                            'div',
                            null,
                            'Stretch player view'
                        ),
                        _react2.default.createElement('img', {
                            onClick: this.props.toggleNormalizePlayerWaveBars,
                            className: _player_more_menu2.default.switchImage,
                            src: this.props.shouldNormalizePlayerWaveBars ? _switchOn2.default : _switchOff2.default
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: _player_more_menu2.default.moreMenuBottomRow },
                    _react2.default.createElement(
                        'a',
                        _extends({}, linkRef, {
                            download: this.props.saveAsFileName,
                            'data-tip': toolTipText,
                            onMouseEnter: function onMouseEnter() {
                                return _this2.setState({ isDownloadButtonHovered: true });
                            },
                            onMouseLeave: function onMouseLeave() {
                                return _this2.setState({ isDownloadButtonHovered: false });
                            },
                            className: downloadButtonLayout }),
                        _react2.default.createElement(
                            'div',
                            null,
                            'Download file'
                        ),
                        _react2.default.createElement('img', { src: downloadImageSrc, style: { cursor: "inherit" } })
                    ),
                    _react2.default.createElement(_reactTooltip2.default, {
                        effect: 'solid',
                        type: 'dark' })
                )
            );
        }
    }]);

    return PlayerMoreMenu;
}(_react.Component);

PlayerMoreMenu.propTypes = {
    onClickOutsideMenu: _propTypes2.default.func.isRequired,
    downloadUrl: _propTypes2.default.string.isRequired,
    saveAsFileName: _propTypes2.default.string.isRequired,
    shouldNormalizePlayerWaveBars: _propTypes2.default.bool.isRequired,
    toggleNormalizePlayerWaveBars: _propTypes2.default.func.isRequired,
    flacFileStatus: _propTypes2.default.string.isRequired
};

exports.default = (0, _reactClickOutside2.default)(PlayerMoreMenu);

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(344);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(17)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./player_more_menu.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./player_more_menu.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(345);
exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, ".player_more_menu__mainContainer___3FFTd {\n    width: 334px;\n    position: absolute;\n    z-index: 400;\n    margin-top: -35px;\n    right: calc(5.825% + 10px);\n    border-radius: 7px;\n    background-color: #56595d;\n    -webkit-box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.33);\n            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.33);\n    border: solid 1px #74797d;\n    font-size: 1.1rem;\n    font-weight: normal;\n    font-style: normal;\n    font-stretch: normal;\n    color: #ffffff;\n}\n\n.player_more_menu__moreMenuRow___ogpA- {\n    border-bottom: solid 1px #74797d;\n    height: 53px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-line-pack: center;\n        align-content: center;\n}\n\n.player_more_menu__moreMenuBottomRow___1AJVz {\n    height: 53px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-line-pack: center;\n        align-content: center;\n}\n\n.player_more_menu__stretchedPlayerViewContent___2Ul0_ {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n        justify-content: space-between;\n    width: 100%;\n    margin: 10px;\n    padding: 10px;\n    cursor: pointer;\n}\n\n.player_more_menu__switchImage___3wZRV {\n    width: 51px;\n    height: 20px;\n}\n\n.player_more_menu__downloadBtnEnabled___3pjAS {\n    text-decoration: inherit !important;\n    padding: 10px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n        justify-content: space-between;\n    width: 100%;\n    margin: 10px;\n    color: white !important;\n    border-radius: 5px;\n    cursor: pointer;\n}\n\n.player_more_menu__downloadBtnEnabled___3pjAS:visited, .player_more_menu__downloadBtnEnabled___3pjAS:link, .player_more_menu__downloadBtnEnabled___3pjAS:active {\n    text-decoration: inherit;\n    color: inherit;\n}\n\n.player_more_menu__downloadBtnDisabled___vpja2 {\n    text-decoration: inherit !important;\n    padding: 10px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n        justify-content: space-between;\n    width: 100%;\n    margin: 10px;\n    color: #898b8e !important;\n    border-radius: 5px;\n    cursor:not-allowed;\n}\n\n.player_more_menu__downloadBtnDisabled___vpja2:visited, .player_more_menu__downloadBtnDisabled___vpja2:link, .player_more_menu__downloadBtnDisabled___vpja2:active {\n    text-decoration: inherit;\n    color: inherit;\n}\n\n.player_more_menu__downloadBtnActive___BiXBZ {\n    text-decoration: inherit !important;\n    padding: 10px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n        justify-content: space-between;\n    width: 100%;\n    margin: 10px;\n    color: #52b8f0 !important;\n    border-radius: 5px;\n    background: #3e4145;\n    cursor: pointer;\n}\n\n.player_more_menu__downloadBtnActive___BiXBZ:visited, .player_more_menu__downloadBtnActive___BiXBZ:link, .player_more_menu__downloadBtnActive___BiXBZ:active {\n    text-decoration: inherit;\n    color: inherit;\n}\n\n.player_more_menu__image___2PT67 {\n    height: 25px;\n    background-size: contain;\n    background-repeat: no-repeat;\n    /*margin-left: auto;*/\n    /*margin-right: auto;*/\n    background-position: left center;\n}\n\n.player_more_menu__link-disabled___alnns {\n    cursor: default;\n}\n\n.player_more_menu__checkingIcon___RlTot {\n    background-image: url(" + escape(__webpack_require__(346)) + ");\n    width: 60px\n}\n\n.player_more_menu__existIcon___35xM8 {\n    background-image: url(" + escape(__webpack_require__(347)) + ");\n    width: 40px;\n}\n\n.player_more_menu__existIcon___35xM8:hover {\n    background-image: url(" + escape(__webpack_require__(348)) + ");\n    width: 40px;\n}\n\n.player_more_menu__existPressedIcon___109L4 {\n    background-image: url(" + escape(__webpack_require__(349)) + ");\n    width: 40px;\n}\n\n.player_more_menu__notExistIcon___111pO {\n    background-image: url(" + escape(__webpack_require__(350)) + ");\n    width: 40px;\n}\n\n\n\n", ""]);

// exports
exports.locals = {
	"mainContainer": "player_more_menu__mainContainer___3FFTd",
	"moreMenuRow": "player_more_menu__moreMenuRow___ogpA-",
	"moreMenuBottomRow": "player_more_menu__moreMenuBottomRow___1AJVz",
	"stretchedPlayerViewContent": "player_more_menu__stretchedPlayerViewContent___2Ul0_",
	"switchImage": "player_more_menu__switchImage___3wZRV",
	"downloadBtnEnabled": "player_more_menu__downloadBtnEnabled___3pjAS",
	"downloadBtnDisabled": "player_more_menu__downloadBtnDisabled___vpja2",
	"downloadBtnActive": "player_more_menu__downloadBtnActive___BiXBZ",
	"image": "player_more_menu__image___2PT67",
	"link-disabled": "player_more_menu__link-disabled___alnns",
	"checkingIcon": "player_more_menu__checkingIcon___RlTot",
	"existIcon": "player_more_menu__existIcon___35xM8",
	"existPressedIcon": "player_more_menu__existPressedIcon___109L4",
	"notExistIcon": "player_more_menu__notExistIcon___111pO"
};

/***/ }),

/***/ 346:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNjAuNSA1Ny41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNjAuNSA1Ny41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzFFQkNGMjt9Cgkuc3Qxe2ZpbGw6IzZENzA3Mzt9Cgkuc3Qye2ZpbGw6bm9uZTtzdHJva2U6IzFFQkNGMjtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO30KCS5zdDN7ZmlsbDojMUYyMTIzO3N0cm9rZTojMUVCQ0YyO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fQoJLnN0NHtmaWxsOiMxRUJDRjI7c3Ryb2tlOiMxRjIxMjM7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDt9Cgkuc3Q1e2ZpbGw6I0ZGRkZGRjt9Cgkuc3Q2e2ZpbGw6bm9uZTtzdHJva2U6IzZENzA3MztzdHJva2UtbWl0ZXJsaW1pdDoxMDt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zMy42LDI5LjVjMCwwLjgtMC42LDEuNC0xLjQsMS40YzAsMCwwLDAsMCwwaC0zLjhjLTAuOCwwLTEuNC0wLjYtMS40LTEuNGMwLTAuOCwwLjYtMS40LDEuNC0xLjRoMy44CglDMzIuOSwyOC4xLDMzLjYsMjguNywzMy42LDI5LjVDMzMuNiwyOS41LDMzLjYsMjkuNSwzMy42LDI5LjV6IE00Mi41LDM4LjRjLTAuOCwwLTEuNCwwLjYtMS40LDEuNGMwLDAsMCwwLDAsMHYzLjgKCWMwLDAuOCwwLjYsMS40LDEuNCwxLjRjMC44LDAsMS40LTAuNiwxLjQtMS40di0zLjhDNDMuOSwzOS4xLDQzLjMsMzguNCw0Mi41LDM4LjRDNDIuNSwzOC40LDQyLjUsMzguNCw0Mi41LDM4LjR6IE00OC45LDM3LjgKCWMtMC40LTAuNy0xLjMtMC45LTEuOS0wLjVjLTAuNywwLjQtMC45LDEuMy0wLjUsMS45bDEuOSwzLjNjMC40LDAuNywxLjMsMC45LDEuOSwwLjVjMC43LTAuNCwwLjktMS4zLDAuNS0xLjlsMCwwTDQ4LjksMzcuOHoKCSBNNTUuNCwzNS4zbC0zLjMtMS45Yy0wLjctMC40LTEuNS0wLjItMS45LDAuNWMtMC40LDAuNy0wLjIsMS41LDAuNSwxLjlsMCwwbDMuMywxLjljMC43LDAuNCwxLjUsMC4yLDEuOS0wLjUKCUM1Ni4zLDM2LjYsNTYuMSwzNS43LDU1LjQsMzUuM3ogTTU2LjYsMjguMWgtMy44Yy0wLjgsMC0xLjQsMC42LTEuNCwxLjRjMCwwLjgsMC42LDEuNCwxLjQsMS40YzAsMCwwLDAsMCwwaDMuOAoJYzAuNy0wLjQsMC45LTEuNCwwLjUtMkM1NywyOC42LDU2LjgsMjguNCw1Ni42LDI4LjFMNTYuNiwyOC4xeiBNNTAuMiwyNWMwLjQsMC43LDEuMiwwLjksMS45LDAuNWMwLDAsMCwwLDAsMGwzLjMtMS45CgljMC43LTAuNCwwLjktMS4zLDAuNS0xLjljLTAuNC0wLjctMS4zLTAuOS0xLjktMC41bC0zLjMsMS45QzUwLjEsMjMuNSw0OS44LDI0LjQsNTAuMiwyNUM1MC4yLDI1LDUwLjIsMjUsNTAuMiwyNUw1MC4yLDI1egoJIE00NywyMS44YzAuNywwLjQsMS41LDAuMiwxLjktMC41bDEuOS0zLjNjMC40LTAuNywwLjItMS41LTAuNS0xLjljLTAuNy0wLjQtMS41LTAuMi0xLjksMC41bDAsMGwtMS45LDMuMwoJQzQ2LjEsMjAuNSw0Ni4zLDIxLjQsNDcsMjEuOEM0NywyMS44LDQ3LDIxLjgsNDcsMjEuOEw0NywyMS44eiBNNDIuNSwxNGMtMC44LDAtMS40LDAuNi0xLjQsMS40YzAsMCwwLDAsMCwwdjMuOAoJYzAsMC44LDAuNiwxLjQsMS40LDEuNGMwLjgsMCwxLjQtMC42LDEuNC0xLjRjMCwwLDAsMCwwLDB2LTMuOEM0My45LDE0LjYsNDMuMywxNCw0Mi41LDE0QzQyLjUsMTQsNDIuNSwxNCw0Mi41LDE0TDQyLjUsMTR6CgkgTTM2LjcsMTYuNmMtMC40LTAuNy0xLjMtMC45LTEuOS0wLjVjLTAuNywwLjQtMC45LDEuMy0wLjUsMS45bDEuOSwzLjNjMC40LDAuNywxLjMsMC45LDEuOSwwLjVjMC43LTAuNCwwLjktMS4zLDAuNS0xLjlsMCwwCglMMzYuNywxNi42eiBNMzQuMywyMy4xTDMxLDIxLjJjLTAuNy0wLjQtMS41LTAuMi0xLjksMC41Yy0wLjQsMC43LTAuMiwxLjUsMC41LDEuOWwwLDBsMy4zLDEuOWMwLjcsMC40LDEuNSwwLjIsMS45LTAuNQoJQzM1LjIsMjQuNCwzNC45LDIzLjUsMzQuMywyMy4xQzM0LjMsMjMuMSwzNC4zLDIzLjEsMzQuMywyMy4xTDM0LjMsMjMuMXoiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTExNC42LDM5LjhsMTEtMTEuMmMwLjctMC43LDAuNy0xLjgsMC0yLjVzLTEuOC0wLjctMi41LDBsMCwwbC02LjgsN1YxNC43YzAtMC45LTAuNy0xLjctMS42LTEuNwoJYzAsMC0wLjEsMC0wLjEsMGMtMSwwLTEuNywwLjgtMS43LDEuN2MwLDAsMCwwLDAsMFYzM2wtNy03Yy0wLjctMC43LTEuOC0wLjctMi41LDBzLTAuNywxLjgsMCwyLjVsMCwwTDExNC42LDM5Ljh6IE0xMjguMyw0MS41CgloLTI3LjVjLTEsMC0xLjcsMC44LTEuNywxLjdjMCwxLDAuOCwxLjcsMS43LDEuN2gyNy41YzEuMSwwLDItMC43LDItMS43YzAtMS4xLTAuOS0yLTItMkMxMjguMyw0MS4zLDEyOC4zLDQxLjMsMTI4LjMsNDEuNQoJTDEyOC4zLDQxLjV6Ii8+CjxwYXRoIGlkPSJSb3VuZGVkX1JlY3RhbmdsZV8yIiBjbGFzcz0ic3QyIiBkPSJNNi44LDAuOGgxNDdjMy4zLDAsNiwyLjcsNiw2djQ0YzAsMy4zLTIuNyw2LTYsNkg2LjhjLTMuMywwLTYtMi43LTYtNnYtNDQKCUMwLjgsMy40LDMuNCwwLjgsNi44LDAuOHoiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 347:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA5MS41IDU3LjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDkxLjUgNTcuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMxRUJDRjI7fQoJLnN0MXtmaWxsOiM2RDcwNzM7fQoJLnN0MntmaWxsOm5vbmU7c3Ryb2tlOiMxRUJDRjI7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDt9Cgkuc3Qze2ZpbGw6IzFGMjEyMztzdHJva2U6IzFFQkNGMjtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO30KCS5zdDR7ZmlsbDojMUVCQ0YyO3N0cm9rZTojMUYyMTIzO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fQoJLnN0NXtmaWxsOiNGRkZGRkY7fQoJLnN0NntmaWxsOm5vbmU7c3Ryb2tlOiM2RDcwNzM7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQo8L3N0eWxlPgo8cGF0aCBpZD0iUm91bmRlZF9SZWN0YW5nbGVfMl9jb3B5XzFfIiBjbGFzcz0ic3QyIiBkPSJNNi44LDAuOGg3OGMzLjMsMCw2LDIuNyw2LDZ2NDRjMCwzLjMtMi43LDYtNiw2aC03OGMtMy4zLDAtNi0yLjctNi02di00NAoJQzAuOCwzLjQsMy40LDAuOCw2LjgsMC44eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDUuNiwzOS44bDExLTExLjJjMC43LTAuNywwLjctMS44LDAtMi41cy0xLjgtMC43LTIuNSwwbDAsMGwtNi44LDdWMTQuN2MwLTAuOS0wLjctMS43LTEuNi0xLjcKCWMwLDAtMC4xLDAtMC4xLDBjLTEsMC0xLjcsMC44LTEuNywxLjdjMCwwLDAsMCwwLDBWMzNsLTctN2MtMC43LTAuNy0xLjgtMC43LTIuNSwwcy0wLjcsMS44LDAsMi41bDAsMEw0NS42LDM5Ljh6IE01OS4zLDQxLjVIMzEuNwoJYy0xLDAtMS43LDAuOC0xLjcsMS43YzAsMSwwLjgsMS43LDEuNywxLjdoMjcuNWMxLjEsMCwyLTAuNywyLTEuN2MwLTEuMS0wLjktMi0yLTJDNTkuMyw0MS4zLDU5LjMsNDEuMyw1OS4zLDQxLjVMNTkuMyw0MS41eiIvPgo8L3N2Zz4K"

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA5MS41IDU3LjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDkxLjUgNTcuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMxRUJDRjI7fQoJLnN0MXtmaWxsOiM2RDcwNzM7fQoJLnN0MntmaWxsOm5vbmU7c3Ryb2tlOiMxRUJDRjI7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDt9Cgkuc3Qze2ZpbGw6IzFGMjEyMztzdHJva2U6IzFFQkNGMjtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO30KCS5zdDR7ZmlsbDojMUVCQ0YyO3N0cm9rZTojMUYyMTIzO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fQoJLnN0NXtmaWxsOiNGRkZGRkY7fQoJLnN0NntmaWxsOm5vbmU7c3Ryb2tlOiM2RDcwNzM7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQo8L3N0eWxlPgo8cGF0aCBpZD0iUm91bmRlZF9SZWN0YW5nbGVfMl9jb3B5XzJfIiBjbGFzcz0ic3QzIiBkPSJNNi44LDAuOGg3OGMzLjMsMCw2LDIuNyw2LDZ2NDRjMCwzLjMtMi43LDYtNiw2aC03OGMtMy4zLDAtNi0yLjctNi02di00NAoJQzAuOCwzLjQsMy40LDAuOCw2LjgsMC44eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDUuNiwzOS44bDExLTExLjJjMC43LTAuNywwLjctMS44LDAtMi41cy0xLjgtMC43LTIuNSwwbDAsMGwtNi44LDdWMTQuN2MwLTAuOS0wLjctMS43LTEuNi0xLjcKCWMwLDAtMC4xLDAtMC4xLDBjLTEsMC0xLjcsMC44LTEuNywxLjdjMCwwLDAsMCwwLDBWMzNsLTctN2MtMC43LTAuNy0xLjgtMC43LTIuNSwwcy0wLjcsMS44LDAsMi41bDAsMEw0NS42LDM5Ljh6IE01OS4zLDQxLjVIMzEuNwoJYy0xLDAtMS43LDAuOC0xLjcsMS43YzAsMSwwLjgsMS43LDEuNywxLjdoMjcuNWMxLjEsMCwyLTAuNywyLTEuN2MwLTEuMS0wLjktMi0yLTJDNTkuMyw0MS4zLDU5LjMsNDEuMyw1OS4zLDQxLjVMNTkuMyw0MS41eiIvPgo8L3N2Zz4K"

/***/ }),

/***/ 349:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA5MS41IDU3LjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDkxLjUgNTcuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMxRUJDRjI7fQoJLnN0MXtmaWxsOiM2RDcwNzM7fQoJLnN0MntmaWxsOm5vbmU7c3Ryb2tlOiMxRUJDRjI7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDt9Cgkuc3Qze2ZpbGw6IzFGMjEyMztzdHJva2U6IzFFQkNGMjtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO30KCS5zdDR7ZmlsbDojMUVCQ0YyO3N0cm9rZTojMUYyMTIzO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fQoJLnN0NXtmaWxsOiNGRkZGRkY7fQoJLnN0NntmaWxsOm5vbmU7c3Ryb2tlOiM2RDcwNzM7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQo8L3N0eWxlPgo8cGF0aCBpZD0iUm91bmRlZF9SZWN0YW5nbGVfMl9jb3B5XzNfIiBjbGFzcz0ic3Q0IiBkPSJNNi44LDAuOGg3OGMzLjMsMCw2LDIuNyw2LDZ2NDRjMCwzLjMtMi43LDYtNiw2aC03OGMtMy4zLDAtNi0yLjctNi02di00NAoJQzAuOCwzLjQsMy40LDAuOCw2LjgsMC44eiIvPgo8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNNDUuNiwzOS44bDExLTExLjJjMC43LTAuNywwLjctMS44LDAtMi41cy0xLjgtMC43LTIuNSwwbDAsMGwtNi44LDdWMTQuN2MwLTAuOS0wLjctMS43LTEuNi0xLjcKCWMwLDAtMC4xLDAtMC4xLDBjLTEsMC0xLjcsMC44LTEuNywxLjdjMCwwLDAsMCwwLDBWMzNsLTctN2MtMC43LTAuNy0xLjgtMC43LTIuNSwwcy0wLjcsMS44LDAsMi41bDAsMEw0NS42LDM5Ljh6IE01OS4zLDQxLjVIMzEuNwoJYy0xLDAtMS43LDAuOC0xLjcsMS43YzAsMSwwLjgsMS43LDEuNywxLjdoMjcuNWMxLjEsMCwyLTAuNywyLTEuN2MwLTEuMS0wLjktMi0yLTJDNTkuMyw0MS4zLDU5LjMsNDEuMyw1OS4zLDQxLjVMNTkuMyw0MS41eiIvPgo8L3N2Zz4K"

/***/ }),

/***/ 350:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA5MSA1NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOTEgNTc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMUVCQ0YyO30KCS5zdDF7ZmlsbDojNkQ3MDczO30KCS5zdDJ7ZmlsbDpub25lO3N0cm9rZTojMUVCQ0YyO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fQoJLnN0M3tmaWxsOiMxRjIxMjM7c3Ryb2tlOiMxRUJDRjI7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDt9Cgkuc3Q0e2ZpbGw6IzFFQkNGMjtzdHJva2U6IzFGMjEyMztzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO30KCS5zdDV7ZmlsbDojRkZGRkZGO30KCS5zdDZ7ZmlsbDpub25lO3N0cm9rZTojNkQ3MDczO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KPC9zdHlsZT4KPHBhdGggaWQ9IlJvdW5kZWRfUmVjdGFuZ2xlXzJfY29weV80XyIgY2xhc3M9InN0NiIgZD0iTTYuNSwwLjVoNzhjMy4zLDAsNiwyLjcsNiw2djQ0YzAsMy4zLTIuNyw2LTYsNmgtNzhjLTMuMywwLTYtMi43LTYtNnYtNDQKCUMwLjUsMy4yLDMuMiwwLjUsNi41LDAuNXoiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTQ1LjMsMzkuNWwxMS0xMS4yYzAuNy0wLjcsMC43LTEuOCwwLTIuNXMtMS44LTAuNy0yLjUsMGwwLDBsLTYuOCw3VjE0LjVjMC0wLjktMC43LTEuNy0xLjYtMS43CgljMCwwLTAuMSwwLTAuMSwwYy0xLDAtMS43LDAuOC0xLjcsMS43YzAsMCwwLDAsMCwwdjE4LjNsLTctN2MtMC43LTAuNy0xLjgtMC43LTIuNSwwcy0wLjcsMS44LDAsMi41bDAsMEw0NS4zLDM5LjV6IE01OSw0MS4ySDMxLjUKCWMtMSwwLTEuNywwLjgtMS43LDEuN2MwLDEsMC44LDEuNywxLjcsMS43SDU5YzEuMSwwLDItMC43LDItMS43YzAtMS4xLTAuOS0yLTItMkM1OSw0MSw1OSw0MSw1OSw0MS4yTDU5LDQxLjJ6Ii8+Cjwvc3ZnPgo="

/***/ }),

/***/ 351:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MSIgaGVpZ2h0PSIyMSI+CiAgICA8ZGVmcz4KICAgICAgICA8ZmlsdGVyIGlkPSJhIiB3aWR0aD0iMTkiIGhlaWdodD0iMTkiIHg9IjMyIiB5PSIyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8ZmVPZmZzZXQgZHk9IjEiIGluPSJTb3VyY2VBbHBoYSIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgcmVzdWx0PSJibHVyT3V0IiBzdGREZXZpYXRpb249IjEiLz4KICAgICAgICAgICAgPGZlRmxvb2QgZmxvb2QtY29sb3I9IiMwMjAyMDIiIHJlc3VsdD0iZmxvb2RPdXQiLz4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJmbG9vZE91dCIgaW4yPSJibHVyT3V0IiBvcGVyYXRvcj0iYXRvcCIvPgogICAgICAgICAgICA8ZmVDb21wb25lbnRUcmFuc2Zlcj4KICAgICAgICAgICAgICAgIDxmZUZ1bmNBIHNsb3BlPSIuNTgiIHR5cGU9ImxpbmVhciIvPgogICAgICAgICAgICA8L2ZlQ29tcG9uZW50VHJhbnNmZXI+CiAgICAgICAgICAgIDxmZU1lcmdlPgogICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlLz4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPgogICAgICAgICAgICA8L2ZlTWVyZ2U+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8cGF0aCBmaWxsPSIjNTJCOEYwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMCAwaDMxYzUuNTIzIDAgMTAgNC40NzcgMTAgMTBzLTQuNDc3IDEwLTEwIDEwSDEwQzQuNDc3IDIwIDAgMTUuNTIzIDAgMTBTNC40NzcgMCAxMCAweiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNDEgMi41MDFBNy40OTggNy40OTggMCAwIDEgNDguNDk5IDEwIDcuNDk4IDcuNDk4IDAgMCAxIDQxIDE3LjQ5OSA3LjQ5OCA3LjQ5OCAwIDAgMSAzMy41MDEgMTAgNy40OTggNy40OTggMCAwIDEgNDEgMi41MDF6IiBmaWx0ZXI9InVybCgjYSkiLz4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI0Ljc5MSAxNS40OHYtNC44NDdjMC0uNjEtLjE0LTEuMDY2LS40MTctMS4zNjctLjI3OC0uMzAxLS43MTQtLjQ1MS0xLjMwNi0uNDUxLS43ODQgMC0xLjM1OC4yMTItMS43MjMuNjM2LS4zNjQuNDIzLS41NDcgMS4xMjMtLjU0NyAyLjA5OHYzLjkzMWgtMS4xMzRWNy45ODhoLjkyMmwuMTg1IDEuMDI1aC4wNTVjLjIzMi0uMzY5LjU1OC0uNjU1Ljk3Ny0uODU4YTMuMTc1IDMuMTc1IDAgMCAxIDEuNDAyLS4zMDRjLjkwMiAwIDEuNTgxLjIxOCAyLjAzNy42NTMuNDU1LjQzNS42ODMgMS4xMzEuNjgzIDIuMDg4djQuODg4aC0xLjEzNHptLTExLjc3Mi4xMzdjLTEuNDcyIDAtMi42MDgtLjQ1LTMuNDA4LTEuMzUxLS43OTktLjg5OS0xLjE5OS0yLjE3LTEuMTk5LTMuODExIDAtMS42MjYuNDAxLTIuODg4IDEuMjAzLTMuNzgzLjgwMi0uODk2IDEuOTQxLTEuMzQzIDMuNDE4LTEuMzQzIDEuNDM1IDAgMi41NTYuNDU1IDMuMzYzIDEuMzY3LjgwNy45MTEgMS4yMSAyLjE2OSAxLjIxIDMuNzczIDAgMS42LS40MDQgMi44NTgtMS4yMTMgMy43NzQtLjgwOS45MTYtMS45MzQgMS4zNzQtMy4zNzQgMS4zNzR6bTIuNTEyLTguMjA3Yy0uNTYzLS42OTUtMS4zOTUtMS4wNDItMi40OTgtMS4wNDItMS4xMDggMC0xLjk1LjM0OS0yLjUyNiAxLjA0OS0uNTc3LjctLjg2NSAxLjcxNy0uODY1IDMuMDUyIDAgMS4zNTQuMjg4IDIuMzguODY1IDMuMDguNTc2LjY5OSAxLjQxNCAxLjA0OSAyLjUxMiAxLjA0OSAxLjEwOCAwIDEuOTQ0LS4zNDkgMi41MDktMS4wNDYuNTY1LS42OTcuODQ4LTEuNzI1Ljg0OC0zLjA4MyAwLTEuMzQ0LS4yODItMi4zNjQtLjg0NS0zLjA1OXoiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 352:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MSIgaGVpZ2h0PSIyMSI+CiAgICA8ZGVmcz4KICAgICAgICA8ZmlsdGVyIGlkPSJhIiB3aWR0aD0iMTkiIGhlaWdodD0iMTkiIHg9IjEiIHk9IjIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iMSIgaW49IlNvdXJjZUFscGhhIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciByZXN1bHQ9ImJsdXJPdXQiIHN0ZERldmlhdGlvbj0iMSIvPgogICAgICAgICAgICA8ZmVGbG9vZCBmbG9vZC1jb2xvcj0iIzAyMDIwMiIgcmVzdWx0PSJmbG9vZE91dCIvPgogICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49ImZsb29kT3V0IiBpbjI9ImJsdXJPdXQiIG9wZXJhdG9yPSJhdG9wIi8+CiAgICAgICAgICAgIDxmZUNvbXBvbmVudFRyYW5zZmVyPgogICAgICAgICAgICAgICAgPGZlRnVuY0Egc2xvcGU9Ii41OCIgdHlwZT0ibGluZWFyIi8+CiAgICAgICAgICAgIDwvZmVDb21wb25lbnRUcmFuc2Zlcj4KICAgICAgICAgICAgPGZlTWVyZ2U+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUvPgogICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+CiAgICAgICAgICAgIDwvZmVNZXJnZT4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxwYXRoIGZpbGw9IiMzRTQxNDUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEwIDBoMzFjNS41MjMgMCAxMCA0LjQ3NyAxMCAxMHMtNC40NzcgMTAtMTAgMTBIMTBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDB6Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMCAyLjUwMUE3LjQ5OCA3LjQ5OCAwIDAgMSAxNy40OTkgMTAgNy41IDcuNSAwIDEgMSAxMCAyLjUwMXoiIGZpbHRlcj0idXJsKCNhKSIvPgogICAgPHBhdGggZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNDEuMjU2IDUuNTc2Yy0uNDM3LS4xNDEtLjgxMS0uMjExLTEuMTIxLS4yMTEtLjQyOCAwLS43NDUuMTQyLS45NS40MjctLjIwNS4yODUtLjMwOC43NDEtLjMwOCAxLjM3di40ODZoMS45MDh2Ljg4MmgtMS45MDh2Ni42MWgtMS4xMzRWOC41M2gtMS4zNHYtLjUxM2wxLjM0LS40MVY3LjE5YzAtMS44NDEuODA0LTIuNzYyIDIuNDEzLTIuNzYyLjM5NiAwIC44NjEuMDggMS4zOTQuMjM5bC0uMjk0LjkwOXptLTUuODY1LS4yMTFjLS40MjggMC0uNzQ1LjE0Mi0uOTUuNDI3LS4yMDUuMjg1LS4zMDguNzQxLS4zMDggMS4zN3YuNDg2aDEuOTA4di44ODJoLTEuOTA4djYuNjFoLTEuMTM0VjguNTNoLTEuMzR2LS41MTNsMS4zNC0uNDFWNy4xOWMwLTEuODQxLjgwNC0yLjc2MiAyLjQxMy0yLjc2Mi4zOTYgMCAuODYxLjA4IDEuMzk0LjIzOWwtLjI5NC45MDljLS40MzctLjE0MS0uODExLS4yMTEtMS4xMjEtLjIxMXptLTkuMzcyIDkuOTEyYy0xLjQ3MiAwLTIuNjA4LS40NS0zLjQwOC0xLjM1LS43OTktLjktMS4xOTktMi4xNzEtMS4xOTktMy44MTEgMC0xLjYyNy40MDEtMi44ODkgMS4yMDMtMy43ODQuODAyLS44OTYgMS45NDEtMS4zNDMgMy40MTgtMS4zNDMgMS40MzUgMCAyLjU1Ni40NTUgMy4zNjMgMS4zNjcuODA3LjkxMSAxLjIxIDIuMTY5IDEuMjEgMy43NzMgMCAxLjYtLjQwNCAyLjg1OC0xLjIxMyAzLjc3NC0uODA5LjkxNi0xLjkzNCAxLjM3NC0zLjM3NCAxLjM3NHptMi41MTItOC4yMDdjLS41NjMtLjY5NS0xLjM5NS0xLjA0Mi0yLjQ5OC0xLjA0Mi0xLjEwOCAwLTEuOTUuMzQ5LTIuNTI2IDEuMDQ5LS41NzcuNy0uODY1IDEuNzE3LS44NjUgMy4wNTIgMCAxLjM1NC4yODggMi4zOC44NjUgMy4wOC41NzYuNjk5IDEuNDE0IDEuMDQ5IDIuNTEyIDEuMDQ5IDEuMTA4IDAgMS45NDQtLjM0OSAyLjUwOS0xLjA0Ni41NjUtLjY5Ny44NDgtMS43MjUuODQ4LTMuMDgzIDAtMS4zNDQtLjI4Mi0yLjM2NC0uODQ1LTMuMDU5eiIvPgo8L3N2Zz4K"

/***/ }),

/***/ 353:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSI+CiAgICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjUxMiAxNS45ODhsNi4yMDctNi4zMzhhLjk5OC45OTggMCAwIDAtLjAyMy0xLjM5OS45OTEuOTkxIDAgMCAwLTEuMzk0LjAyMmwtMy44MzIgMy45MzRWMS44OTRBLjk0Ny45NDcgMCAwIDAgOS41MTEuOTFhLjk3Ny45NzcgMCAwIDAtLjk3OS45ODR2MTAuMzEzTDQuNTkgOC4yNTJhLjk3Ljk3IDAgMCAwLTEuMzkzIDAgLjk3Ny45NzcgMCAwIDAgMCAxLjM5OWw2LjMxNSA2LjMzN3ptNy43MS45ODJIMS43MTZhLjk3Ny45NzcgMCAwIDAtLjk3OS45ODNjMCAuNTQ1LjQzNS45ODIuOTc5Ljk4MmgxNS41MDZjLjU0NCAwIC45OC0uNDM3Ljk4LS45ODJhLjk3OC45NzggMCAwIDAtLjk4LS45ODN6Ii8+Cjwvc3ZnPgo="

/***/ }),

/***/ 354:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSI+CiAgICA8cGF0aCBmaWxsPSIjNTJCOEYwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjUxMiAxNS45ODhsNi4yMDctNi4zMzhhLjk5OC45OTggMCAwIDAtLjAyMy0xLjM5OS45OTIuOTkyIDAgMCAwLTEuMzk0LjAyM2wtMy44MzIgMy45MzNWMS44OTRBLjk0Ny45NDcgMCAwIDAgOS41MTEuOTFhLjk3Ny45NzcgMCAwIDAtLjk3OS45ODR2MTAuMzEzTDQuNTkgOC4yNTJhLjk3Ljk3IDAgMCAwLTEuMzkzIDAgLjk3Ny45NzcgMCAwIDAgMCAxLjM5OWw2LjMxNSA2LjMzN3ptNy43MS45ODJIMS43MTZhLjk3OC45NzggMCAwIDAtLjk3OS45ODNjMCAuNTQ1LjQzNS45ODIuOTc5Ljk4MmgxNS41MDZjLjU0NCAwIC45OC0uNDM3Ljk4LS45ODJhLjk3OC45NzggMCAwIDAtLjk4LS45ODN6Ii8+Cjwvc3ZnPgo="

/***/ }),

/***/ 355:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSI+CiAgICA8cGF0aCBmaWxsPSIjODk4QjhFIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjUxMiAxNS45ODhsNi4yMDctNi4zMzhhLjk5OC45OTggMCAwIDAtLjAyMy0xLjM5OS45OTEuOTkxIDAgMCAwLTEuMzk0LjAyMmwtMy44MzIgMy45MzRWMS44OTRBLjk0Ny45NDcgMCAwIDAgOS41MTEuOTFhLjk3Ny45NzcgMCAwIDAtLjk3OS45ODR2MTAuMzEzTDQuNTkgOC4yNTJhLjk3Ljk3IDAgMCAwLTEuMzkzIDAgLjk3Ny45NzcgMCAwIDAgMCAxLjM5OWw2LjMxNSA2LjMzN3ptNy43MS45ODJIMS43MTZhLjk3Ny45NzcgMCAwIDAtLjk3OS45ODNjMCAuNTQ1LjQzNS45ODIuOTc5Ljk4MmgxNS41MDZjLjU0NCAwIC45OC0uNDM3Ljk4LS45ODJhLjk3OC45NzggMCAwIDAtLjk4LS45ODN6Ii8+Cjwvc3ZnPgo="

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _momentTimezone = __webpack_require__(359);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _player_digital_clock = __webpack_require__(362);

var _player_digital_clock2 = _interopRequireDefault(_player_digital_clock);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _copy_active = __webpack_require__(364);

var _copy_active2 = _interopRequireDefault(_copy_active);

var _copy = __webpack_require__(365);

var _copy2 = _interopRequireDefault(_copy);

var _reactCopyToClipboard = __webpack_require__(366);

var _reactCopyToClipboard2 = _interopRequireDefault(_reactCopyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by shahartaite on 16/12/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var timeFormat = 'H:mm:ss.S';
var shortTimeFormat = 's.S';
var dateFormat = 'dddd, MMMM Do, YYYY';

var PlayerDigitalClock = function (_Component) {
    _inherits(PlayerDigitalClock, _Component);

    function PlayerDigitalClock(props) {
        _classCallCheck(this, PlayerDigitalClock);

        var _this = _possibleConstructorReturn(this, (PlayerDigitalClock.__proto__ || Object.getPrototypeOf(PlayerDigitalClock)).call(this, props));

        _this.onTimestampCopied = function () {
            if (_this.props.onStartTimeCopiedToClipboard) _this.props.onStartTimeCopiedToClipboard(_this.props.startTime);
        };

        _this.state = {
            isCopyButtonHovered: false
        };
        if (props.clockTimezone) {
            _momentTimezone2.default.tz.setDefault(props.clockTimezone);
        }

        return _this;
    }

    _createClass(PlayerDigitalClock, [{
        key: 'startUpdatingTime',
        value: function startUpdatingTime() {
            this.timeUpdatingMethodID = window.setInterval(function () {
                var millisToAdd = 100 * this.props.playerSpeed;
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
                        document.getElementById('playerClockDate').textContent = '/ ' + this.time.format(dateFormat);
                    }
                }
            }.bind(this), 100);
        }
    }, {
        key: 'stopUpdatingTime',
        value: function stopUpdatingTime() {
            if (this.timeUpdatingMethodID) {
                clearInterval(this.timeUpdatingMethodID);
            }
            if (document.getElementById('playerClockPosition')) {
                document.getElementById('playerClockPosition').textContent = '0.0';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.stopUpdatingTime();
            this.time = (0, _momentTimezone2.default)(this.props.startTime + this.props.positionInMilli);
            this.positionInMilli = _momentTimezone2.default.utc(this.props.positionInMilli);
            var fileDuration = this.props.durationInSeconds;
            var secondsWithinDuration = Math.floor(fileDuration % 60);
            var millisecondsWithinDuration = ((fileDuration - Math.floor(fileDuration)) * 10).toFixed(0);
            var duration = secondsWithinDuration + '.' + millisecondsWithinDuration;
            if (!this.props.shouldPauseTime) {
                this.startUpdatingTime();
            }

            return _react2.default.createElement(
                'div',
                { className: _player_digital_clock2.default.playerBottomContainer },
                _react2.default.createElement(
                    'div',
                    { className: _player_digital_clock2.default.playerBottomContent },
                    _react2.default.createElement(
                        'div',
                        { className: _player_digital_clock2.default.playerBottomLeft },
                        _react2.default.createElement(
                            'div',
                            { id: 'playerClockPosition', className: _player_digital_clock2.default.playerBottomPanelElapsed },
                            this.positionInMilli.format(shortTimeFormat)
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: _player_digital_clock2.default.playerBottomPanelLength },
                            '/ ' + duration
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'playerClockTime', className: _player_digital_clock2.default.playerBottomPanelTime },
                            this.time.format(timeFormat)
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'playerClockDate', className: _player_digital_clock2.default.playerBottomPanelDate },
                            '/ ' + this.time.format(dateFormat)
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: _player_digital_clock2.default.playerBottomCenter },
                        _react2.default.createElement(
                            'div',
                            { className: _player_digital_clock2.default.playerBottomPanelElapsed },
                            'Timestamp:'
                        ),
                        _react2.default.createElement(
                            _reactCopyToClipboard2.default,
                            { text: '' + this.props.startTime },
                            _react2.default.createElement(
                                'div',
                                { className: this.state.isCopyButtonHovered ? _player_digital_clock2.default.playerBottomPanelTimestampContentActive : _player_digital_clock2.default.playerBottomPanelTimestampContentNormal,
                                    onClick: this.onTimestampCopied,
                                    onMouseOver: function onMouseOver() {
                                        return _this2.setState({ isCopyButtonHovered: true });
                                    },
                                    onMouseLeave: function onMouseLeave() {
                                        return _this2.setState({ isCopyButtonHovered: false });
                                    } },
                                _react2.default.createElement(
                                    'div',
                                    { className: _player_digital_clock2.default.playerBottomPanelTimestampValue },
                                    this.props.startTime
                                ),
                                _react2.default.createElement('img', {
                                    alt: "copy",
                                    src: this.state.isCopyButtonHovered ? _copy_active2.default : _copy2.default,
                                    className: _player_digital_clock2.default.copyBtn
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: _player_digital_clock2.default.playerBottomRight },
                        _react2.default.createElement(
                            'div',
                            { className: _player_digital_clock2.default.playerBottomPanelLabel },
                            this.props.label
                        )
                    )
                )
            );
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.stopUpdatingTime();
        }
    }]);

    return PlayerDigitalClock;
}(_react.Component);

PlayerDigitalClock.defaultProps = {
    shouldShowTimestamp: true,
    label: '',
    playerSpeed: 1
};

PlayerDigitalClock.propTypes = {
    shouldPauseTime: _propTypes2.default.bool.isRequired,
    startTime: _propTypes2.default.number.isRequired,
    shouldShowTimestamp: _propTypes2.default.bool,
    positionInMilli: _propTypes2.default.number.isRequired,

    durationInSeconds: _propTypes2.default.number.isRequired,
    label: _propTypes2.default.string,
    playerSpeed: _propTypes2.default.number,
    clockTimezone: _propTypes2.default.string,
    onStartTimeCopiedToClipboard: _propTypes2.default.func
};
exports.default = PlayerDigitalClock;

/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(363);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(17)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./player_digital_clock.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--2-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./player_digital_clock.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, "\n.player_digital_clock__playerBottomContainer___phS7E {\n    width: 100%;\n    background: #c9ced6;\n    height: 22px;\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.player_digital_clock__playerBottomContent___2pUlU {\n    display: grid;\n    grid-template-rows: 1fr;\n    grid-template-columns: 2fr 1fr 2fr ;\n    font-size: 13px;\n    margin: auto;\n    white-space: nowrap;\n    /*position: relative;*/\n}\n\n.player_digital_clock__playerBottomLeft___22d0f {\n    grid-column: 1;\n    text-align: center;\n}\n\n.player_digital_clock__playerBottomPanelElapsed___Tcw7S {\n    display: inline-block;\n    font-weight: bold;\n    margin-top: auto;\n    margin-bottom: auto;\n}\n\n.player_digital_clock__playerBottomPanelLength___1ybVG {\n    display: inline-block;\n}\n\n.player_digital_clock__playerBottomPanelTime___3BMEt {\n    display: inline-block;\n    font-weight: bold;\n    margin-left: 15px;\n    margin-right: 5px;\n}\n\n.player_digital_clock__playerBottomPanelDate___3p0P6 {\n    display: inline-block;\n}\n\n.player_digital_clock__playerBottomCenter___AVati {\n    grid-column: 2;\n    display: -ms-flexbox;\n    display: flex;\n    /*width: 270px*/\n}\n\n.player_digital_clock__playerBottomPanelTimestampContentNormal___1MRwD {\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    background-color: #dee2e8;\n    color: #313438;\n    cursor: pointer;\n    margin-left: 10px;\n    padding-left: 5px;\n    padding-right: 5px;\n}\n.player_digital_clock__playerBottomPanelTimestampContentActive___1kb2c {\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    background-color: #ffffff;\n    color: #52b8f0;\n    cursor: pointer;\n    margin-left: 10px;\n    padding-left: 5px;\n    padding-right: 5px;\n}\n\n.player_digital_clock__playerBottomPanelTimestampValue___2zPlD {\n    display: inline-block;\n}\n\n.player_digital_clock__playerBottomRight___2QGhG {\n    grid-column: 3;\n    text-align: center;\n}\n\n.player_digital_clock__playerBottomPanelLabel___1xKGC {\n    text-transform: capitalize;\n}\n.player_digital_clock__copyBtn___1TqF0{\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    margin-top: auto;\n    margin-bottom: auto;\n    height: 12px;\n    margin-left: 12px;\n}", ""]);

// exports
exports.locals = {
	"playerBottomContainer": "player_digital_clock__playerBottomContainer___phS7E",
	"playerBottomContent": "player_digital_clock__playerBottomContent___2pUlU",
	"playerBottomLeft": "player_digital_clock__playerBottomLeft___22d0f",
	"playerBottomPanelElapsed": "player_digital_clock__playerBottomPanelElapsed___Tcw7S",
	"playerBottomPanelLength": "player_digital_clock__playerBottomPanelLength___1ybVG",
	"playerBottomPanelTime": "player_digital_clock__playerBottomPanelTime___3BMEt",
	"playerBottomPanelDate": "player_digital_clock__playerBottomPanelDate___3p0P6",
	"playerBottomCenter": "player_digital_clock__playerBottomCenter___AVati",
	"playerBottomPanelTimestampContentNormal": "player_digital_clock__playerBottomPanelTimestampContentNormal___1MRwD",
	"playerBottomPanelTimestampContentActive": "player_digital_clock__playerBottomPanelTimestampContentActive___1kb2c",
	"playerBottomPanelTimestampValue": "player_digital_clock__playerBottomPanelTimestampValue___2zPlD",
	"playerBottomRight": "player_digital_clock__playerBottomRight___2QGhG",
	"playerBottomPanelLabel": "player_digital_clock__playerBottomPanelLabel___1xKGC",
	"copyBtn": "player_digital_clock__copyBtn___1TqF0"
};

/***/ }),

/***/ 364:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+CiAgICA8cGF0aCBmaWxsPSIjNTJCOEYwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS45MTguNTU5SDQuOTI5Yy0uNTgyIDAtMS4xNjUuNTc0LTEuMTY1IDEuMTQ5djEuNDcxSDEuODcxYy0uNTgyIDAtMS4xNjUuNTc1LTEuMTY1IDEuMTVWMTEuMjIxYzAgLjU3NC41ODMgMS4xNDggMS4xNjUgMS4xNDhoNi45OWMuNTgyIDAgMS4xNjQtLjU3NCAxLjE2NC0xLjE0NlY5Ljc0OGgxLjg5M2MuNTgzIDAgMS4xNjUtLjU3NCAxLjE2NS0xLjE0NlYxLjcwOGMwLS41NzUtLjU4Mi0xLjE0OS0xLjE2NS0xLjE0OXpNOC44NjEgOC42djIuMDQ1YzAgLjI4OC0uMjkyLjU3Ni0uNTgzLjU3NkgyLjQ1NGMtLjI5MiAwLS41ODMtLjI4OC0uNTgzLS41NzZWNC45MDNjMC0uMjg4LjI5MS0uNTc0LjU4My0uNTc0aDUuODI0Yy4yOTEgMCAuNTgzLjI4Ni41ODMuNTc0VjguNnptMy4wNTctLjU3NGMwIC4yODctLjI5MS41NzQtLjU4MS41NzRoLTEuMzEyVjQuMzI5YzAtLjU3NS0uNTgyLTEuMTUtMS4xNjQtMS4xNUg0LjkyOXYtLjg5N2MwLS4yODcuMjkxLS41NzQuNTgzLS41NzRoNS44MjVjLjI5IDAgLjU4MS4yODcuNTgxLjU3NHY1Ljc0NHoiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 365:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+CiAgICA8cGF0aCBmaWxsPSIjMzEzNDM4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS45MTguNTU5SDQuOTI5Yy0uNTgyIDAtMS4xNjUuNTc0LTEuMTY1IDEuMTQ5djEuNDcxSDEuODcxYy0uNTgyIDAtMS4xNjUuNTc1LTEuMTY1IDEuMTVWMTEuMjIxYzAgLjU3NC41ODMgMS4xNDggMS4xNjUgMS4xNDhoNi45OWMuNTgyIDAgMS4xNjQtLjU3NCAxLjE2NC0xLjE0NlY5Ljc0OGgxLjg5M2MuNTgzIDAgMS4xNjUtLjU3MyAxLjE2NS0xLjE0NlYxLjcwOGMwLS41NzUtLjU4Mi0xLjE0OS0xLjE2NS0xLjE0OXpNOC44NjEgOC42djIuMDQ1YzAgLjI4OC0uMjkyLjU3Ni0uNTgzLjU3NkgyLjQ1NGMtLjI5MiAwLS41ODMtLjI4OC0uNTgzLS41NzZWNC45MDNjMC0uMjg4LjI5MS0uNTc0LjU4My0uNTc0aDUuODI0Yy4yOTEgMCAuNTgzLjI4Ni41ODMuNTc0VjguNnptMy4wNTctLjU3NGMwIC4yODctLjI5MS41NzQtLjU4MS41NzRoLTEuMzEyVjQuMzI5YzAtLjU3NS0uNTgyLTEuMTUtMS4xNjQtMS4xNUg0LjkyOXYtLjg5N2MwLS4yODcuMjkxLS41NzQuNTgzLS41NzRoNS44MjVjLjI5IDAgLjU4MS4yODcuNTgxLjU3NHY1Ljc0NHoiLz4KPC9zdmc+Cg=="

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    REMOTE_FILE_STATUS: {
        EXIST: "EXIST",
        CHECKING: "CHECKING",
        NOT_EXIST: "NOT_EXIST"
    },
    PLAYER_SPEED: {
        x1: 1,
        x1_2: 0.5
    }
};

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoverable_button = __webpack_require__(302);

var _hoverable_button2 = _interopRequireDefault(_hoverable_button);

var _classnames = __webpack_require__(30);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactTooltip = __webpack_require__(80);

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _reactReduxI18n = __webpack_require__(82);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by shahartaite on 09/07/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var HoverableButton = function (_Component) {
    _inherits(HoverableButton, _Component);

    function HoverableButton(props) {
        _classCallCheck(this, HoverableButton);

        var _this = _possibleConstructorReturn(this, (HoverableButton.__proto__ || Object.getPrototypeOf(HoverableButton)).call(this, props));

        _this.onHover = _this.onHover.bind(_this);
        _this.onHoverEnd = _this.onHoverEnd.bind(_this);
        _this.state = {
            isHovered: false
        };
        return _this;
    }

    _createClass(HoverableButton, [{
        key: 'onHover',
        value: function onHover() {
            this.setState({
                isHovered: true
            });
        }
    }, {
        key: 'onHoverEnd',
        value: function onHoverEnd() {
            this.setState({
                isHovered: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var imgSrc = this.props.isActive || this.state.isHovered ? this.props.activeImageSrc : this.props.restImageSrc;
            var divWrapperClasses = (0, _classnames2.default)(_hoverable_button2.default.wrapperDiv, _defineProperty({}, this.props.wrappingDivClassName, this.props.wrappingDivClassName)); //we add wrapping div class if exists
            var imgClasses = (0, _classnames2.default)(_hoverable_button2.default.btnImg, _defineProperty({}, this.props.imgClassName, this.props.imgClassName));
            return _react2.default.createElement(
                'div',
                { className: divWrapperClasses,
                    'data-tip': this.props.tooltip && _reactReduxI18n.I18n.t('indicator.tooltip.' + this.props.tooltip),
                    onClick: this.props.onClick,
                    onMouseEnter: this.onHover,
                    onMouseLeave: this.onHoverEnd },
                this.props.tooltip && _react2.default.createElement(_reactTooltip2.default, {
                    effect: 'solid',
                    type: 'dark' }),
                _react2.default.createElement('img', { src: imgSrc,
                    className: imgClasses })
            );
        }
    }]);

    return HoverableButton;
}(_react.Component);

HoverableButton.propTypes = {
    restImageSrc: _propTypes2.default.string.isRequired,
    activeImageSrc: _propTypes2.default.string.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    imgClassName: _propTypes2.default.string,
    wrappingDivClassName: _propTypes2.default.string,
    isActive: _propTypes2.default.bool,
    tooltip: _propTypes2.default.string
};
exports.default = HoverableButton;

/***/ })

},[209]);
});