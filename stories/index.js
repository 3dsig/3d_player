import React from 'react';
import MusicPlayer from 'components/music_player/music_player';
import bearGrowlFile from 'audio/bear_growl_y.wav';
import birdFile from 'audio/bird.wav';
import bisonFile from 'audio/bison.wav';
import catlFile from 'audio/cat_fight.wav';

import {storiesOf} from '@storybook/react';

storiesOf('MusicFilePlayer', module)
    .add('basic', () => {
        const filesToPlay = [bearGrowlFile, birdFile, bisonFile];
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
)
;
