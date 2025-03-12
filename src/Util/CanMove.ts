export const canMove = (x: number, y: number, currentSprite: any, collisionMap: any, tileSize: number) => {
  const playerWidth = currentSprite.width;
  const playerHeight = currentSprite.height;

  const corners = [
    { x: x - playerWidth / 2, y: y - playerHeight / 2 },
    { x: x + playerWidth / 2, y: y - playerHeight / 2 },
    { x: x - playerWidth / 2, y: y + playerHeight / 2 },
    { x: x + playerWidth / 2, y: y + playerHeight / 2 }
  ];

  return corners.every(corner => {
    const tileX = Math.floor(corner.x / tileSize);
    const tileY = Math.floor(corner.y / tileSize);

    if (
      tileY < 0 || tileY >= collisionMap.value.length ||
      tileX < 0 || tileX >= collisionMap.value[0].length
    ) {
      return false;
    }

    return collisionMap.value[tileY][tileX] === 0;
  });
};
