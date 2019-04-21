import * as THREE from './three.module.js';

import { Mesh } from './PhysicsMesh.js';
import { PlaneMesh } from './bodies/PlaneBody.js';
import { BoxMesh, BoxBody } from './bodies/BoxBody.js';
import { ConvexMesh } from './bodies/ConvexBody.js';
import { HeightfieldMesh, HeightfieldBody } from './bodies/HeightfieldMesh.js';
import { ConcaveMesh } from './bodies/ConcaveBody.js';
import { SphereMesh, SphereBody } from './bodies/SphereMesh.js';
import { CylinderMesh } from './bodies/CylinderMesh.js';
import { CapsuleMesh } from './bodies/CapsuleMesh.js';
import { ConeMesh } from './bodies/ConeMesh.js'; 

import { HingeConstraint } from './constraints/HingeConstraint.js';
import { PointConstraint } from './constraints/PointConstraint.js';
import { SliderConstraint } from './constraints/SliderConstraint.js';
import { ConeTwistConstraint } from './constraints/ConeTwistConstraint.js';
import { DOFConstraint } from './constraints/DOFConstraint.js';

import { Scene, PhysicsScene } from './PhysicsScene.js';
import { Vehicle, VehicleTuning } from './PhysicsVehicle.js';

import {convertWorldPositionToObject, getObjectId} from './utils.js';

/**
 * 
 * @param {type} global
 * @param {type} factory
 * @return {undefined}
 */
    'use strict';
	
    // object assigned to window.Physijs
    let Physijs = {}; 
    Physijs.scripts = { };
    
    Object.defineProperty( Physijs.scripts, 'ammo', {
        get: function() { 
            return PhysicsScene.scripts.ammo; 
        },
        set: function( ammo ) { 
            if ( Scene ) {
                PhysicsScene.scripts.ammo = ammo;
            } 
        }
    });
    
    Object.defineProperty( Physijs.scripts, 'worker', {
        get: function() { 
            return PhysicsScene.scripts.worker = worker; 
        },
        set: function( worker ) { 
            if ( PhysicsScene ) {
                PhysicsScene.scripts.worker = worker;
            } 
        }
    });

    // Physijs.createMaterial
    Physijs.createMaterial = function( material, friction, restitution ) {
            let physijs_material = function(){};
            physijs_material.prototype = material;
            physijs_material = new physijs_material;

            physijs_material._physijs = {
                    id: material.id,
                    friction: friction === undefined ? .8 : friction,
                    restitution: restitution === undefined ? .2 : restitution
            };

            return physijs_material;
    };


    // Constraints
    Physijs.PointConstraint = PointConstraint;
    Physijs.HingeConstraint = HingeConstraint;
    Physijs.SliderConstraint = SliderConstraint;
    Physijs.ConeTwistConstraint = ConeTwistConstraint;
    Physijs.DOFConstraint = DOFConstraint;

    Physijs.Scene = Scene;

    // Phsijs.Mesh
    Physijs.Mesh = Mesh;

    Physijs.PlaneMesh = PlaneMesh;
    Physijs.HeightfieldMesh = HeightfieldMesh;
    Physijs.HeightfieldBody = HeightfieldBody;
    Physijs.BoxMesh = BoxMesh;
    Physijs.BoxBody = BoxBody;
    Physijs.SphereMesh = SphereMesh;
    Physijs.SphereBody = SphereBody;
    Physijs.CylinderMesh = CylinderMesh;
    Physijs.CapsuleMesh = CapsuleMesh;
    Physijs.ConeMesh = ConeMesh;
    Physijs.ConcaveMesh = ConcaveMesh;
    Physijs.ConvexMesh = ConvexMesh;

    Physijs.Vehicle = Vehicle;
    Physijs.VehicleTuning = VehicleTuning;
    
    Physijs.makeBody = function( mesh, opt ){ 
        if ( !mesh || typeof mesh !== "object" || !mesh.geometry ) return;
        
        const defaults = {
            density : 1,
            margin  : 0.05
        };
        
        let options = Object.assign( {}, defaults, opt );
        
        switch ( mesh.geometry.type ) 
        {
            case "BoxGeometry":
                Physijs.BoxBody.make( mesh, options );
                break;
            case "SphereGeometry":
                Physijs.SphereBody.make( mesh, options );
                break;
            default :
                //ToDo
        }
    };


export default Physijs;