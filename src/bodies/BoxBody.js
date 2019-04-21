/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

let BoxBody = function( mesh, opt ) {
    let mass = opt? opt.mass : null;
    
    PhysicsBody.call( this, mesh, mass );

    let width = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
    let height = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
    let depth = mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z;

    this._physijs.type = 'box';
    this._physijs.width = width;
    this._physijs.height = height;
    this._physijs.depth = depth;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};
BoxBody.prototype = Object.assign ( Object.create( PhysicsBody.prototype ), {
    constructor : BoxBody
});

BoxBody.make = function( mesh, opt ) {
    mesh.PhysicsBody = new BoxBody( mesh, opt );
    return mesh;
};


// Physijs.BoxMesh
let BoxMesh = function( geometry, material, mass ) {

    THREE.Mesh.call( this, geometry, material );    
    this.PhysicsBody = new BoxBody( this, {mass :mass} );

};
BoxMesh.prototype = Object.assign ( Object.create( THREE.Mesh.prototype ), {
    constructor : BoxMesh
});


export { BoxMesh, BoxBody };