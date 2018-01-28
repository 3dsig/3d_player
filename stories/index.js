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
                {url: bearGrowlFile, startTime: 1517135053000},
                {url: birdFile, startTime: 1517135053000},
                {url: bisonFile, startTime: 1517135053000}];
            return (
                <div className="my-component">
                    <MusicPlayer
                        isShow={true}
                        filesToPlay={filesToPlay}
                        isLoading={false}
                        labelForPlayer={'shahar is awsome'}
                        clockTimezone={'Europe/Rome'}
                    />
                </div>
            )
        }
    )
;
