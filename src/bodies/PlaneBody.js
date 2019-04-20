/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

/**
 * 
 * @param {type} mesh
 * @param {type} mass
 * @return {PlaneBody}
 */
let PlaneBody = function( mesh, mass ){

    PhysicsBody.call( this, mesh, mass );

    let width = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
    let height = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;

    this._physijs.type = 'plane';
    this._physijs.normal = mesh.geometry.faces[0].normal.clone();
    this._physijs.mass = (typeof mass === 'undefined') ? width * height : mass;
};
PlaneBody.prototype = Object.assign( Object.create( PhysicsBody.prototype ), {
    constructor : PlaneBody
});
PlaneBody.make = function( mesh, mass ){
    mesh.PhysicsBody = new PlaneBody( mesh, mass );
};

// Physijs.PlaneMesh
let PlaneMesh = function ( geometry, material, mass ) {

    THREE.Mesh.call( this, geometry, material );
    PlaneBody.call( this, this, mass );

};

PlaneMesh.prototype = Object.assign( Object.create( Mesh.prototype ), {
    constructor : PlaneMesh
});

export { PlaneMesh };