/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function( self ){
    
    let public_functions = self.public_functions;
    let Ammo = self.Ammo;
    
    let _vec3_1 = new Ammo.btVector3(0,0,0);
    let _vec3_2 = new Ammo.btVector3(0,0,0);
    let _vec3_3 = new Ammo.btVector3(0,0,0);
    
    let addVehicle = function( description ) {
	let vehicle_tuning = new Ammo.btVehicleTuning();
	let vehicle;

	vehicle_tuning.set_m_suspensionStiffness( description.suspension_stiffness );
	vehicle_tuning.set_m_suspensionCompression( description.suspension_compression );
	vehicle_tuning.set_m_suspensionDamping( description.suspension_damping );
	vehicle_tuning.set_m_maxSuspensionTravelCm( description.max_suspension_travel );
	vehicle_tuning.set_m_maxSuspensionForce( description.max_suspension_force );

	vehicle = new Ammo.btRaycastVehicle( vehicle_tuning, _objects[ description.rigidBody ], new Ammo.btDefaultVehicleRaycaster( world ) );
	vehicle.tuning = vehicle_tuning;

	_objects[ description.rigidBody ].setActivationState( 4 );
	vehicle.setCoordinateSystem( 0, 1, 2 );

	world.addAction( vehicle );
	_vehicles[ description.id ] = vehicle;
    };

    let addWheel = function( description ) { 
            if ( _vehicles[description.id] !== undefined ) {
                    var tuning = _vehicles[description.id].tuning;
                    if ( description.tuning !== undefined ) {
                            tuning = new Ammo.btVehicleTuning();
                            tuning.set_m_suspensionStiffness( description.tuning.suspension_stiffness );
                            tuning.set_m_suspensionCompression( description.tuning.suspension_compression );
                            tuning.set_m_suspensionDamping( description.tuning.suspension_damping );
                            tuning.set_m_maxSuspensionTravelCm( description.tuning.max_suspension_travel );
                            tuning.set_m_maxSuspensionForce( description.tuning.max_suspension_force );
                    }

                    _vec3_1.setX(description.connection_point.x);
                    _vec3_1.setY(description.connection_point.y);
                    _vec3_1.setZ(description.connection_point.z);

                    _vec3_2.setX(description.wheel_direction.x);
                    _vec3_2.setY(description.wheel_direction.y);
                    _vec3_2.setZ(description.wheel_direction.z);

                    _vec3_3.setX(description.wheel_axle.x);
                    _vec3_3.setY(description.wheel_axle.y);
                    _vec3_3.setZ(description.wheel_axle.z);

                    _vehicles[description.id].addWheel(
                            _vec3_1,
                            _vec3_2,
                            _vec3_3,
                            description.suspension_rest_length,
                            description.wheel_radius,
                            tuning,
                            description.is_front_wheel
                    );
            }

            _num_wheels++;

            if ( SUPPORT_TRANSFERABLE ) {
                    vehiclereport = new Float32Array(1 + _num_wheels * VEHICLEREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )
                    vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;
            } else {
                    vehiclereport = [ MESSAGE_TYPES.VEHICLEREPORT ];
            }
    };

    let removeVehicle = function( description ) {
            delete _vehicles[ description.id ];
    };
    let setSteering = function( details ) {
            if ( _vehicles[details.id] !== undefined ) {
                    _vehicles[details.id].setSteeringValue( details.steering, details.wheel );
            }
    };
    let setBrake = function( details ) {
            if ( _vehicles[details.id] !== undefined ) {
                    _vehicles[details.id].setBrake( details.brake, details.wheel );
            }
    };
    let applyEngineForce = function( details ) {
            if ( _vehicles[details.id] !== undefined ) {
                    _vehicles[details.id].applyEngineForce( details.force, details.wheel );
            }
    };
    
    public_functions.addVehicle = addVehicle;
    public_functions.addWheel = addWheel;
    public_functions.removeVehicle = removeVehicle;
    public_functions.setSteering = setSteering;
    public_functions.setBrake = setBrake;
    public_functions.applyEngineForce = applyEngineForce;
})( self );



