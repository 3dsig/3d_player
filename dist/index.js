!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["3d_player"]=t():e["3d_player"]=t()}("undefined"!=typeof self?self:this,function(){return webpackJsonp3d_player([1],{192:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e},s=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),u=i(1),p=a(u),c=i(2),d=a(c),y=i(195),_=a(y),f=i(196),g=a(f),m=i(197),h=a(m),M=i(200),w=a(M),b=i(275),I=a(b),C=i(281),j=a(C),P=i(323),N=a(P),L={FIRST:"FIRST",SECOND:"SECOND"},x=function(e){function t(e){l(this,t);var i=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return i.toggleIsPaused=function(e){var t={isPaused:e};if(e){var a=Math.floor(1e3*i["player_"+i.state.playerPlaying].wavesurfer.getCurrentTime());t.currentPlayingFilePositionInMilli=a}i.setState(t)},i.resetPlayer=function(){var e=i.state.currentFileDuration;i.setState(o({},i.initialState,{isPaused:!0,currentFileDuration:e}))},i.onFinishedPlaylist=function(){i.props.onFinishedPlaylist?i.props.onFinishedPlaylist():i.resetPlayer()},i.onFinishedPlayingFile=function(e){var t={};t=e===L.FIRST?{indexFirstPlayerIsPlaying:i.state.indexFirstPlayerIsPlaying+2,playerPlaying:L.SECOND}:{indexSecondPlayerIsPlaying:i.state.indexSecondPlayerIsPlaying+2,playerPlaying:L.FIRST},t.currentPlayingFilePositionInMilli=0,i.setState(t),i.props.filesToPlay.length>0&&(i.state.playerPlaying===L.FIRST&&i.state.indexFirstPlayerIsPlaying>=i.props.filesToPlay.length||i.state.playerPlaying===L.SECOND&&i.state.indexSecondPlayerIsPlaying>=i.props.filesToPlay.length)&&i.onFinishedPlaylist()},i.onStartedPlaying=function(e){i.props.onFilePlayingChanged(i.state.playerPlaying===L.FIRST?i.props.filesToPlay[i.state.indexFirstPlayerIsPlaying]:i.props.filesToPlay[i.state.indexSecondPlayerIsPlaying]),i.setState({currentFileDuration:e})},i.setPlayerAsReady=function(e){var t={};e===L.FIRST?t.isFirstPlayerFileReadyToPlay=!0:t.isSecondPlayerFileReadyToPlay=!0,i.setState(t)},i.onError=function(e){return i.props.onErrorPlayingFile(e)},i.createPlayer=function(e){var t=i.state.indexFirstPlayerIsPlaying,a=i.state.indexSecondPlayerIsPlaying,l=void 0;l=e===L.FIRST?t>=0&&t<i.props.filesToPlay.length?i.props.filesToPlay[t]:i.props.filesToPlay[0]:a>=0&&a<i.props.filesToPlay.length?i.props.filesToPlay[a]:i.props.filesToPlay[0];var n=e===L.FIRST?i.state.isFirstPlayerFileReadyToPlay:i.state.isSecondPlayerFileReadyToPlay;return p.default.createElement(I.default,{ref:function(t){return i["player_"+e]=t},playerNumber:e,fileUrl:l.url,isHidden:i.state.playerPlaying!==e,isPlaying:i.state.playerPlaying===e&&!i.state.isPaused&&n,isPaused:i.state.isPaused,onError:i.onError,onReady:i.setPlayerAsReady,onFinish:i.onFinishedPlayingFile,onPosChange:i.onPosChange,onStartedPlaying:i.onStartedPlaying,toggleIsPaused:i.toggleIsPaused})},i.onPosChange=function(e){var t=i.state.currentFileDuration,a=Math.floor(e*(1e3*t));i.setState({currentPlayingFilePositionInMilli:a})},i.initialState={indexFirstPlayerIsPlaying:0,indexSecondPlayerIsPlaying:1,playerPlaying:L.FIRST,isFirstPlayerFileReadyToPlay:!1,isSecondPlayerFileReadyToPlay:!1,isPaused:!1,currentPlayingFilePositionInMilli:0,currentFileDuration:0},i.state=o({},i.initialState),i.createPlayer=i.createPlayer.bind(i),i.toggleIsPaused=i.toggleIsPaused.bind(i),i.onFinishedPlayingFile=i.onFinishedPlayingFile.bind(i),i.onStartedPlaying=i.onStartedPlaying.bind(i),i.setPlayerAsReady=i.setPlayerAsReady.bind(i),i.onError=i.onError.bind(i),i.createPlayer=i.createPlayer.bind(i),i}return r(t,e),s(t,[{key:"componentWillReceiveProps",value:function(e){e.isLoading&&this.setState(this.initialState)}},{key:"render",value:function(){var e={height:"114px",background:"#3D4145"},t={display:"flex",alignItems:"center",justifyContent:"center"},i=this.props.filesToPlay.length>0,a=this.state.playerPlaying===L.FIRST&&this.state.indexFirstPlayerIsPlaying>=this.props.filesToPlay.length||this.state.playerPlaying===L.SECOND&&this.state.indexSecondPlayerIsPlaying>=this.props.filesToPlay.length,l=this.state.playerPlaying===L.FIRST&&!this.state.isFirstPlayerFileReadyToPlay||this.state.playerPlaying===L.SECOND&&!this.state.isSecondPlayerFileReadyToPlay,n=this.props.isLoading||l,r=a?0:this.state.playerPlaying===L.FIRST?this.props.filesToPlay[this.state.indexFirstPlayerIsPlaying].startTime:this.props.filesToPlay[this.state.indexSecondPlayerIsPlaying].startTime;return p.default.createElement(w.default,{priority:8,loading:n,backgroundStyle:e,foregroundStyle:t,isRenderChildrenWhileShowing:!0},!this.props.isLoading&&i&&p.default.createElement("div",null,p.default.createElement("div",{className:h.default.playerAreaContainer},p.default.createElement("div",{className:h.default.playerContainer},this.createPlayer(L.FIRST),this.createPlayer(L.SECOND)),p.default.createElement(j.default,{restImageSrc:_.default,activeImageSrc:g.default,imgClassName:h.default.closeBtn,wrappingDivClassName:h.default.closeBtnWrapper,onClick:this.props.onUserClosedPlayer})),p.default.createElement(N.default,{shouldPauseTime:this.state.isPaused,startTime:r,shouldShowTimestamp:!0,positionInMilli:this.state.currentPlayingFilePositionInMilli,durationInSeconds:this.state.currentFileDuration,label:this.props.labelForPlayer,clockTimezone:this.props.clockTimezone})),this.props.isLoading&&p.default.createElement("div",{className:h.default.emptyLoader}))}}]),t}(u.Component);x.defaultProps={isShow:!1,isLoading:!1,filesToPlay:[],labelForPlayer:"",onUserClosedPlayer:function(){},onFilePlayingChanged:function(){},onFinishedPlaylist:null,onErrorPlayingFile:function(){}},x.propTypes={isShow:d.default.bool.isRequired,isLoading:d.default.bool.isRequired,filesToPlay:d.default.array.isRequired,onFilePlayingChanged:d.default.func,onFinishedPlaylist:d.default.func,onUserClosedPlayer:d.default.func,onErrorPlayingFile:d.default.func,labelForPlayer:d.default.string,clockTimezone:d.default.string},t.default=x},195:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNyI+CiAgICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC4zOTQgOC44MDhsNi4wMjQtNi4wMjRhLjk4Ljk4IDAgMCAwIDAtMS4zODRsLS4yMTgtLjIxNWEuOTgzLjk4MyAwIDAgMC0xLjM4NCAwTDguNzk0IDcuMjA4IDIuNzY4IDEuMTgyYS45OC45OCAwIDAgMC0xLjM4MiAwbC0uMjE4LjIxOGEuOTg2Ljk4NiAwIDAgMCAuMDAxIDEuMzg2bDYuMDIyIDYuMDIyLTYuMDIzIDYuMDI1YS45ODMuOTgzIDAgMCAwIDAgMS4zODRsLjIxOC4yMTdhLjk4Mi45ODIgMCAwIDAgMS4zODIgMGw2LjAyNi02LjAyNSA2LjAyNCA2LjAyNWEuOTg0Ljk4NCAwIDAgMCAxLjM4NCAwbC4yMTYtLjIxOWEuOTc4Ljk3OCAwIDAgMCAwLTEuMzgybC02LjAyNC02LjAyNXoiLz4KPC9zdmc+Cg=="},196:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTEuOTk5cHgiIGhlaWdodD0iMTEuOTk5cHgiIHZpZXdCb3g9IjAgMCAxMS45OTkgMTEuOTk5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMS45OTkgMTEuOTk5IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjMzhCOEVBIiBkPSJNNy4yMTQsNmw0LjU2OS00LjU2OWMwLjI4OC0wLjI4OCwwLjI4OC0wLjc2Mi0wLjAwMS0xLjA1bC0wLjE2NS0wLjE2NGMtMC4yODktMC4yODgtMC43NjItMC4yODgtMS4wNSwwDQoJCQlMNiw0Ljc4NUwxLjQzMSwwLjIxNmMtMC4yODktMC4yODgtMC43NjEtMC4yODgtMS4wNSwwTDAuMjE3LDAuMzgxYy0wLjI4OCwwLjI5LTAuMjg4LDAuNzYyLDAuMDAxLDEuMDUxbDQuNTY3LDQuNTY3bC00LjU2OCw0LjU2OQ0KCQkJYy0wLjI4OSwwLjI5LTAuMjg5LDAuNzYzLDAsMS4wNTFsMC4xNjQsMC4xNjRjMC4yODgsMC4yODgsMC43NjEsMC4yODgsMS4wNSwwTDYsNy4yMTRsNC41NjksNC41NjkNCgkJCWMwLjI4OCwwLjI4OCwwLjc2LDAuMjg4LDEuMDQ5LDBsMC4xNjQtMC4xNjVjMC4yODktMC4yODgsMC4yODktMC43NjIsMC0xLjA1TDcuMjE0LDZ6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo="},197:function(e,t,i){var a=i(198);"string"==typeof a&&(a=[[e.i,a,""]]);var l={hmr:!0};l.transform=void 0;i(19)(a,l);a.locals&&(e.exports=a.locals)},198:function(e,t,i){t=e.exports=i(18)(!1),t.push([e.i,".music_player__playerContainer___1Kb1K{width:calc(100% - 15px);display:-ms-inline-flexbox;display:inline-flex;height:94px}.music_player__playerAreaContainer___1i-a6{display:-ms-flexbox;display:flex}.music_player__emptyLoader___2AVsC{min-height:114px}.music_player__rowContent___2yK48{width:100%;display:inline-block}.music_player__waveRowContainer___bHrlg{text-align:left;height:94px;width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.music_player__waveRowLeft___15jUh{text-align:center;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:row-reverse;flex-direction:row-reverse;-ms-flex-align:center;align-items:center;width:9%;margin-right:.5%}.music_player__repeatBtnImage___1BW24{position:relative;width:24px;height:18px;margin-right:14%}.music_player__playerSpeedBtnImage___38GZX{width:30px;height:15px;margin-right:8%}.music_player__hoverableBooButtonOverride___2HEGh{height:100%}.music_player__waveRowRight___3DC4Q{text-align:center;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:start;align-items:flex-start;padding-top:15px;width:8%;height:100%}.music_player__waveRowMiddle___2RQgu{text-align:center;display:inline-block;width:82.5%}.music_player__deviceText___2BtWj{color:#fff;font-size:13px;margin-bottom:.9765625vh;text-transform:capitalize}.music_player__inlineBlockCtrl___2gAWc{display:inline-block;vertical-align:middle;margin-right:1%}.music_player__playDownloadButtonsWrapper___3YgOd{display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle;margin-right:1%}.music_player__btnPlayPause___2iIRv{width:23px;min-width:23px;height:24px}.music_player__btnDownload___2Nsu_{position:relative;right:20px}.music_player__wave___1hF9N{width:80%}.music_player__rightSideButtons___2jdP4{right:2.3%}.music_player__closeBtn___1_5_3{height:15px!important;margin:0!important}.music_player__closeBtnWrapper___QgvWw{width:15px;display:-ms-inline-flexbox;display:inline-flex;z-index:1!important;margin-right:10px;margin-top:10px}.music_player__morePlayerBtn___bnnmV{padding-top:5.5px;padding-bottom:5.5px;margin-right:15%;width:22px;height:17px}.music_player__digitalClock___2pSTa{margin-top:.9765625vh}.music_player__hidePlayer___pmEUc{display:none}",""]),t.locals={playerContainer:"music_player__playerContainer___1Kb1K",playerAreaContainer:"music_player__playerAreaContainer___1i-a6",emptyLoader:"music_player__emptyLoader___2AVsC",rowContent:"music_player__rowContent___2yK48",waveRowContainer:"music_player__waveRowContainer___bHrlg",waveRowLeft:"music_player__waveRowLeft___15jUh",repeatBtnImage:"music_player__repeatBtnImage___1BW24",playerSpeedBtnImage:"music_player__playerSpeedBtnImage___38GZX",hoverableBooButtonOverride:"music_player__hoverableBooButtonOverride___2HEGh",waveRowRight:"music_player__waveRowRight___3DC4Q",waveRowMiddle:"music_player__waveRowMiddle___2RQgu",middleDiv:"music_player__middleDiv___30Tw3",deviceText:"music_player__deviceText___2BtWj",inlineBlockCtrl:"music_player__inlineBlockCtrl___2gAWc",playDownloadButtonsWrapper:"music_player__playDownloadButtonsWrapper___3YgOd",btnPlayPause:"music_player__btnPlayPause___2iIRv",btnDownload:"music_player__btnDownload___2Nsu_",wave:"music_player__wave___1hF9N",rightSideButtons:"music_player__rightSideButtons___2jdP4",closeBtn:"music_player__closeBtn___1_5_3",closeBtnWrapper:"music_player__closeBtnWrapper___QgvWw",morePlayerBtn:"music_player__morePlayerBtn___bnnmV",digitalClock:"music_player__digitalClock___2pSTa",thingName:"music_player__thingName___2Ew6c",hidePlayer:"music_player__hidePlayer___pmEUc"}},200:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),u=i(1),p=a(u),c=i(201),d=a(c),y=i(272),_=a(y),f=i(273),g=a(f),m=i(27),h=a(m),M=i(2),w=a(M),b=function(e){function t(e){n(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return i.render=function(){var e=p.default.createElement("span",null,p.default.createElement(_.default,{type:"bars",color:"#0da9f6"})),t=(0,h.default)(l({},g.default.invisible,!i.props.isRenderChildrenWhileShowing&&i.props.loading)),a=i.props.hasOwnProperty("defaultLoaderHeight")?{height:i.props.defaultLoaderHeight}:{};return p.default.createElement(d.default,{priority:i.props.priority||0,show:i.state.isLoading,backgroundStyle:i.props.backgroundStyle,foregroundStyle:i.props.foregroundStyle,hideContentOnLoad:!1,message:e},i.props.loading&&!i.props.isRenderChildrenWhileShowing?p.default.createElement("div",{style:a}):p.default.createElement("div",{className:t},i.props.children))},i.state={isLoading:e.loading},i.setIsLoading=i.setIsLoading.bind(i),i}return o(t,e),s(t,[{key:"setIsLoading",value:function(e){this.setState({isLoading:e})}},{key:"componentWillReceiveProps",value:function(e){e.loading!==this.state.isLoading&&this.setState({isLoading:e.loading})}}]),t}(u.Component);b.propTypes={priority:w.default.number,loading:w.default.bool,backgroundStyle:w.default.object,defaultLoaderHeight:w.default.string,foregroundStyle:w.default.object,isRenderChildrenWhileShowing:w.default.bool,children:w.default.node},t.default=b},273:function(e,t,i){var a=i(274);"string"==typeof a&&(a=[[e.i,a,""]]);var l={hmr:!0};l.transform=void 0;i(19)(a,l);a.locals&&(e.exports=a.locals)},274:function(e,t,i){t=e.exports=i(18)(!1),t.push([e.i,".custom_loader__invisible___1dil5{visibility:hidden}",""]),t.locals={invisible:"custom_loader__invisible___1dil5"}},275:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){var i=[],a=!0,l=!1,n=void 0;try{for(var r,o=e[Symbol.iterator]();!(a=(r=o.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){l=!0,n=e}finally{try{!a&&o.return&&o.return()}finally{if(l)throw n}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),p=i(1),c=a(p),d=i(2),y=a(d),_=i(276),f=a(_),g=i(277),m=a(g),h=i(278),M=a(h),w=i(279),b=a(w),I=i(27),C=a(I),j=function(e){function t(e){n(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return i.isStartedPlayingYet=!1,i}return o(t,e),u(t,[{key:"componentDidMount",value:function(){this.wavesurferOptions={container:"#waveform"+this.props.playerNumber,progressColor:"#4EBAF6",waveColor:"#6D747B",cursorWidth:0,height:70,normalize:!0,hideScrollbar:!0,responsive:!0},this.createPlayer(this.props.playerNumber)}},{key:"componentWillUnmount",value:function(){this.wavesurfer.destroy()}},{key:"componentWillReceiveProps",value:function(e){this.props.isPlaying!==e.isPlaying&&(e.isPlaying?this.wavesurfer.play():this.wavesurfer.pause()),this.props.fileUrl!==e.fileUrl&&(this.isStartedPlayingYet=!1,this.wavesurfer.load(e.fileUrl))}},{key:"createPlayer",value:function(){var e=this;this.wavesurfer=f.default.create(this.wavesurferOptions);var t={error:function(){e.props.onError(e.props.fileUrl)}.bind(this),ready:function(){e.props.onReady(e.props.playerNumber)}.bind(this),finish:function(){e.props.onFinish(e.props.playerNumber)}.bind(this),"waveform-ready":function(){e.props.onReady(e.props.playerNumber)}.bind(this),seek:function(t){e.props.onPosChange(t,e.props.playerNumber)}.bind(this),play:function(){e.isStartedPlayingYet||(e.isStartedPlayingYet=!0,e.props.onStartedPlaying(e.wavesurfer.getDuration()))}.bind(this)};Object.entries(t).forEach(function(t){var i=s(t,2),a=i[0],l=i[1];e.wavesurfer.on(a,l)}),this.wavesurfer.load(this.props.fileUrl)}},{key:"render",value:function(){var e=this,t=(0,C.default)(l({},b.default.hidePlayer,this.props.isHidden),b.default.hovering);return c.default.createElement("div",{className:t},c.default.createElement("div",{className:b.default.playerGrid},c.default.createElement("img",{src:this.props.isPaused?m.default:M.default,onClick:function(){return e.props.toggleIsPaused(!e.props.isPaused)},className:b.default.btnPlayPause}),c.default.createElement("div",{className:b.default.waveform,id:"waveform"+this.props.playerNumber})))}}]),t}(p.Component);j.propTypes={playerNumber:y.default.string.isRequired,fileUrl:y.default.string.isRequired,isHidden:y.default.bool.isRequired,isPlaying:y.default.bool.isRequired,isPaused:y.default.bool.isRequired,onError:y.default.func.isRequired,onReady:y.default.func.isRequired,onFinish:y.default.func.isRequired,onPosChange:y.default.func.isRequired,onStartedPlaying:y.default.func.isRequired,toggleIsPaused:y.default.func.isRequired},t.default=j},277:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTAuOTc5cHgiIGhlaWdodD0iMTEuOTk5cHgiIHZpZXdCb3g9IjAgMCAxMC45NzkgMTEuOTk5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMC45NzkgMTEuOTk5IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMC43OTgsNi4yMzljMC4yNDEtMC4xMzIsMC4yNDEtMC4zNDgsMC0wLjQ3OUwwLjQzNywwLjA1NUMwLjE5NS0wLjA3NywwLDAuMDM5LDAsMC4zMXYxMS4zOA0KCWMwLDAuMjcxLDAuMTk1LDAuMzg3LDAuNDM3LDAuMjU1TDEwLjc5OCw2LjIzOXoiLz4NCjwvc3ZnPg0K"},278:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTIuMDA5cHgiIGhlaWdodD0iMTIuMDA5cHgiIHZpZXdCb3g9IjAgMCAxMi4wMDkgMTIuMDA5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMi4wMDkgMTIuMDA5IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMi4wMDksMC41YzAtMC4yNzMtMC4yMjctMC41LTAuNTAyLTAuNUg3LjUwNWMtMC4yNzMsMC0wLjUsMC4yMjctMC41LDAuNXYxMS4wMDgNCgljMCwwLjI3NCwwLjIyNywwLjUwMSwwLjUsMC41MDFoNC4wMDJjMC4yNzUsMCwwLjUwMi0wLjIyNywwLjUwMi0wLjUwMVYwLjV6IE01LjAwMywwLjVjMC0wLjI3My0wLjIyNy0wLjUtMC41LTAuNUgwLjUwMQ0KCUMwLjIyNywwLDAsMC4yMjcsMCwwLjV2MTEuMDA4YzAsMC4yNzQsMC4yMjcsMC41MDEsMC41MDEsMC41MDFoNC4wMDJjMC4yNzMsMCwwLjUtMC4yMjcsMC41LTAuNTAxVjAuNXoiLz4NCjwvc3ZnPg0K"},279:function(e,t,i){var a=i(280);"string"==typeof a&&(a=[[e.i,a,""]]);var l={hmr:!0};l.transform=void 0;i(19)(a,l);a.locals&&(e.exports=a.locals)},280:function(e,t,i){t=e.exports=i(18)(!1),t.push([e.i,".music_file_player__playerGrid___1OMck{display:grid;grid-template-columns:42px;grid-template-rows:1fr;background-color:#3d4145;width:100%;margin:0;height:94px}.music_file_player__btnPlayPause___qIGkL{grid-column:1;width:17px;height:19px;margin:auto}.music_file_player__waveform___30cDr{grid-column:2;padding-top:12px;margin-right:50px}.music_file_player__hidePlayer___-Ggzw{visibility:hidden!important}.music_file_player__hovering___1PyZn{position:absolute;width:100%;display:-ms-flexbox;display:flex;height:114px}",""]),t.locals={playerGrid:"music_file_player__playerGrid___1OMck",btnPlayPause:"music_file_player__btnPlayPause___qIGkL",waveform:"music_file_player__waveform___30cDr",hidePlayer:"music_file_player__hidePlayer___-Ggzw",hovering:"music_file_player__hovering___1PyZn"}},281:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),u=i(1),p=a(u),c=i(2),d=a(c),y=i(282),_=a(y),f=i(27),g=a(f),m=i(284),h=a(m),M=i(66),w=function(e){function t(e){n(this,t);var i=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return i.onHover=i.onHover.bind(i),i.onHoverEnd=i.onHoverEnd.bind(i),i.state={isHovered:!1},i}return o(t,e),s(t,[{key:"onHover",value:function(){this.setState({isHovered:!0})}},{key:"onHoverEnd",value:function(){this.setState({isHovered:!1})}},{key:"render",value:function(){var e=this.props.isActive||this.state.isHovered?this.props.activeImageSrc:this.props.restImageSrc,t=(0,g.default)(_.default.wrapperDiv,l({},this.props.wrappingDivClassName,this.props.wrappingDivClassName)),i=(0,g.default)(_.default.btnImg,l({},this.props.imgClassName,this.props.imgClassName));return p.default.createElement("div",{className:t,"data-tip":this.props.tooltip&&M.I18n.t("indicator.tooltip."+this.props.tooltip),onClick:this.props.onClick,onMouseEnter:this.onHover,onMouseLeave:this.onHoverEnd},this.props.tooltip&&p.default.createElement(h.default,{effect:"solid",type:"dark"}),p.default.createElement("img",{src:e,className:i}))}}]),t}(u.Component);w.propTypes={restImageSrc:d.default.string.isRequired,activeImageSrc:d.default.string.isRequired,onClick:d.default.func.isRequired,imgClassName:d.default.string,wrappingDivClassName:d.default.string,isActive:d.default.bool,tooltip:d.default.string},t.default=w},282:function(e,t,i){var a=i(283);"string"==typeof a&&(a=[[e.i,a,""]]);var l={hmr:!0};l.transform=void 0;i(19)(a,l);a.locals&&(e.exports=a.locals)},283:function(e,t,i){t=e.exports=i(18)(!1),t.push([e.i,".hoverable_button__wrapperDiv___2TNNJ{cursor:pointer;height:30px;display:-ms-inline-flexbox;display:inline-flex}.hoverable_button__btnImg___2zGMx{display:inline-block;height:75%;margin:auto}",""]),t.locals={wrapperDiv:"hoverable_button__wrapperDiv___2TNNJ",btnImg:"hoverable_button__btnImg___2zGMx"}},303:function(e,t){},323:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),s=i(1),u=a(s),p=i(324),c=a(p),d=i(327),y=a(d),_=i(2),f=a(_),g=i(329),m=a(g),h=i(330),M=a(h),w=i(331),b=a(w),I=function(e){function t(e){l(this,t);var i=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return i.onTimestampCopied=function(){i.props.onTimestampCopiedToClipboard&&i.props.onTimestampCopiedToClipboard(i.props.startTime)},i.state={isCopyButtonHovered:!1},e.clockTimezone&&c.default.tz.setDefault(e.clockTimezone),i}return r(t,e),o(t,[{key:"startUpdatingTime",value:function(){this.timeUpdatingMethodID=window.setInterval(function(){var e=100*this.props.playerSpeed;this.positionInMilli&&(this.positionInMilli.add(e,"ms"),document.getElementById("playerClockPosition")&&(document.getElementById("playerClockPosition").textContent=this.positionInMilli.format("s.S"))),this.time&&(this.time.add(e,"ms"),document.getElementById("playerClockTime")&&(document.getElementById("playerClockTime").textContent=this.time.format("H:mm:ss.S")),document.getElementById("playerClockDate")&&(document.getElementById("playerClockDate").textContent="/ "+this.time.format("dddd, MMMM Do, YYYY")))}.bind(this),100)}},{key:"stopUpdatingTime",value:function(){this.timeUpdatingMethodID&&clearInterval(this.timeUpdatingMethodID),document.getElementById("playerClockPosition")&&(document.getElementById("playerClockPosition").textContent="0.0")}},{key:"render",value:function(){var e=this;this.stopUpdatingTime(),this.time=(0,c.default)(this.props.startTime+this.props.positionInMilli),this.positionInMilli=c.default.utc(this.props.positionInMilli);var t=this.props.durationInSeconds,i=Math.floor(t%60),a=(10*(t-Math.floor(t))).toFixed(0),l=i+"."+a;return this.props.shouldPauseTime||this.startUpdatingTime(),u.default.createElement("div",{className:y.default.playerBottomContainer},u.default.createElement("div",{className:y.default.playerBottomContent},u.default.createElement("div",{className:y.default.playerBottomLeft},u.default.createElement("div",null,u.default.createElement("div",{id:"playerClockPosition",className:y.default.playerBottomPanelElapsed},this.positionInMilli.format("s.S")),u.default.createElement("div",{className:y.default.playerBottomPanelLength},"/ "+l)),u.default.createElement("div",null,u.default.createElement("div",{id:"playerClockTime",className:y.default.playerBottomPanelTime},this.time.format("H:mm:ss.S")),u.default.createElement("div",{id:"playerClockDate",className:y.default.playerBottomPanelDate},"/ "+this.time.format("dddd, MMMM Do, YYYY")))),u.default.createElement("div",{className:y.default.playerBottomCenter},u.default.createElement("div",{className:y.default.playerBottomPanelElapsed},"Timestamp:"),u.default.createElement(b.default,{text:""+this.props.startTime},u.default.createElement("div",{className:this.state.isCopyButtonHovered?y.default.playerBottomPanelTimestampContentActive:y.default.playerBottomPanelTimestampContentNormal,onClick:this.onTimestampCopied,onMouseOver:function(){return e.setState({isCopyButtonHovered:!0})},onMouseLeave:function(){return e.setState({isCopyButtonHovered:!1})}},u.default.createElement("div",{className:y.default.playerBottomPanelTimestampValue},this.props.startTime),u.default.createElement("img",{style:{marginBottom:"2px"},alt:"copy",src:this.state.isCopyButtonHovered?m.default:M.default})))),u.default.createElement("div",{className:y.default.playerBottomRight},u.default.createElement("div",{className:y.default.playerBottomPanelLabel},this.props.label))))}},{key:"componentWillUnmount",value:function(){this.stopUpdatingTime()}}]),t}(s.Component);I.defaultProps={shouldShowTimestamp:!0,label:"",playerSpeed:1},I.propTypes={shouldPauseTime:f.default.bool.isRequired,startTime:f.default.number.isRequired,shouldShowTimestamp:f.default.bool,positionInMilli:f.default.number.isRequired,durationInSeconds:f.default.number.isRequired,label:f.default.string,playerSpeed:f.default.number,clockTimezone:f.default.string,onTimestampCopiedToClipboard:f.default.func},t.default=I},327:function(e,t,i){var a=i(328);"string"==typeof a&&(a=[[e.i,a,""]]);var l={hmr:!0};l.transform=void 0;i(19)(a,l);a.locals&&(e.exports=a.locals)},328:function(e,t,i){t=e.exports=i(18)(!1),t.push([e.i,".player_digital_clock__playerBottomContainer___phS7E{width:100%;background:#c9ced6}.player_digital_clock__playerBottomContent___2pUlU{width:85%;display:-ms-flexbox;display:flex;font-size:13px;margin:auto;white-space:nowrap;-ms-flex-pack:justify;justify-content:space-between;position:relative}.player_digital_clock__playerBottomLeft___22d0f{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:justify;justify-content:space-between;left:0;width:29%;max-width:calc(50% - 135px);overflow:hidden;position:absolute}.player_digital_clock__playerBottomPanelElapsed___Tcw7S{display:inline-block;font-weight:700}.player_digital_clock__playerBottomPanelLength___1ybVG{display:inline-block;margin-right:5px;margin-left:5px}.player_digital_clock__playerBottomPanelTime___3BMEt{display:inline-block;font-weight:700}.player_digital_clock__playerBottomPanelDate___3p0P6{display:inline-block;margin-left:5px}.player_digital_clock__playerBottomCenter___AVati{margin:auto;width:270px}.player_digital_clock__playerBottomPanelTimestampContentNormal___1MRwD{display:inline-block;background-color:#dee2e8;color:#313438;margin-left:14px;padding-left:11px;padding-right:11px;cursor:pointer}.player_digital_clock__playerBottomPanelTimestampContentActive___1kb2c{display:inline-block;background-color:#fff;color:#52b8f0;margin-left:14px;padding-left:11px;padding-right:11px;cursor:pointer}.player_digital_clock__playerBottomPanelTimestampValue___2zPlD{display:inline-block;margin-left:13px;margin-right:13px}.player_digital_clock__playerBottomRight___2QGhG{position:absolute;right:0;max-width:calc(50% - 135px);overflow:hidden}.player_digital_clock__playerBottomPanelLabel___1xKGC{text-transform:capitalize}",""]),t.locals={playerBottomContainer:"player_digital_clock__playerBottomContainer___phS7E",playerBottomContent:"player_digital_clock__playerBottomContent___2pUlU",playerBottomLeft:"player_digital_clock__playerBottomLeft___22d0f",playerBottomPanelElapsed:"player_digital_clock__playerBottomPanelElapsed___Tcw7S",playerBottomPanelLength:"player_digital_clock__playerBottomPanelLength___1ybVG",playerBottomPanelTime:"player_digital_clock__playerBottomPanelTime___3BMEt",playerBottomPanelDate:"player_digital_clock__playerBottomPanelDate___3p0P6",playerBottomCenter:"player_digital_clock__playerBottomCenter___AVati",playerBottomPanelTimestampContentNormal:"player_digital_clock__playerBottomPanelTimestampContentNormal___1MRwD",playerBottomPanelTimestampContentActive:"player_digital_clock__playerBottomPanelTimestampContentActive___1kb2c",playerBottomPanelTimestampValue:"player_digital_clock__playerBottomPanelTimestampValue___2zPlD",playerBottomRight:"player_digital_clock__playerBottomRight___2QGhG",playerBottomPanelLabel:"player_digital_clock__playerBottomPanelLabel___1xKGC"}},329:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+CiAgICA8cGF0aCBmaWxsPSIjNTJCOEYwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS45MTguNTU5SDQuOTI5Yy0uNTgyIDAtMS4xNjUuNTc0LTEuMTY1IDEuMTQ5djEuNDcxSDEuODcxYy0uNTgyIDAtMS4xNjUuNTc1LTEuMTY1IDEuMTVWMTEuMjIxYzAgLjU3NC41ODMgMS4xNDggMS4xNjUgMS4xNDhoNi45OWMuNTgyIDAgMS4xNjQtLjU3NCAxLjE2NC0xLjE0NlY5Ljc0OGgxLjg5M2MuNTgzIDAgMS4xNjUtLjU3NCAxLjE2NS0xLjE0NlYxLjcwOGMwLS41NzUtLjU4Mi0xLjE0OS0xLjE2NS0xLjE0OXpNOC44NjEgOC42djIuMDQ1YzAgLjI4OC0uMjkyLjU3Ni0uNTgzLjU3NkgyLjQ1NGMtLjI5MiAwLS41ODMtLjI4OC0uNTgzLS41NzZWNC45MDNjMC0uMjg4LjI5MS0uNTc0LjU4My0uNTc0aDUuODI0Yy4yOTEgMCAuNTgzLjI4Ni41ODMuNTc0VjguNnptMy4wNTctLjU3NGMwIC4yODctLjI5MS41NzQtLjU4MS41NzRoLTEuMzEyVjQuMzI5YzAtLjU3NS0uNTgyLTEuMTUtMS4xNjQtMS4xNUg0LjkyOXYtLjg5N2MwLS4yODcuMjkxLS41NzQuNTgzLS41NzRoNS44MjVjLjI5IDAgLjU4MS4yODcuNTgxLjU3NHY1Ljc0NHoiLz4KPC9zdmc+Cg=="},330:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+CiAgICA8cGF0aCBmaWxsPSIjMzEzNDM4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS45MTguNTU5SDQuOTI5Yy0uNTgyIDAtMS4xNjUuNTc0LTEuMTY1IDEuMTQ5djEuNDcxSDEuODcxYy0uNTgyIDAtMS4xNjUuNTc1LTEuMTY1IDEuMTVWMTEuMjIxYzAgLjU3NC41ODMgMS4xNDggMS4xNjUgMS4xNDhoNi45OWMuNTgyIDAgMS4xNjQtLjU3NCAxLjE2NC0xLjE0NlY5Ljc0OGgxLjg5M2MuNTgzIDAgMS4xNjUtLjU3MyAxLjE2NS0xLjE0NlYxLjcwOGMwLS41NzUtLjU4Mi0xLjE0OS0xLjE2NS0xLjE0OXpNOC44NjEgOC42djIuMDQ1YzAgLjI4OC0uMjkyLjU3Ni0uNTgzLjU3NkgyLjQ1NGMtLjI5MiAwLS41ODMtLjI4OC0uNTgzLS41NzZWNC45MDNjMC0uMjg4LjI5MS0uNTc0LjU4My0uNTc0aDUuODI0Yy4yOTEgMCAuNTgzLjI4Ni41ODMuNTc0VjguNnptMy4wNTctLjU3NGMwIC4yODctLjI5MS41NzQtLjU4MS41NzRoLTEuMzEyVjQuMzI5YzAtLjU3NS0uNTgyLTEuMTUtMS4xNjQtMS4xNUg0LjkyOXYtLjg5N2MwLS4yODcuMjkxLS41NzQuNTgzLS41NzRoNS44MjVjLjI5IDAgLjU4MS4yODcuNTgxLjU3NHY1Ljc0NHoiLz4KPC9zdmc+Cg=="}},[192])});