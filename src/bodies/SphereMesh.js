/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

let SphereBody = function( mesh, opt ) {
    let mass = opt? opt.mass : null;
    
    PhysicsBody.call( this, mesh, mass );

    if ( !mesh.geometry.boundingSphere ) {
        mesh.geometry.computeBoundingSphere();
    }

    this._physijs.type = 'sphere';
    this._physijs.radius = mesh.geometry.boundingSphere.radius;
    this._physijs.mass = (typeof mass === 'undefined') ? (4/3) * Math.PI * Math.pow(this._physijs.radius, 3) : mass;
};
SphereBody.prototype = Object.assign ( Object.create( PhysicsBody.prototype ), {
    constructor : SphereBody
});

SphereBody.make = function( mesh, opt ) {
    mesh.PhysicsBody = new SphereBody( mesh, opt );
    return mesh;
};

// Physijs.SphereMesh
let SphereMesh = function( geometry, material, mass ) {
    THREE.Mesh.call( this, geometry, material );    
    SphereBody.call(this, this, {mass :mass} );
    //this.PhysicsBody = new SphereBody( this, {mass :mass} );
};
SphereMesh.prototype = Object.create( Mesh.prototype );
SphereMesh.prototype.constructor = SphereMesh;

export { SphereMesh, SphereBody };