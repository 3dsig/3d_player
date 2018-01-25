import React from 'react';

import { storiesOf } from '@storybook/react';

import MusicFilePlayer from "components/music_file_player/music_file_player";

storiesOf('MusicFilePlayer', module)
    .add('basic', () =>
        <MusicFilePlayer/>
    );
