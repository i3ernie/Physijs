/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from './three.module.js';
import { PhysicsBody } from './PhysicsBody.js';
import { getObjectId } from './utils.js';


// Phsijs.Mesh
let Mesh = function ( geometry, material, mass ) {

    if ( !geometry ) {
            return;
    }

    THREE.Mesh.call( this, geometry, material );
    PhysicsBody.call( this, this, mass );
};

Mesh.prototype = Object.assign ( Object.create ( THREE.Mesh.prototype ), PhysicsBody.prototype, {
    constructor : Mesh
});

export { Mesh };