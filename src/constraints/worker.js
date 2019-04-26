/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
( function( self ){
    let AMMO = self.AMMO;
    let public = self.public_functions;
    let _objects = self._objects;
    
    let _constraintBodys = {};
    let _num_constraints = 0;
    let _constraints = {};
    
    let _vec3_1 = self._vec3_1 || new self.AMMO.btVector3( 0, 0, 0 );
    let _vec3_2 = self._vec3_2 || new self.AMMO.btVector3( 0, 0, 0 );
    let _vec3_3 = self._vec3_3 || new self.AMMO.btVector3( 0, 0, 0 );
    let _quat = self._quat;
    let SUPPORT_TRANSFERABLE = self.SUPPORT_TRANSFERABLE;
    let MESSAGE_TYPES = self.MESSAGE_TYPES;
    let CONSTRAINTREPORT_ITEMSIZE = self.CONSTRAINTREPORT_ITEMSIZE;
    let world = self.world;
    
    public.addConstraint = function ( details ) {
	let constraint;

	switch ( details.type ) {

		case 'point':
			if ( details.objectb === undefined ) {

				_vec3_1.setX(details.positiona.x);
				_vec3_1.setY(details.positiona.y);
				_vec3_1.setZ(details.positiona.z);

				constraint = new AMMO.btPoint2PointConstraint(
					_objects[ details.objecta ],
					_vec3_1
				);
			} else {

				_vec3_1.setX(details.positiona.x);
				_vec3_1.setY(details.positiona.y);
				_vec3_1.setZ(details.positiona.z);

				_vec3_2.setX(details.positionb.x);
				_vec3_2.setY(details.positionb.y);
				_vec3_2.setZ(details.positionb.z);

				constraint = new AMMO.btPoint2PointConstraint(
					_objects[ details.objecta ],
					_objects[ details.objectb ],
					_vec3_1,
					_vec3_2
				);
			}
			break;

		case 'hinge':
			if ( details.objectb === undefined ) {

				_vec3_1.setX(details.positiona.x);
				_vec3_1.setY(details.positiona.y);
				_vec3_1.setZ(details.positiona.z);

				_vec3_2.setX(details.axis.x);
				_vec3_2.setY(details.axis.y);
				_vec3_2.setZ(details.axis.z);

				constraint = new AMMO.btHingeConstraint(
					_objects[ details.objecta ],
					_vec3_1,
					_vec3_2
				);
			} else {

				_vec3_1.setX(details.positiona.x);
				_vec3_1.setY(details.positiona.y);
				_vec3_1.setZ(details.positiona.z);

				_vec3_2.setX(details.positionb.x);
				_vec3_2.setY(details.positionb.y);
				_vec3_2.setZ(details.positionb.z);

				_vec3_3.setX(details.axis.x);
				_vec3_3.setY(details.axis.y);
				_vec3_3.setZ(details.axis.z);

				constraint = new AMMO.btHingeConstraint(
					_objects[ details.objecta ],
					_objects[ details.objectb ],
					_vec3_1,
					_vec3_2,
					_vec3_3,
					_vec3_3
				);
			}
			break;

		case 'slider':
			var transforma, transformb, rotation;

			transforma = new AMMO.btTransform();

			_vec3_1.setX(details.positiona.x);
			_vec3_1.setY(details.positiona.y);
			_vec3_1.setZ(details.positiona.z);

			transforma.setOrigin(_vec3_1);

			var rotation = transforma.getRotation();
			rotation.setEuler( details.axis.x, details.axis.y, details.axis.z );
			transforma.setRotation( rotation );

			if ( details.objectb ) {
				transformb = new AMMO.btTransform();

				_vec3_2.setX(details.positionb.x);
				_vec3_2.setY(details.positionb.y);
				_vec3_2.setZ(details.positionb.z);

				transformb.setOrigin(_vec3_2);

				rotation = transformb.getRotation();
				rotation.setEuler( details.axis.x, details.axis.y, details.axis.z );
				transformb.setRotation( rotation );

				constraint = new AMMO.btSliderConstraint(
					_objects[ details.objecta ],
					_objects[ details.objectb ],
					transforma,
					transformb,
					true
				);
			} else {
				constraint = new AMMO.btSliderConstraint(
					_objects[ details.objecta ],
					transforma,
					true
				);
			}

			AMMO.destroy(transforma);
			if ( transformb !== undefined ) {
				AMMO.destroy(transformb);
			}
			break;

		case 'conetwist':
			var transforma, transformb;

			transforma = new AMMO.btTransform();
			transforma.setIdentity();

			transformb = new AMMO.btTransform();
			transformb.setIdentity();

			_vec3_1.setX(details.positiona.x);
			_vec3_1.setY(details.positiona.y);
			_vec3_1.setZ(details.positiona.z);

			_vec3_2.setX(details.positionb.x);
			_vec3_2.setY(details.positionb.y);
			_vec3_2.setZ(details.positionb.z);

			transforma.setOrigin(_vec3_1);
			transformb.setOrigin(_vec3_2);

			var rotation = transforma.getRotation();
			rotation.setEulerZYX( -details.axisa.z, -details.axisa.y, -details.axisa.x );
			transforma.setRotation( rotation );

			rotation = transformb.getRotation();
			rotation.setEulerZYX( -details.axisb.z, -details.axisb.y, -details.axisb.x );
			transformb.setRotation( rotation );

			constraint = new AMMO.btConeTwistConstraint(
				_objects[ details.objecta ],
				_objects[ details.objectb ],
				transforma,
				transformb
			);

			constraint.setLimit( Math.PI, 0, Math.PI );

			AMMO.destroy(transforma);
			AMMO.destroy(transformb);

			break;

		case 'dof':
			var transforma, transformb, rotation;

			transforma = new AMMO.btTransform();
			transforma.setIdentity();

			_vec3_1.setX(details.positiona.x);
			_vec3_1.setY(details.positiona.y);
			_vec3_1.setZ(details.positiona.z);

			transforma.setOrigin(_vec3_1 );

			rotation = transforma.getRotation();
			rotation.setEulerZYX( -details.axisa.z, -details.axisa.y, -details.axisa.x );
			transforma.setRotation( rotation );

			if ( details.objectb ) {
				transformb = new AMMO.btTransform();
				transformb.setIdentity();

				_vec3_2.setX(details.positionb.x);
				_vec3_2.setY(details.positionb.y);
				_vec3_2.setZ(details.positionb.z);

				transformb.setOrigin(_vec3_2);

				rotation = transformb.getRotation();
				rotation.setEulerZYX( -details.axisb.z, -details.axisb.y, -details.axisb.x );
				transformb.setRotation( rotation );

				constraint = new AMMO.btGeneric6DofConstraint(
					_objects[ details.objecta ],
					_objects[ details.objectb ],
					transforma,
					transformb,
                                        true
                                                
				);
                                _constraintBodys[details.id] = { 
                                    rigidBodyA:_objects[ details.objecta ], 
                                    rigidBodyB: _objects[ details.objectb ] 
                                };
                        
			} else {
				constraint = new AMMO.btGeneric6DofConstraint(
					_objects[ details.objecta ],
					transforma
				);
                                _constraintBodys[details.id] = { 
                                            rigidBodyA:_objects[ details.objecta ], 
                                            rigidBodyB: null 
                                        };
                                }
			AMMO.destroy(transforma);
			if (transformb !== undefined) {
				AMMO.destroy(transformb);
			}
			break;

		default:
			return;

	};

	world.addConstraint( constraint );

	constraint.enableFeedback();
	
        _constraints[ details.id ] = constraint;
        
	_num_constraints++;

	if ( SUPPORT_TRANSFERABLE ) {
		constraintreport = new Float32Array(1 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )
		constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;
	} else {
		constraintreport = [ MESSAGE_TYPES.CONSTRAINTREPORT ];
	}
};

    public.removeConstraint = function( details ) {
	var constraint = _constraints[ details.id ];
	if ( constraint !== undefined ) {
		world.removeConstraint( constraint );
		delete _constraints[ details.id ];
		_num_constraints--;
	}
};

    public.constraint_setBreakingImpulseThreshold = function( details ) {
            var constraint = _constraints[ details.id ];
            if ( constraint !== undefined ) {
                    constraint.setBreakingImpulseThreshold( details.threshold );
            }
    };
    
    public.hinge_setLimits = function( params ) {
	_constraints[ params.constraint ].setLimit( params.low, params.high, 0, params.bias_factor, params.relaxation_factor );
    };
    
    public.hinge_enableAngularMotor = function( params ) {
            var constraint = _constraints[ params.constraint ];
            constraint.enableAngularMotor( true, params.velocity, params.acceleration );
            constraint.getRigidBodyA().activate();
            if ( constraint.getRigidBodyB() ) {
                    constraint.getRigidBodyB().activate();
            }
    };
    public.hinge_disableMotor = function( params ) {
        var constraint = _constraints[ params.constraint ];
        constraint.enableMotor( false );
        if ( constraint.getRigidBodyB() ) {
                constraint.getRigidBodyB().activate();
        }
    };

    public.slider_setLimits = function( params ) {
            var constraint = _constraints[ params.constraint ];
            constraint.setLowerLinLimit( params.lin_lower || 0 );
            constraint.setUpperLinLimit( params.lin_upper || 0 );

            constraint.setLowerAngLimit( params.ang_lower || 0 );
            constraint.setUpperAngLimit( params.ang_upper || 0 );
    };
    public.slider_setRestitution = function( params ) {
            var constraint = _constraints[ params.constraint ];
            constraint.setSoftnessLimLin( params.linear || 0 );
            constraint.setSoftnessLimAng( params.angular || 0 );
    };
    public.slider_enableLinearMotor = function( params ) {
            var constraint = _constraints[ params.constraint ];
            constraint.setTargetLinMotorVelocity( params.velocity );
            constraint.setMaxLinMotorForce( params.acceleration );
            constraint.setPoweredLinMotor( true );
            constraint.getRigidBodyA().activate();
            if ( constraint.getRigidBodyB() ) {
                    constraint.getRigidBodyB().activate();
            }
    };
    public.slider_disableLinearMotor = function( params ) {
            var constraint = _constraints[ params.constraint ];
            constraint.setPoweredLinMotor( false );
            if ( constraint.getRigidBodyB() ) {
                    constraint.getRigidBodyB().activate();
            }
    };
    public.slider_enableAngularMotor = function( params ) {
            var constraint = _constraints[ params.constraint ];
            constraint.setTargetAngMotorVelocity( params.velocity );
            constraint.setMaxAngMotorForce( params.acceleration );
            constraint.setPoweredAngMotor( true );
            constraint.getRigidBodyA().activate();
            if ( constraint.getRigidBodyB() ) {
                    constraint.getRigidBodyB().activate();
            }
    };
public.slider_disableAngularMotor = function( params ) {
	var constraint = _constraints[ params.constraint ];
	constraint.setPoweredAngMotor( false );
	constraint.getRigidBodyA().activate();
	if ( constraint.getRigidBodyB() ) {
		constraint.getRigidBodyB().activate();
	}
};

public.conetwist_setLimit = function( params ) {
	_constraints[ params.constraint ].setLimit( params.z, params.y, params.x ); // ZYX order
};
public.conetwist_enableMotor = function( params ) {
	var constraint = _constraints[ params.constraint ];
	constraint.enableMotor( true );
	constraint.getRigidBodyA().activate();
	constraint.getRigidBodyB().activate();
};
public.conetwist_setMaxMotorImpulse = function( params ) {
	var constraint = _constraints[ params.constraint ];
	constraint.setMaxMotorImpulse( params.max_impulse );
	constraint.getRigidBodyA().activate();
	constraint.getRigidBodyB().activate();
};
public.conetwist_setMotorTarget = function( params ) {
	var constraint = _constraints[ params.constraint ];

	_quat.setX(params.x);
	_quat.setY(params.y);
	_quat.setZ(params.z);
	_quat.setW(params.w);

	constraint.setMotorTarget(_quat);

	constraint.getRigidBodyA().activate();
	constraint.getRigidBodyB().activate();
};
public.conetwist_disableMotor = function( params ) {
	var constraint = _constraints[ params.constraint ];
	constraint.enableMotor( false );
	constraint.getRigidBodyA().activate();
	constraint.getRigidBodyB().activate();
};


public.dof_setLinearLowerLimit = function( params ) {
	var constraint = _constraints[ params.constraint ];

	_vec3_1.setX(params.x);
	_vec3_1.setY(params.y);
	_vec3_1.setZ(params.z);

	constraint.setLinearLowerLimit(_vec3_1);

	constraint.getRigidBodyA().activate();
	if ( constraint.getRigidBodyB() ) {
		constraint.getRigidBodyB().activate();
	}
};
public.dof_setLinearUpperLimit = function( params ) {
	var constraint = _constraints[ params.constraint ];

	_vec3_1.setX(params.x);
	_vec3_1.setY(params.y);
	_vec3_1.setZ(params.z);

	constraint.setLinearUpperLimit(_vec3_1);

	constraint.getRigidBodyA().activate();
	if ( constraint.getRigidBodyB() ) {
		constraint.getRigidBodyB().activate();
	}
};
public.dof_setAngularLowerLimit = function( params ) {
	var constraint = _constraints[ params.constraint ];

	_vec3_1.setX(params.x);
	_vec3_1.setY(params.y);
	_vec3_1.setZ(params.z);

	constraint.setAngularLowerLimit(_vec3_1);
        
        

	_constraintBodys[params.constraint].rigidBodyA.activate();
	if ( _constraintBodys[params.constraint].rigidBodyB ) {
		_constraintBodys[params.constraint].rigidBodyB.activate();
	}
};
public.dof_setAngularUpperLimit = function( params ) {
	var constraint = _constraints[ params.constraint ];

	_vec3_1.setX(params.x);
	_vec3_1.setY(params.y);
	_vec3_1.setZ(params.z);

	constraint.setAngularUpperLimit(_vec3_1);

	_constraintBodys[params.constraint].rigidBodyA.activate();
	if ( _constraintBodys[params.constraint].rigidBodyB ) {
		_constraintBodys[params.constraint].rigidBodyB.activate();
	}
};
public.dof_enableAngularMotor = function( params ) {
	var constraint = _constraints[ params.constraint ];

	var motor = constraint.getRotationalLimitMotor( params.which );
	motor.set_m_enableMotor( true );

	constraint.getRigidBodyA().activate();
	if ( constraint.getRigidBodyB() ) {
		constraint.getRigidBodyB().activate();
	}
};
public.dof_configureAngularMotor = function( params ) {
	var constraint = _constraints[ params.constraint ];
console.log( constraint );
	var motor = constraint.getRotationalLimitMotor( params.which );

	motor.set_m_loLimit( params.low_angle );
	motor.set_m_hiLimit( params.high_angle );
	motor.set_m_targetVelocity( params.velocity );
	motor.set_m_maxMotorForce( params.max_force );

	constraint.getRigidBodyA().activate();
	if ( _constraintBodys[params.constraint].rigidBodyB ) {
		_constraintBodys[params.constraint].rigidBodyB.activate();
	}
};
public.dof_disableAngularMotor = function( params ) {
	var constraint = _constraints[ params.constraint ];

	var motor = constraint.getRotationalLimitMotor( params.which );
	motor.set_m_enableMotor( false );

	constraint.getRigidBodyA().activate();
	if ( constraint.getRigidBodyB() ) {
		constraint.getRigidBodyB().activate();
	}
};

self.reportConstraints = function() {
	var index, constraint,
		offset_body,
		transform, origin,
		offset = 0,
		i = 0;

	if ( SUPPORT_TRANSFERABLE ) {
		if ( constraintreport.length < 2 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE ) {
			constraintreport = new Float32Array(
				2 + // message id & # objects in report
				( Math.ceil( _num_constraints / REPORT_CHUNKSIZE ) * REPORT_CHUNKSIZE ) * CONSTRAINTREPORT_ITEMSIZE // # of values needed * item size
			);
			constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;
		}
	}

	for ( index in _constraints ) {
		if ( _constraints.hasOwnProperty( index ) ) {
			constraint = _constraints[index];
			offset_body = _constraintBodys[index].rigidBodyA;
			transform = constraint.getFrameOffsetA();
			origin = transform.getOrigin();

			// add values to report
			offset = 1 + (i++) * CONSTRAINTREPORT_ITEMSIZE;

			constraintreport[ offset ] = index;
			constraintreport[ offset + 1 ] = offset_body.id;
			constraintreport[ offset + 2 ] = origin.x(); //getX();
			constraintreport[ offset + 3 ] = origin.y(); //getY();
			constraintreport[ offset + 4 ] = origin.z(); //getZ();
			constraintreport[ offset + 5 ] = 0;//constraint.getAppliedImpulse();
		}
	}


	if ( i !== 0 ) {
		if ( SUPPORT_TRANSFERABLE ) {
			transferableMessage( constraintreport.buffer, [constraintreport.buffer] );
		} else {
			transferableMessage( constraintreport );
		}
	}

};
    
})( self );

