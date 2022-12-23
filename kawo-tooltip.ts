/*
 * KAWO Tooltip
 * Author: Alex Duncan
 * Version: 2.0.0
 *
 * No dependencies and zero config options, super simple declarative tooltip library.
 */

let showTimeout: ReturnType<typeof setTimeout> | null;
let hideTimeout: ReturnType<typeof setTimeout> | null;
let targetPosition: string;
let visible: boolean = false;

const timeoutDelay: number = 500;

const w = window;
const d = document;
const b = d.body;

// CREATE HIDDEN TOOLTIP ELEMENT
const tooltip: HTMLElement = d.createElement('div');
const ts: CSSStyleDeclaration = tooltip.style;

// TOOLTIP BASE STYLES
tooltip.className = 'tt';
ts.position = 'fixed';
ts.visibility = 'hidden';
ts.zIndex = '100000';
ts.pointerEvents = 'none';

// ADD SPAN TO TOOLTIP
const span = d.createElement( 'span' );
tooltip.appendChild( span );

// CREATE ARROW ELEMENT
const arrow: HTMLElement = d.createElement( 'div' );
const as: CSSStyleDeclaration = arrow.style;

// ARROW BASE STYLES
arrow.className = 'tt-arrow';
as.width = '0';
as.height = '0';
as.position = 'absolute';

// APPEND ARROW TO TOOLTIP
tooltip.appendChild( arrow );

// ADD TOOLTIP TO DOM
b.appendChild( tooltip );

const positionHorizontal = (
	left: string,
	right: string,
	align: string,
	arrowLeft: string
) => {
	ts.left = left;
	ts.right = right;
	ts.textAlign = align;
	as.left = arrowLeft + 'px';
};

const positionVertical = (
	tooltipTop: number,
	rotation: number,
	top: string,
	bottom: string
) => {
	ts.top = tooltipTop + 'px';
	as.transform = 'rotate(' + rotation + 'deg)';
	as.top = top;
	as.bottom = bottom;
};

var hideTooltip = () => {
	ts.visibility = 'hidden';
	visible = false;
};

// LISTEN TO MOUSEENTER EVENT
b.addEventListener( 'mouseenter', ( e: MouseEvent ) => {

		let target: Element = e.target as Element;

		// TARGET HAS 'data-tooltip' ATTRIBUTE
		if (target.hasAttribute( 'data-tooltip' )) {

			// TEST TARGET CSS POSITION
			targetPosition = w.getComputedStyle( target ).getPropertyValue( 'position' );

			// HIDE TIMEOUT SET › CLEAR IT
			if ( hideTimeout ) {
				clearTimeout( hideTimeout );
				hideTimeout = null;
			}

			// TOOLTIP NOT VISIBLE › FADEIN AFTER TIMEOUT
			if ( !visible )
				showTimeout = setTimeout(() => {
					ts.visibility = 'visible';
					visible = true;
				}, timeoutDelay);

			// GET THE TEXT FOR THE TOOLTIP FROM THE 'data-tooltip' ATTRIBUTE
			span.innerHTML = target.getAttribute( 'data-tooltip' ) as string;

			// GET SIZE AND POSITION OF THE TOOLTIP ELEMENT
			let tooltipSize: DOMRect = tooltip.getBoundingClientRect();

			// GET SIZE AND POSITION OF THE TARGET ELEMENT
			let targetSize: DOMRect = target.getBoundingClientRect();

			// CALCULATE CENTER OF TARGET
			let center: number = targetSize.left + targetSize.width / 2;

			// IF OFF LEFT SIDE OF SCREEN › SHIFT RIGHT ONTO SCREEN
			if ( tooltipSize.width / 2 > center - 20 )
				positionHorizontal(
					'20px',
					'auto',
					'left',
					(center - 25).toString()
				);

			// IF OFF RIGHT SIDE OF SCREEN › SHIFT LEFT ONTO SCREEN
			else if ( center + tooltipSize.width / 2 > w.innerWidth - 20 )
				positionHorizontal(
					'auto',
					'20px',
					'right',
					( tooltipSize.width - targetSize.width / 2 - 5 ).toString()
				);

			// ELSE › CENTERED
			else positionHorizontal(
					center - tooltipSize.width / 2 + 'px',
					'auto',
					'center',
					( tooltipSize.width / 2 - 5 ).toString()
				);

			// IF OFF BOTTOM OF SCREEN › POSITION ARROW ABOVE ELEMENT
			if ( targetSize.bottom + tooltipSize.height > w.innerHeight )
				positionVertical(
					targetSize.top - tooltipSize.height - 5,
					-135,
					'auto',
					'-5px'
				);

			// ELSE › POSITION ARROW BELOW TOOLTIP
			else positionVertical(
					targetSize.bottom + 5,
					45,
					'-5px',
					'auto'
				);
		}
}, true );

// ON MOUSELEAVE › REMOVE TOOLTIP
b.addEventListener( 'mouseleave', () => {

		// IF A TIMEOUT IS SET CLEAR IT
		showTimeout && clearTimeout( showTimeout );

		// IF A TOOLTIP IS VISIBLE & NO TIMEOUT › SET TIMEOUT
		if ( visible && !hideTimeout )
			hideTimeout = setTimeout( hideTooltip, timeoutDelay );

}, true );

// ON CLICK › HIDE TOOLTIP
b.addEventListener( 'click', hideTooltip, true );

// ON MAIN WINDOW SCROLL › HIDE TOOLTIP
d.addEventListener( 'wheel', () => {
		if ( targetPosition !== 'fixed' ) hideTooltip();
}, true );