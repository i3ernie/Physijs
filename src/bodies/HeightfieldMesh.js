/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from '../three.module.js';
import { Mesh } from '../PhysicsMesh.js';
import { PhysicsBody } from '../PhysicsBody.js';

let HeightfieldBody = function ( mesh, opt) {
    let mass = opt.mass;
    let xdiv = opt.xdiv; 
    let ydiv = opt.ydiv; 
    
    PhysicsBody.call( this, mesh, mass );
    
    let geometry = mesh.geometry;

    this._physijs.type   = 'heightfield';
    this._physijs.xsize  = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    this._physijs.ysize  = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    this._physijs.xpts = (typeof xdiv === 'undefined') ? Math.sqrt(geometry.vertices.length) : xdiv + 1;
    this._physijs.ypts = (typeof ydiv === 'undefined') ? Math.sqrt(geometry.vertices.length) : ydiv + 1;
    // note - this assumes our plane geometry is square, unless we pass in specific xdiv and ydiv
    this._physijs.absMaxHeight = Math.max(geometry.boundingBox.max.z,Math.abs(geometry.boundingBox.min.z));

    let points = [];

    let a, b;
        for ( let i = 0; i < geometry.vertices.length; i++ ) {

            a = i % this._physijs.xpts;
            b = Math.round( ( i / this._physijs.xpts ) - ( (i % this._physijs.xpts) / this._physijs.xpts ) );
            points[i] = geometry.vertices[ a + ( ( this._physijs.ypts - b - 1 ) * this._physijs.ypts ) ].z;

            //points[i] = geometry.vertices[i];
        }

        this._physijs.points = points;
};
HeightfieldBody.make = function( mesh, opt ){
    mesh.PhysicsBody = new HeightfieldBody( mesh, opt);
    return mesh;
};

// Physijs.HeightfieldMesh
let HeightfieldMesh = function ( geometry, material, mass, xdiv, ydiv) {
    THREE.Mesh.call( this, geometry, material );
    this.PhysicsBody = new HeightfieldBody( this, {mass:mass, xdiv:xdiv, ydiv:ydiv} );
};

HeightfieldMesh.prototype = Object.create( THREE.Mesh.prototype );
HeightfieldMesh.prototype.constructor = HeightfieldMesh;


export { HeightfieldMesh, HeightfieldBody };