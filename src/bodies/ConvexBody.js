/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

let ConvexBody = function( mesh, opt ) {
        let points = [];
        let mass = opt? opt.mass : null;

        PhysicsBody.call( this, mesh, mass );

        if ( !mesh.geometry.boundingBox ) {
                mesh.geometry.computeBoundingBox();
        }

        for ( let i = 0; i < mesh.geometry.vertices.length; i++ ) {
                points.push({
                        x: mesh.geometry.vertices[i].x,
                        y: mesh.geometry.vertices[i].y,
                        z: mesh.geometry.vertices[i].z
                });
        }


        let width = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
        let height = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
        let depth = mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z;

        this._physijs.type = 'convex';
        this._physijs.points = points;
        this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
};

ConvexBody.prototype = Object.assign ( Object.create( PhysicsBody.prototype ), {
    constructor : ConvexBody
});


// Physijs.ConvexMesh
let ConvexMesh = function( geometry, material, mass ) {
    
    THREE.Mesh.call( this, geometry, material );    
    this.PhysicsBody = new ConvexBody( this, {mass :mass} );    

};

ConvexMesh.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor : ConvexMesh
});


export { ConvexMesh, ConvexBody };
