import { Component, Input, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { LogService } from 'src/app/services/log.service';
import { UsersService } from 'src/app/services/users.service';
import { Args, WSService } from 'src/app/services/ws.service';
import { Lean } from 'src/app/types/entity-types';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent {
  @Input() public tab: TabType;

  public get blockedUsers() {
    return this.users.user.ignored?.userIds
      ?.map(id => this.users.getKnown(id));
  }
  public get friendRequests() {
    return this.users.user.friendRequestIds
      .map(id => this.users.getKnown(id));
  }
  public get friends() {
    return this.users.getFriends();
  }
  public get onlineFriends() {
    return this.users
      .getFriends()
      .filter(f => f.status !== 'OFFLINE');
  }

  constructor(
    public channelService: ChannelService,
    private log: LogService,
    public users: UsersService,
    private ws: WSService,
  ) {}

  public updateFriends({ sender, friend }: { sender: Lean.User, friend: Lean.User }) {
    this.users.upsertCached(sender._id, sender);
    this.users.upsertCached(friend._id, friend);
  }

  public getFriend(id: string) {
    return this.friends.find(f => f._id === id);
  }

  public async add(username: string) {
    try {
      await this.ws.emitAsync('ADD_FRIEND', { username }, this);      
      await this.log.success();
    } catch (error) {
      await this.log.error(error.message);
    }
  }
  public async remove(friendId: string) {
    try {
      await this.ws.emitAsync('REMOVE_FRIEND', { friendId }, this);      
      await this.log.success();
    } catch (error) {
      await this.log.error(error.message);
    }
  }

  public isOutgoing(friend: Lean.User) {
    return this.users.user.friendRequestIds.includes(friend._id);
  }
}

export type TabType = 'ONLINE' | 'ALL' | 'PENDING' | 'BLOCKED';
