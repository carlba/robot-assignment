export interface Room {
  width?: number;
  depth?: number;
}

export class RoomService {
  room: Room;
  constructor() {
    this.room = {};
  }

  update(room: Room) {
    this.room = room;
    return room;
  }

  get() {
    return this.room;
  }
}
