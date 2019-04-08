function Bobble(gl) {
  //Create 2 buffers, one for the trunk of the bobble, another one for the
  //leaves of the bobble.
  //Reason:
  //trunk render mode -> gl.TRIANGLES
  //leaves render mode -> gl_TRIANGLE_FAN
  //also, easier to keep track of vertex count etc.
  this.trunkVertexBuffer = gl.createBuffer();
  this.leafVertexBuffer = gl.createBuffer();

  this.trunkVertexCount = 0;
  this.leafVertexCount = 0;

  this.initializeBobble = function (x, y, xOffset, yOffset, circleVertices) {
    //Vertices of a simple quad
    var trunkVertices = [
      x, y,
      x + xOffset, y + yOffset,
      x, y + yOffset,
      x, y,
      x + xOffset, y,
      x + xOffset, y + yOffset,
    ];
    this.trunkVertexCount = trunkVertices.length / 2;
    this.leafVertexCount = circleVertices.length / 2;

    //Bind the trunkVBuffer and write trunkVertices.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.trunkVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trunkVertices), gl.STATIC_DRAW);

    //Bind the leavesVBuffer and write leavesVertices.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.leafVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circleVertices), gl.STATIC_DRAW);
  };

  this.getTrunkVertexCount = function () {
    return this.trunkVertexCount;
  };

  this.getLeafVertexCount = function () {
    return this.leafVertexCount;
  };

  this.getTrunkVertexBuffer = function () {
    return this.trunkVertexBuffer;
  };

  this.getLeafVertexBuffer = function () {
    return this.leafVertexBuffer;
  };
}