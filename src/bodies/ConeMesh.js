/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

// Physijs.ConeBody
let ConeBody = function( mesh, opt ) {
    
    let mass = opt.mass;
    let geometry = mesh.geometry;

    PhysicsBody.call( this, mesh, mass );

    if ( !geometry.boundingBox ) {
            geometry.computeBoundingBox();
    }

    let width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    let height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

    this._physijs.type = 'cone';
    this._physijs.radius = width / 2;
    this._physijs.height = height;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height : mass;
};

ConeBody.prototype = Object.assign ( Object.create( PhysicsBody.prototype ), {
    constructor : ConeBody
});

ConeBody.make = function( mesh, opt ) {
    mesh.PhysicsBody = new ConeBody( mesh, opt );
    return mesh;
};


// Physijs.ConeMesh
let ConeMesh = function( geometry, material, mass ) {

    THREE.Mesh.call( this, geometry, material );    
    this.PhysicsBody = new ConeBody( this, {mass :mass} );
};
ConeMesh.prototype = Object.create( THREE.Mesh.prototype );
ConeMesh.prototype.constructor = ConeMesh;

export { ConeMesh, ConeBody };