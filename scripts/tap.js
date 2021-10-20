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
const Patches= require('Patches');


// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

var delayed=false;
var count=0;

const DISAPPEAR_TIME=3000;
const GENERATE_TIME=200;


// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

(async function () {  // Enables async/await in JS [part 1]


    function addBlock(){

        // Diagnostics.log('add block!');

       Blocks.instantiate('block0',{}).then(async function(block) {


            var pos=fd.worldTransform.position;
            // pos.add(Reactive.pack3(0,.2*count,.2*count));
            // count++;
            // if(Reactive.magnitude(pos).pinLastValue()!=0){
            block.transform.position=pos.pinLastValue().add(new Reactive.vector(0,0,0));

            block.transform.rotation=fd.worldTransform.rotation;//.pinLastValue();
            block.material=material;

            await container.addChild(block);
            block.inputs.setBoolean('visible',true);
            

            Time.setTimeout(function(){
                Scene.destroy(block);
            },DISAPPEAR_TIME);

        });  
    }

    // Diagnostics.log("run!");
    // To access scene objects
    const [fd, material, container] = await Promise.all([
        Scene.root.findFirst('Focal Distance'),
        Materials.findFirst('material_object'),
        Scene.root.findFirst('object_container'),
    ]);



    var intervalTimer =Time.setInterval(function(){
        addBlock();
    }, GENERATE_TIME);    
   


})(); // Enables async/await in JS [part 2]
