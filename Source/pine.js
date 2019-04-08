function Pine(gl) {
  this.vertexBuffer = gl.createBuffer();
  this.colorBuffer = gl.createBuffer();
  this.vertexCount = 0;

  this.initializePine = function (x, y, xOffset, yOffset, series) {
    var trunkVertices = [
      x, y,
      x + xOffset, y + yOffset,
      x, y + yOffset,
      x, y,
      x + xOffset, y,
      x + xOffset, y + yOffset,
    ];
    this.vertexCount = trunkVertices.length / 2;
    var leafVertices = [
      x - 3 * xOffset, y + yOffset / 2,
      x + 4 * xOffset, y + yOffset / 2,
      x + xOffset / 2, y + yOffset,

      x - 3 * xOffset, y + yOffset * 0.8,
      x + 4 * xOffset, y + yOffset * 0.8,
      x + xOffset / 2, y + yOffset * 1.3,

      x - 3 * xOffset, y + yOffset * 1.1,
      x + 4 * xOffset, y + yOffset * 1.1,
      x + xOffset / 2, y + yOffset * 1.6,
    ];
    this.vertexCount += leafVertices.length / 2;
    var vertices = trunkVertices.concat(leafVertices);

    var colors = [];
    for (var i = 0; i < vertices.length / 2; i++) {
      if (i < trunkVertices.length / 2) {
        colors.push(vec4(0.5, 0.2, 0.05, 1.0));
      } else {
        colors.push(vec4(0.15 + series / 15, 0.3 + series / 15, 0.15 + series / 15, 1.0));
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
  };

  this.getVertexCount = function () {
    return this.vertexCount;
  };

  this.getVertexBuffer = function () {
    return this.vertexBuffer;
  };

  this.getColorBuffer = function () {
    return this.colorBuffer;
  };
}