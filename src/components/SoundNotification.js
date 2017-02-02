/**
 * Created by bharatbatra on 2/2/17.
 */
import React from 'react';

const SoundNotification = (props) => (
  <audio hidden controls autoPlay>
    <source src={require('../mp3/going-up.mp3')} type="audio/mpeg" autoPlay="autoPlay"/>
  </audio>
);

export default SoundNotification;