/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

// Physijs.ConvexMesh
let ConvexMesh = function( geometry, material, mass ) {
        let points = [];

        Mesh.call( this, geometry, material, mass );

        if ( !geometry.boundingBox ) {
                geometry.computeBoundingBox();
        }

        for ( let i = 0; i < geometry.vertices.length; i++ ) {
                points.push({
                        x: geometry.vertices[i].x,
                        y: geometry.vertices[i].y,
                        z: geometry.vertices[i].z
                });
        }


        let width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        let height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        let depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        this._physijs.type = 'convex';
        this._physijs.points = points;
        this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};
ConvexMesh.prototype = Object.assign( Object.create( Mesh.prototype ), {
    constructor : ConvexMesh
});


export { ConvexMesh };
