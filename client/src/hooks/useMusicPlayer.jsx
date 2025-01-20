import { useEffect, useState } from "react";

export default function useMusicPlayer() {
  // playlist

  const [songTimeout, setSongTimeout] = useState(null);
  // const [songIndex, setSongIndex] = useState(0);

  // length: seconds
  const songs = [
    {
      'title': 'Magnetic (Lofi)',
      'artist': 'Illit, itsyu',
      'source': 'itsyu youtube',
      'path': 'sounds/music/magnetic-lofi.mp3',
      'length': 94
    },
    {
      'title': 'Touch (Lofi)',
      'artist': 'Katseye, kisa',
      'source': 'kisa youtube',
      'path': 'sounds/music/touch-lofi.mp3',
      'length': 99
    },
    {
      'title': 'Hype Boy (Lofi)',
      'artist': 'New Jeans, DANI.HZ',
      'source': '다니헤르츠 DANI.HZ youtube',
      'path': 'sounds/music/hype-boy-lofi.mp3',
      'length': 214
    },
    {
      'title': 'ASAP (Lofi)',
      'artist': 'New Jeans, DANI.HZ',
      'source': '다니헤르츠 DANI.HZ youtube',
      'path': 'sounds/music/asap-lofi.mp3',
      'length': 175
    },
    {
      'title': 'Merry Go Round',
      'artist': 'Korean Folk Song / Beat Rhino',
      'source': 'Beat Rhino',
      'path': 'sounds/music/mingle-song-music-box.mp3',
      'length': 67
    }
  ]

  function playMusic() {

    // every client has a different song playing
    function playRandomSong() {
      const randomSong = songs[Math.floor(Math.random() * songs.length)]
      playAudio(randomSong.path)
      const songTimeout = setTimeout(() => {
        playRandomSong();
      }, randomSong.length * 1000)
      setSongTimeout(songTimeout)
    }

    playRandomSong();

    // play songs in order
    // not playing the next song
    // function playSong() {
    //   const song = songs[songIndex]
    //   playAudio(song.path)
    //   const songTimeout = setTimeout(() => {
    //     let nextSongIndex;
    //     if (songIndex+1 === songs.length) {
    //       nextSongIndex = 0;
    //     } else {
    //       nextSongIndex = songIndex+1;
    //     }
    //     setSongIndex(nextSongIndex)
    //     playSong()
    //   }, 10 * 1000)
    //   setSongTimeout(songTimeout)
    // }

    // playSong();
  }

  useEffect(() => {
    return () => {
      clearTimeout(songTimeout);
    }
  }, [])

  function playAudio(path) {
    const audio = new Audio(path);
    audio.volume=0.3;
    audio.play();
  }

  return [playMusic]
}