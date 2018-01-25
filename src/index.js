// Demo component
// this is only example component

import React from 'react';
import MusicPlayer from 'components/music_player/music_player';
// import bearGrowlFile from 'audio/bear_growl_y.wav';
// import birdFile from 'audio/bird.wav';
// import bisonFile from 'audio/bison.wav';
// import catlFile from 'audio/cat_fight.wav';

class MyComponent extends React.Component {
    
    render() {
        const filesToPlay = []// [bearGrowlFile, birdFile, bisonFile, catlFile];
        return (
            <div className="my-component">
                <MusicPlayer
                isShow={true}
                filesToPlay={filesToPlay}
                isLoading={false}
                />
            </div>
        )
    }
}

export default MyComponent;