( function( self ){
    let public = self.public_functions;
    
    let Ammo = self.Ammo;

    let _vec3_1 = new Ammo.btVector3(0,0,0);
    let _vec3_2 = new Ammo.btVector3(0,0,0);
    let _vec3_3 = new Ammo.btVector3(0,0,0);

    self.knownConstraints.hinge = function( details ){
        let constraint;

        if ( details.objectb === undefined ) {

            _vec3_1.setX(details.positiona.x);
            _vec3_1.setY(details.positiona.y);
            _vec3_1.setZ(details.positiona.z);

            _vec3_2.setX(details.axis.x);
            _vec3_2.setY(details.axis.y);
            _vec3_2.setZ(details.axis.z);

            constraint = new Ammo.btHingeConstraint(
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

            constraint = new Ammo.btHingeConstraint(
                _objects[ details.objecta ],
                _objects[ details.objectb ],
                _vec3_1,
                _vec3_2,
                _vec3_3,
                _vec3_3
            );
            _constraintBodys[details.id] = { 
                rigidBodyA : _objects[ details.objecta ], 
                rigidBodyB : _objects[ details.objectb ] 
            };
        }
        return constraint;

    };

    public.hinge_setLimits = function( params ) {
	    _constraints[ params.constraint ].setLimit( params.low, params.high, 0, params.bias_factor, params.relaxation_factor );
    };
    
    public.hinge_enableAngularMotor = function( params ) { 
        let constraint = _constraints[ params.constraint ];

        constraint.enableAngularMotor( true, params.velocity, params.acceleration );
        _constraintBodys[params.constraint].rigidBodyB.activate();
        if ( _constraintBodys[params.constraint].rigidBodyB ) {
            _constraintBodys[params.constraint].rigidBodyB.activate();
        }
    };

    public.hinge_disableMotor = function( params ) {
        let constraint = _constraints[ params.constraint ];
        constraint.enableMotor( false );
        if ( constraint.getRigidBodyB() ) {
                constraint.getRigidBodyB().activate();
        }
    };
})( self );