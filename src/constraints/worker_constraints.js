/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
( function( self ){
    let Ammo = self.Ammo;
    let public = self.public_functions;
    let _objects = self._objects;
    
    self._constraintBodys = {};
    let _num_constraints = 0;
    self._constraints = {};
    
    let _vec3_1 = self._vec3_1 || new Ammo.btVector3( 0, 0, 0 );
    let _vec3_2 = self._vec3_2 || new Ammo.btVector3( 0, 0, 0 );
    let _vec3_3 = self._vec3_3 || new Ammo.btVector3( 0, 0, 0 );
    let _quat = self._quat;
    //let SUPPORT_TRANSFERABLE = self.SUPPORT_TRANSFERABLE;
    //let MESSAGE_TYPES = self.MESSAGE_TYPES;
    let CONSTRAINTREPORT_ITEMSIZE = self.CONSTRAINTREPORT_ITEMSIZE;
	//let world = self.world;
	
	self.knownConstraints = {};
    
    public.addConstraint = function ( details ) {
	
		let constraint;

		if ( self.knownConstraints[details.type] ){
			constraint = self.knownConstraints[details.type]( details );
		 
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

self.reportConstraints = function() {

	if ( SUPPORT_TRANSFERABLE ) {
		if ( constraintreport.length < 2 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE ) {
			constraintreport = new Float32Array(
				2 + // message id & # objects in report
				( Math.ceil( _num_constraints / REPORT_CHUNKSIZE ) * REPORT_CHUNKSIZE ) * CONSTRAINTREPORT_ITEMSIZE // # of values needed * item size
			);
			constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;
		}
	}

	let constraint;
	let transformAux1 = new Ammo.btTransform();
	let origin, ms, offset_body;
	let offset = 0;
	let	i = 0;

	for ( let index in _constraints ) { 
		if ( _constraints.hasOwnProperty( index ) ) {
			
			constraint = _constraints[index]; 

			if ( typeof constraint.getRigidBodyA === "function" ){
				constraint = _constraints[index];
				offset_body = constraint.getRigidBodyA();
				transform = constraint.getFrameOffsetA();
				origin = transform.getOrigin();
	
				// add values to report
				offset = 1 + (i++) * CONSTRAINTREPORT_ITEMSIZE;
	
				constraintreport[ offset ] = index;
				constraintreport[ offset + 1 ] = offset_body.id;
				constraintreport[ offset + 2 ] = origin.getX();
				constraintreport[ offset + 3 ] = origin.getY();
				constraintreport[ offset + 4 ] = origin.getZ();
				constraintreport[ offset + 5 ] = constraint.getAppliedImpulse();
			} else {
				offset_body = _constraintBodys[index].rigidBodyA;
				ms = offset_body.getMotionState();
	
				if ( ms ) {
					ms.getWorldTransform( transformAux1 );
					origin = transformAux1.getOrigin();
					var q = transformAux1.getRotation();
					// add values to report
					offset = 1 + (i++) * CONSTRAINTREPORT_ITEMSIZE;
	
					constraintreport[ offset ] = index;
					constraintreport[ offset + 1 ] = offset_body.id;
					constraintreport[ offset + 2 ] = origin.x(); 
					constraintreport[ offset + 3 ] = origin.y(); 
					constraintreport[ offset + 4 ] = origin.z(); 
					constraintreport[ offset + 5 ] = 0;
				}
			}
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

