/*
 * KAWO Tooltip
 * Author: Alex Duncan
 * Version: 1.0.5
 *
 * No dependencies and zero config options, super simple declarative tooltip library.
 */
(function ( root, factory ) {

	// AMD
	if ( typeof define === 'function' && define.amd ) define( [], factory );

	// COMMONJS
	else if ( typeof exports === 'object' ) module.exports = factory();

	// BROWSER GLOBAL
	else root.kawoTooltip = factory();

}( this, function () {
	'use strict';

	return function() {

		var showTimeout,
			hideTimeout,
			targetPosition,
			visible = false;

		// CREATE HIDDEN TOOLTIP ELEMENT
		var tooltip = document.createElement( 'div' );

		// TOOLTIP BASE STYLES
		tooltip.className = 'kawo-tooltip';
		tooltip.style.position = 'fixed';
		tooltip.style.visibility = 'hidden';
		tooltip.style.zIndex = 1000;
		tooltip.style.pointerEvents = 'none';

		// ADD SPAN TO TOOLTIP
		var span = document.createElement( 'span' );
		tooltip.appendChild( span );

		// CREATE ARROW ELEMENT
		var arrow = document.createElement( 'div' );

		// ARROW BASE STYLES
		arrow.className = 'kawo-tooltip-arrow';
		arrow.style.width = 0;
		arrow.style.height = 0;
		arrow.style.position = 'absolute';
		tooltip.style.pointerEvents = 'none';

		// APPEND ARROW TO TOOLTIP
		tooltip.appendChild( arrow );

		// ADD TOOLTIP TO DOM
		document.body.appendChild( tooltip );


		// LISTEN TO MOUSEENTER EVENT
		// -------------------------------------------------------------------------------
		document.body.addEventListener( 'mouseenter', function( e ){

			// TARGET HAS 'data-tooltip' ATTRIBUTE
			if ( e.target.hasAttribute( 'data-tooltip' ) ) {
				
				// TEST TARGET CSS POSITION				
				targetPosition = window.getComputedStyle(e.target).getPropertyValue('position');
										
				// BLUR TIMEOUT SET › CLEAR IT
				if ( hideTimeout ) {
					clearTimeout( hideTimeout );
					hideTimeout = null;
				}

				// TOOLTIP NOT VISIBLE › FADEIN AFTER TIMEOUT
				if ( !visible ) showTimeout = setTimeout(function(){

					tooltip.style.visibility = 'visible';
					visible = true;

				}, 500 );

				// GET THE TEXT FOR THE TOOLTIP FROM THE 'data-tooltip' ATTRIBUTE
				span.innerHTML = e.target.getAttribute( 'data-tooltip' );

				// GET SIZE AND POSITION OF THE TOOLTIP ELEMENT
				var tooltipSize = tooltip.getBoundingClientRect();

				// GET SIZE AND POSITION OF THE TARGET ELEMENT
				var targetSize = e.target.getBoundingClientRect();

				// CALCULATE CENTER OF TARGET
				var center = targetSize.left + ( targetSize.width / 2 );

				// OFF LEFT SIDE OF SCREEN › SHIFT RIGHT ONTO SCREEN
				// -----------------------------------------------------------------------
				if ( ( tooltipSize.width / 2 ) > ( center - 20 ) ) {

					tooltip.style.left = '20px';
					tooltip.style.textAlign = 'left';
					tooltip.style.right = 'auto';

					// POSITION TOOLTIP ARROW
					arrow.style.left = ( center - 25 ) + 'px';


				// OFF RIGHT SIDE OF SCREEN › SHIFT LEFT ONTO SCREEN
				// -----------------------------------------------------------------------
				} else if ( ( center + tooltipSize.width / 2 ) > window.innerWidth - 20 ) {

					tooltip.style.left = 'auto';
					tooltip.style.right = '20px';
					tooltip.style.textAlign = 'right';

					// POSITION TOOLTIP ARROW
					var arrowPosition = tooltipSize.width - ( targetSize.width / 2 );
					arrow.style.left = ( arrowPosition - 5 ) + 'px';


				// CENTERED
				// -----------------------------------------------------------------------
				} else {

					tooltip.style.left = ( center - ( tooltipSize.width / 2 ) ) + 'px';
					tooltip.style.right = 'auto';
					tooltip.style.textAlign = 'center';

					// POSITION TOOLTIP ARROW
					arrow.style.left = ( ( tooltipSize.width / 2 ) - 5 ) + 'px';

				}

				// OFF BOTTOM OF SCREEN › ABOVE ELEMENT
				// -----------------------------------------------------------------------
				if ( ( targetSize.bottom + tooltipSize.height ) > window.innerHeight ) {
					tooltip.style.top = ( targetSize.top -  tooltipSize.height - 5 ) + 'px';

					// POSITION ARROW BELOW TOOLTIP
					arrow.style.msTransform = 'rotate(-135deg)';
					arrow.style.transform = 'rotate(-135deg)';
					arrow.style.top = 'auto';
					arrow.style.bottom = '-5px';


				// BELOW ELEMENT
				// -----------------------------------------------------------------------
				} else {
					tooltip.style.top = ( targetSize.bottom + 5 ) + 'px';

					// POSITION ARROW ABOVE TOOLTIP
					arrow.style.msTransform = 'rotate(45deg)';
					arrow.style.transform = 'rotate(45deg)';
					arrow.style.top = '-5px';
					arrow.style.bottom = 'auto';
				}

			}

		}, true );


		// LISTEN TO MOUSELEAVE EVENT
		// -------------------------------------------------------------------------------
		document.body.addEventListener( 'mouseleave', function(){

			// IF A TIMEOUT IS SET CLEAR IT
			if ( showTimeout ) clearTimeout( showTimeout );

			// IF A TOOLTIP IS VISIBLE & NO TIMEOUT
			if ( visible && !hideTimeout ) {

				// SET TIMEOUT › HIDE TOOLTIP
				hideTimeout = setTimeout(function(){

					tooltip.style.visibility = 'hidden';
					visible = false;

				}, 500 );
			}

		}, true );
		
		
		// HIDE TOOLTIP ON SCROLL OR CLICK
		// -------------------------------------------------------------------------------		
		
		// ON CLICK › HIDE TOOLTIP
		window.onclick = function() {
			if ( visible ) {
				tooltip.style.visiblity = 'hidden';
				visible = false;
			}
		}
	

	}();

}));