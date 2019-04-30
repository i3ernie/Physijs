( function( self ){

    let public = self.public_functions;
    let Ammo = self.Ammo;
    
    let _vec3_1 = new Ammo.btVector3(0,0,0);
    let _vec3_2 = new Ammo.btVector3(0,0,0);

    self.knownConstraints.slider = function( details ){
        let constraint;
        var transforma, transformb, rotation;

			transforma = new Ammo.btTransform();

			_vec3_1.setX(details.positiona.x);
			_vec3_1.setY(details.positiona.y);
			_vec3_1.setZ(details.positiona.z);

			transforma.setOrigin(_vec3_1);

			var rotation = transforma.getRotation();
			rotation.setEuler( details.axis.x, details.axis.y, details.axis.z );
			transforma.setRotation( rotation );

			if ( details.objectb ) {
				transformb = new Ammo.btTransform();

				_vec3_2.setX(details.positionb.x);
				_vec3_2.setY(details.positionb.y);
				_vec3_2.setZ(details.positionb.z);

				transformb.setOrigin(_vec3_2);

				rotation = transformb.getRotation();
				rotation.setEuler( details.axis.x, details.axis.y, details.axis.z );
				transformb.setRotation( rotation );

				constraint = new Ammo.btSliderConstraint(
					_objects[ details.objecta ],
					_objects[ details.objectb ],
					transforma,
					transformb,
					true
				);
			} else {
				constraint = new Ammo.btSliderConstraint(
					_objects[ details.objecta ],
					transforma,
					true
				);
			}

			Ammo.destroy(transforma);
			if ( transformb !== undefined ) {
				Ammo.destroy(transformb);
            }
            return constraint;
    };

    public.slider_setLimits = function( params ) {
        let constraint = _constraints[ params.constraint ];
        constraint.setLowerLinLimit( params.lin_lower || 0 );
        constraint.setUpperLinLimit( params.lin_upper || 0 );

        constraint.setLowerAngLimit( params.ang_lower || 0 );
        constraint.setUpperAngLimit( params.ang_upper || 0 );
    };
    public.slider_setRestitution = function( params ) {
        let constraint = _constraints[ params.constraint ];
        constraint.setSoftnessLimLin( params.linear || 0 );
        constraint.setSoftnessLimAng( params.angular || 0 );
    };

    public.slider_enableLinearMotor = function( params ) {
        let constraint = _constraints[ params.constraint ];
        constraint.setTargetLinMotorVelocity( params.velocity );
        constraint.setMaxLinMotorForce( params.acceleration );
        constraint.setPoweredLinMotor( true );
        constraint.getRigidBodyA().activate();
        if ( constraint.getRigidBodyB() ) {
                constraint.getRigidBodyB().activate();
        }
    };

    public.slider_disableLinearMotor = function( params ) {
        let constraint = _constraints[ params.constraint ];
        constraint.setPoweredLinMotor( false );
        if ( constraint.getRigidBodyB() ) {
                constraint.getRigidBodyB().activate();
        }
    };

    public.slider_enableAngularMotor = function( params ) {
        let constraint = _constraints[ params.constraint ];
        constraint.setTargetAngMotorVelocity( params.velocity );
        constraint.setMaxAngMotorForce( params.acceleration );
        constraint.setPoweredAngMotor( true );
        constraint.getRigidBodyA().activate();
        if ( constraint.getRigidBodyB() ) {
                constraint.getRigidBodyB().activate();
        }
    };

    public.slider_disableAngularMotor = function( params ) {
        let constraint = _constraints[ params.constraint ];
        constraint.setPoweredAngMotor( false );
        constraint.getRigidBodyA().activate();
        if ( constraint.getRigidBodyB() ) {
            constraint.getRigidBodyB().activate();
        }
    };
})( self );