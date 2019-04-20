/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

// Physijs.CylinderMesh
let CylinderMesh = function( geometry, material, mass ) {
        var width, height, depth;

        Mesh.call( this, geometry, material, mass );

        if ( !geometry.boundingBox ) {
                geometry.computeBoundingBox();
        }

        width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        this._physijs.type = 'cylinder';
        this._physijs.width = width;
        this._physijs.height = height;
        this._physijs.depth = depth;
        this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};
CylinderMesh.prototype = Object.create( Mesh.prototype );
CylinderMesh.prototype.constructor = CylinderMesh;

export { CylinderMesh };