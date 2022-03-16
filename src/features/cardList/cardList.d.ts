declare module 'types' {
  interface GrabItem {
    width: number;
    height: number;
    x: number;
    y: number;
    clientX: number;
    clientY: number;
    data: CardItem;
  }

  interface Vec2 {
    x: number;
    y: number;
  }
}
