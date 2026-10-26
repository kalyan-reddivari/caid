// Real recordings shown on the public site. Put the files in public/media/ and set their paths here.
// Leave a slot empty ('') to keep the animated illustration that shows in its place.
//
//   src     MP4 (H.264) video, plays muted and looped like a GIF
//   webm    optional WebM version of the same video (smaller; tried first)
//   gif     animated GIF, used only when there is no video
//   poster  still image shown before the video loads (JPG/PNG/WebP)
//   ratio   width / height of the recording, e.g. '16 / 9' or '4 / 3'

const MEDIA = {
  // How we build: "Watch a feature go from spec to staging"
  deliveryDemo: {
    src: '', // e.g. '/media/delivery-demo.mp4'
    webm: '',
    gif: '',
    poster: '',
    ratio: '16 / 9',
    caption: 'A feature going from spec to staging with our AI-driven lifecycle.',
  },

  // AI Academy: "Inside a lab"
  academyLab: {
    src: '', // e.g. '/media/academy-lab.mp4'
    webm: '',
    gif: '',
    poster: '',
    ratio: '16 / 9',
    caption: 'A trainee working through a spec-driven lab with a coach and an AI pair.',
  },

  // Home: "Meet the team" (the section only appears once a file is set)
  teamIntro: {
    src: '', // e.g. '/media/team-intro.mp4'
    webm: '',
    gif: '',
    poster: '',
    ratio: '16 / 9',
    caption: 'Meet the people who build with CAID.',
  },
};

export default MEDIA;

export const hasMedia = (slot) => !!(slot.src || slot.webm || slot.gif);
