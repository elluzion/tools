const MusicPlatforms = [
  'amazon',
  'apple',
  'deezer',
  'pandora',
  'soundcloud',
  'spotify',
  'tidal',
  'youtube',
] as const;
type MusicPlatformsType = (typeof MusicPlatforms)[number];

const SocialPlatforms = ['discord', 'instagram'];
type SocialPlatformsType = (typeof SocialPlatforms)[number];

const Platforms = [...MusicPlatforms, ...SocialPlatforms];
type PlatformsType = (typeof Platforms)[number];

export { MusicPlatforms, Platforms, SocialPlatforms };
export type { MusicPlatformsType, PlatformsType, SocialPlatformsType };
export default Platforms;
