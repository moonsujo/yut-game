import { useEffect, useState } from "react";

export default function useMusicPlayer() {
  // playlist

  const [songTimeout, setSongTimeout] = useState(null);
  const [songIndex, setSongIndex] = useState(0);

  // length: seconds
  const songs = [
    {
      'title': 'Magnetic (Lofi) - Illit, itsyu',
      'source': 'itsyu youtube',
      'path': 'sounds/music/magnetic-lofi.mp3',
      'length': 94
    },
    {
      'title': 'Touch (Lofi) - Katseye, kisa',
      'source': 'kisa youtube',
      'path': 'sounds/music/touch-lofi.mp3',
      'length': 99
    }
  ]

  function playMusic() {

    // function playRandomSong() {
    //   const randomSong = songs[Math.floor(Math.random() * songs.length)]
    //   playSong(randomSong.path)
    //   const audioTimeout = setTimeout(() => {
    //     playRandomSong();
    //   }, randomSong.length * 1000)
    //   setAudioTimeout(audioTimeout)
    // }

    // playRandomSong();

    // play songs in order
    const song = songs[songIndex]
    playSong(song.path)
    const songTimeout = setTimeout(() => {
      let nextSongIndex;
      if (songIndex+1 === songs.length) {
        nextSongIndex = 0;
      } else {
        nextSongIndex = songIndex++;
      }
      const nextSong = songs[nextSongIndex]
      playSong(nextSong.path)
      setSongIndex(nextSongIndex)
    }, song.length * 1000)
    setSongTimeout(songTimeout)
  }

  useEffect(() => {
    return () => {
      clearTimeout(audioTimeout);
    }
  }, [])

  function playSong(path) {
    const audio = new Audio(path);
    audio.volume=0.3;
    audio.play();
  }

  return [playMusic]
}