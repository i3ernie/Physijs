/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

// Physijs.SphereMesh
let SphereMesh = function( geometry, material, mass ) {
        Mesh.call( this, geometry, material, mass );

        if ( !geometry.boundingSphere ) {
                geometry.computeBoundingSphere();
        }

        this._physijs.type = 'sphere';
        this._physijs.radius = geometry.boundingSphere.radius;
        this._physijs.mass = (typeof mass === 'undefined') ? (4/3) * Math.PI * Math.pow(this._physijs.radius, 3) : mass;
};
SphereMesh.prototype = Object.create( Mesh.prototype );
SphereMesh.prototype.constructor = SphereMesh;

export { SphereMesh };