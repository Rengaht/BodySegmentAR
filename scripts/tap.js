/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// Spark AR Studio extension for VS Code - https://fb.me/spark-vscode-plugin
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Materials = require('Materials');

const TouchGestures = require('TouchGestures');
const Reactive = require('Reactive');
const Time = require('Time');

const Random = require('Random');
var ReactiveModule = require('Reactive');

const Blocks = require('Blocks');


// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

(async function () {  // Enables async/await in JS [part 1]


 Diagnostics.log("run!");
  // To access scene objects
  const [fd, material, container] = await Promise.all([
    Scene.root.findFirst('Focal Distance'),
    Materials.findFirst('tap_mat'),
    Scene.root.findFirst('container'),
  ]);

  // const [dynamicPlane] = await Promise.all([

  //       Scene.create("Plane", {
  //           "name": "dPlane",
  //           "width": 0.1,
  //           "height": 0.1,
  //           "x": 0,
  //           "y": 0,
  //           "hidden": false,
  //       })
  //   ]);
  //   dynamicPlane.material=material;
  //   device.addChild(dynamicPlane);

  // To access class properties
  // const directionalLightIntensity = directionalLight.intensity;

  // To log messages to the console
  // function axisRotation(axis_x, axis_y, axis_z, angle_degrees) {
  //   var norm = Math.sqrt(axis_x * axis_x + axis_y * axis_y + axis_z * axis_z);
  //   axis_x /= norm;
  //   axis_y /= norm;
  //   axis_z /= norm;
  //   var angle_radians = angle_degrees * Math.PI / 180.0;
  //   var cos = Math.cos(angle_radians / 2);
  //   var sin = Math.sin(angle_radians / 2);
  //   return ReactiveModule.rotation(cos, axis_x * sin, axis_y * sin, axis_z * sin);
  // }

  Diagnostics.log('Console message logged from the script.');

	TouchGestures.onTap().subscribe(async (gesture) => {

    // Convert the gesture location to a Point2DSignal in screen space
    const gestureLocationAsSignal = Reactive.point2d(gesture.location.x, gesture.location.y);
    const gestureTransform = Scene.unprojectToFocalPlane(gestureLocationAsSignal);

    // Bind the position of the plane to the gesture location
    // The x value is multiplied by -1 to flip the x axis position, otherwise
    // it will appear mirrored (this multiplication is not necessary if
    // using the back camera)

    // firstPlane.transform.x = gestureTransform.x.mul(-1);
    // firstPlane.transform.y = gestureTransform.y;

    // Log the gesture location to the console
    Diagnostics.log(gesture.location);


    const name="dPlane".concat(Random.random().toString());
    Diagnostics.log(name.toString());

    const [tmp] = await Promise.all([
    
        Scene.create("Plane", {
            "name": name,
            "width": 0.1,
            "height": 0.1,
            "hidden": false,
        })
    ]);

    // tmp.transform.position=gestureTransform.pinLastValue();
    // tmp.transform.rotation=fd.transform.rotation;
    // tmp.material=material;

    Blocks.instantiate('block0').then(function(block) {
        block.transform.position=gestureTransform.pinLastValue();
        block.transform.rotation=fd.transform.rotation;
        block.material=material;
        container.addChild(block);

    });  

    // container.addChild(tmp);


  });



})(); // Enables async/await in JS [part 2]
