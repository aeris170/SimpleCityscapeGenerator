window.onload = function () {
  //Get the references of canvas and slider objects
  var canvas = document.getElementById('render-surface');
  var houseCountSlider = document.getElementById('hcSlider');
  var maxStoreyCountSlider = document.getElementById('mscSlider');

  //Get the webgl context
  var gl = canvas.getContext('webgl');

  //If webgl context is not available, try experimental-webgl context
  if (!gl) {
    console.log('Using experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
  }

  //If webgl context is still not available, alert the user
  if (!gl) {
    alert('Your browser doesn\'t support WEBGL');
  }

  //MouseListener to canvas. LMB adds a new vertex, RMB joins them and renders.
  canvas.addEventListener('mousedown', function (event) {
    if (event.button === 0) {
      masterRenderer.getCloudRenderer().addVertex(canvas, event);
    } else if (event.button === 2) {
      masterRenderer.getCloudRenderer().finishCloud();
      render(masterRenderer, gl);
    }
  });

  //ClickListener to generateButton. When clicked re-initializes the masterRenderer.
  document.getElementById('generateButton').onclick = function () {
    //Check if the slider values are in range, if not display an alert.
    if (0 < houseCountSlider.value && houseCountSlider.value < 5 && 0 < maxStoreyCountSlider.value && maxStoreyCountSlider.value < 7) {
      masterRenderer.reset();
      render(masterRenderer, gl);
    } else {
      alert('Disallowed slider values!!\nNumber of houses -> [1-4]\nMax number of storeys -> [1-6]');
    }
  };

  //ClickListener to day/night. When clicked toggles the color pallette.
  document.getElementById('day/night').onclick = function () {
    masterRenderer.setDayNight();
    render(masterRenderer, gl);
  };

  //ClickListener to saveButton. When clicked writes colors and storeys of
  //houses to a file and saves to local storage.
  document.getElementById('saveButton').onclick = function () {
    var text = '';
    var filename = 'cityscape.txt';
    var hr = masterRenderer.getHouseRenderer();
    var i;
    for (i = 0; i < houseCountSlider.value; i++) {
      text += hr.getHouseData(i) + '\r\n';
    }
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  //ChangeListener to loadButton. When changed delete all houses and bobbles,
  //create new houses from loaded txt file and place new bobbles accordingly.
  document.getElementById('loadButton').onchange = function (event) {
    var file = event.target.files[0]; // File object
    var reader = new FileReader();
    reader.onload = function () {
      var hr = masterRenderer.getHouseRenderer();
      hr.deleteHouses();
      var lines = this.result.split(/[\r\n]+/g);
      for (var i = 0; i < lines.length - 1; i++) {
        var values = lines[i].split(' ');
        hr.setHouse(i, vec4(values[0], values[1], values[2], values[3]), values[4]);
      }
      masterRenderer.getBobbleRenderer().updateBobbles(canvas, lines.length - 1);
      render(masterRenderer, gl);
    };
    reader.readAsText(file);
  };

  //Set the background color of webgl context.
  gl.clearColor(0.0, 0.7, 0.95, 1.0);

  //Initialize masterRenderer and render using webgl context.
  var masterRenderer = new MasterRenderer(gl, canvas, houseCountSlider, maxStoreyCountSlider);
  render(masterRenderer, gl);
};

function render(masterRenderer, gl) {
  //Clear the COLOR_BUFFER_BIT and DEPTH_BUFFER_BIT, a.k.a. clear screen using
  //the color specified with gl.clearColor().
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  masterRenderer.render();
}

function generateCircleVerticesForTriangleFan(canvas, centerX, centerY, radius, LOD) {
  var twicePi = 2.0 * Math.PI; //2PI radians
  var circleVerticesX = []; //array of x coordinates of all vertices
  var circleVerticesY = []; //array of y coordinates of all vertices
  circleVerticesX.push(centerX); //push center x to the array
  circleVerticesY.push(centerY); //push center y to the array
  for (var i = 1; i < LOD + 2; i++) {
    //rotate next vertex x and y depending on the LOD and push them
    circleVerticesX.push(centerX + (radius * (Math.cos(i * twicePi / LOD) * canvas.height / canvas.width)));
    circleVerticesY.push(centerY + (radius * Math.sin(i * twicePi / LOD)));
  }
  var allCircleVertices = [];
  for (i = 0; i < LOD + 2; i++) {
    //join all vertex coordinates
    allCircleVertices.push(circleVerticesX[i]);
    allCircleVertices.push(circleVerticesY[i]);
  }
  return allCircleVertices;
}