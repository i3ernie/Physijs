/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

// Physijs.CapsuleMesh
let CapsuleMesh = function( geometry, material, mass ) {

        Mesh.call( this, geometry, material, mass );

        if ( !geometry.boundingBox ) {
                geometry.computeBoundingBox();
        }

        let width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        let height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        let depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        this._physijs.type = 'capsule';
        this._physijs.radius = Math.max(width / 2, depth / 2);
        this._physijs.height = height;
        this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};

CapsuleMesh.prototype = Object.create( Mesh.prototype );
CapsuleMesh.prototype.constructor = CapsuleMesh;

export { CapsuleMesh };