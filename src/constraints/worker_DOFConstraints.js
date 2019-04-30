( function( self ){

    let public = self.public_functions;

    self.knownConstraints.dof = function( details ){
        let constraint;

        var transforma, transformb, rotation;

			transforma = new Ammo.btTransform();
			transforma.setIdentity();

			_vec3_1.setX(details.positiona.x);
			_vec3_1.setY(details.positiona.y);
			_vec3_1.setZ(details.positiona.z);

			transforma.setOrigin(_vec3_1 );

			rotation = transforma.getRotation();
			rotation.setEulerZYX( -details.axisa.z, -details.axisa.y, -details.axisa.x );
			transforma.setRotation( rotation );

			if ( details.objectb ) {
				transformb = new Ammo.btTransform();
				transformb.setIdentity();

				_vec3_2.setX(details.positionb.x);
				_vec3_2.setY(details.positionb.y);
				_vec3_2.setZ(details.positionb.z);

				transformb.setOrigin(_vec3_2);

				rotation = transformb.getRotation();
				rotation.setEulerZYX( -details.axisb.z, -details.axisb.y, -details.axisb.x );
				transformb.setRotation( rotation );

				constraint = new Ammo.btGeneric6DofConstraint(
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
				constraint = new Ammo.btGeneric6DofConstraint(
					_objects[ details.objecta ],
					transforma
				);
						_constraintBodys[details.id] = { 
									rigidBodyA:_objects[ details.objecta ], 
									rigidBodyB: null 
								};
            }
            
			Ammo.destroy(transforma);
			if (transformb !== undefined) {
				Ammo.destroy(transformb);
            }

            return constraint;
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
        let constraint = _constraints[ params.constraint ];
    
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
        let constraint = _constraints[ params.constraint ];
    
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
    
        //var motor = constraint.getRotationalLimitMotor( params.which );
        //motor.set_m_enableMotor( true );
    
        _constraintBodys[params.constraint].rigidBodyA.activate();
        if ( _constraintBodys[params.constraint].rigidBodyB ) {
            _constraintBodys[params.constraint].rigidBodyB.activate();
        }
    };

    public.dof_configureAngularMotor = function( params ) {
        let constraint = _constraints[ params.constraint ];
    
        var motor = constraint.getRotationalLimitMotor( params.which );
    
        constraint.setAngularLowerLimit( params.low_angle ) //motor.set_m_loLimit( params.low_angle );
        constraint.setAngularUpperLimit( params.high_angle ); //motor.set_m_hiLimit( params.high_angle );
        motor.set_m_targetVelocity( params.velocity );
        motor.set_m_maxMotorForce( params.max_force );
    
        _constraintBodys[params.constraint].rigidBodyA.activate();
        if ( _constraintBodys[params.constraint].rigidBodyB ) {
            _constraintBodys[params.constraint].rigidBodyB.activate();
        }
    };

    public.dof_disableAngularMotor = function( params ) {
        let constraint = _constraints[ params.constraint ];
        var motor = constraint.getRotationalLimitMotor( params.which );
        motor.set_m_enableMotor( false );
    
        _constraintBodys[params.constraint].rigidBodyA.activate();
        if ( _constraintBodys[params.constraint].rigidBodyB ) {
            _constraintBodys[params.constraint].rigidBodyB.activate();
        }
    };

})( self );