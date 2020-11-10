export interface Room {
  width?: number;
  dept?: number;
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
}
