import { Channel } from '@anichat/backend/data/models/channel';
import { Guild } from '@anichat/backend/data/models/guild';
import { GuildMember } from '@anichat/backend/data/models/guild-member';
import { Role } from '@anichat/backend/data/models/role';
import { User } from '@anichat/backend/data/models/user';

export default () => Promise.all([
  Channel.deleteMany(),
  Guild.deleteMany(),
  GuildMember.deleteMany(),
  Role.deleteMany(),
  User.deleteMany(),
]);