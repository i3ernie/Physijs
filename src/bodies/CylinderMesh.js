/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

// Physijs.CylinderBody
let CylinderBody = function( mesh, opt ) {
    let mass = opt? opt.mass : null;
    let geometry = mesh.geometry;
    
    PhysicsBody.call( this, mesh, mass );

    if ( !geometry.boundingBox ) {
            geometry.computeBoundingBox();
    }

    let width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    let height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    let depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'cylinder';
    this._physijs.width = width;
    this._physijs.height = height;
    this._physijs.depth = depth;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};
CylinderBody.prototype = Object.assign ( Object.create( PhysicsBody.prototype ), {
    constructor : CylinderBody
});

CylinderBody.make = function( mesh, opt ){
    mesh.PhysicsBody = new CylinderBody( mesh, opt );
    return mesh;
};

// Physijs.CylinderMesh
let CylinderMesh = function( geometry, material, mass ) {
    
    THREE.Mesh.call( this, geometry, material );   
    CylinderBody.call(this, this, {mass :mass} );
    //this.PhysicsBody = new CylinderBody( this, {mass :mass} );
    
};
CylinderMesh.prototype = Object.create( Mesh.prototype );
CylinderMesh.prototype.constructor = CylinderMesh;

export { CylinderMesh, CylinderBody };