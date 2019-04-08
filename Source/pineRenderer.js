function PineRenderer(gl) {
  this.trees = [];
  this.program = initShaders(gl, 'pineVShader', 'pineFShader');

  this.createPines = function () {
    for (var i = 0; i < 30; i++) {
      var tree = new Pine(gl);
      tree.initializePine(-1 + i * 0.07 + Math.random() * 0.02, -0.42 + Math.random() * 0.05, 0.016, 0.2, -1);
      this.trees.push(tree);
    }
    for (var i = 0; i < 25; i++) {
      var tree = new Pine(gl);
      tree.initializePine(-1.12 + i * 0.12 + Math.random() * 0.02, -0.5 + Math.random() * 0.05, 0.016, 0.2, 0);
      this.trees.push(tree);
    }
  };

  this.render = function (isDay) {
    for (var i = 0; i < this.trees.length; i++) {
      gl.useProgram(this.program);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.trees[i].getVertexBuffer());
      var positionAttribLocation = gl.getAttribLocation(this.program, 'vPosition');
      gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(positionAttribLocation);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.trees[i].getColorBuffer());
      var colorAttribLocation = gl.getAttribLocation(this.program, 'vColor');
      gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(colorAttribLocation);

      var isDayLocation = gl.getUniformLocation(this.program, 'isDay');
      gl.uniform1f(isDayLocation, isDay);
      gl.drawArrays(gl.TRIANGLES, 0, this.trees[i].getVertexCount());
    }
  };
}