/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// class to provide simple event methods	
let Eventable =  {};
	
Eventable.make = function( obj ) {
        obj.prototype.addEventListener = THREE.EventDispatcher.prototype.addEventListener;
        obj.prototype.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener;
        obj.prototype.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent;
};

export {Eventable};
