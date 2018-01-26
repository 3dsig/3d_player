import React from 'react';
import MusicPlayer from 'components/music_player/music_player';
import bearGrowlFile from 'audio/bear_growl_y.wav';
import birdFile from 'audio/bird.wav';
import bisonFile from 'audio/bison.wav';
import catlFile from 'audio/cat_fight.wav';

import {storiesOf} from '@storybook/react';

storiesOf('MusicFilePlayer', module)
    .add('basic', () => {
            const filesToPlay = [
                {url: bearGrowlFile, startTime: 123456789},
                {url: birdFile, startTime: 123456789},
                {url: bisonFile, startTime: 123456789}];
            return (
                <div className="my-component">
                    <MusicPlayer
                        isShow={true}
                        filesToPlay={filesToPlay}
                        isLoading={false}
                        labelForPlayer={'shahar is awsome'}
                    />
                </div>
            )
        }
    )
;
