//SEE ANGEL CODE EXAMPLES! No documentation will be provided.
function CloudRenderer(gl) {
  this.program = initShaders(gl, 'cloudVShader', 'cloudFShader');

  this.maxNumVertices = 200;
  this.index = 0;
  this.numPolygons = 0;
  this.numIndices = [];
  this.numIndices[0] = 0;
  this.start = [0];

  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, 8 * this.maxNumVertices, gl.STATIC_DRAW);

  this.addVertex = function (canvas, event) {
    var t = vec2(2 * event.clientX / canvas.width - 1, 2 * (canvas.height - event.clientY) / canvas.height - 1);
    if (t[1] < 0.0) {
      t[1] = 0.0;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 8 * this.index, flatten(t));
    this.numIndices[this.numPolygons]++;
    this.index++;
  };

  this.finishCloud = function () {
    this.numPolygons++;
    this.numIndices[this.numPolygons] = 0;
    this.start[this.numPolygons] = this.index;
  };

  this.render = function (isDay) {
    gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    var positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(positionAttribLocation);
    for (var i = 0; i < this.numPolygons; i++) {
      gl.drawArrays(gl.TRIANGLE_FAN, this.start[i], this.numIndices[i]);
    }
  };
}