/*
 * KAWO Tooltip
 * Author: Alex Duncan
 * Version: 2.0.0
 *
 * No dependencies and zero config options, super simple declarative tooltip library.
 */

// IMPROVE CODE MINIFICATION BY SHORTENING VARIABLES
const w = window;
const d = document;
const b = d.body;

// NUMBER OF MILLISECONDS DELAY FOR TOOLTIP TO APPEAR / DISAPPEAR
const timeoutDelay = 500;

// NUMBER OF PIXELS TO SHIFT TOOLTIP TO AVOID EDGE OF SCREEN
const viewportMargin = 16;

// NUMBER OF PIXELS TO OFFSET ARROW BY
const arrowCenterOffset = 5;

// TOUCH DEVICE › DON'T SHOW TOOLTIPS
if ('ontouchstart' in w) console.warn('No tooltips on touch devices.');

// DURATION CURSOR IS ON ELEMENT BEFORE TOOLTIP IS SHOWN
let showTimeout: ReturnType<typeof setTimeout> | null;

// DURATION AFTER CURSOR LEAVES ELEMENT BEFORE TOOLTIP IS HIDDEN
let hideTimeout: ReturnType<typeof setTimeout> | null;

// CSS POSITION VALUE OF TARGET
let targetPosition: string;

// DISPLAY STATUS OF TOOLTIP
let visible = false;

let visibleTarget: Element | undefined;

// CREATE HIDDEN TOOLTIP ELEMENT
// -----------------------------------------------------------------------------
const tooltip: HTMLElement = d.createElement('div');
const ts: CSSStyleDeclaration = tooltip.style;

// TOOLTIP BASE STYLES
tooltip.className = 'kawo-tooltip';
ts.position = 'fixed';
ts.inset = '0 auto auto 0';
ts.visibility = 'hidden';
ts.zIndex = '2_147_483_647';
ts.pointerEvents = 'none';

// ADD SPAN TO TOOLTIP
const span = d.createElement('span');
tooltip.appendChild(span);

// CREATE ARROW ELEMENT
// -----------------------------------------------------------------------------
const arrow: HTMLElement = d.createElement('div');
const as: CSSStyleDeclaration = arrow.style;

// ARROW BASE STYLES
arrow.className = 'kawo-tooltip-arrow';
as.width = '0';
as.height = '0';
as.position = 'absolute';

// APPEND ARROW TO TOOLTIP
tooltip.appendChild(arrow);

// ADD TOOLTIP TO DOM
b.appendChild(tooltip);

// FUNCTION TO HIDE TOOLTIP
// -----------------------------------------------------------------------------
const hideTooltip = () => {
	ts.visibility = 'hidden';
	visible = false;
	visibleTarget = undefined;
};

// TODO: DEBOUNCE WHEN WE IMPLEMENT MORE RELIABLE LOGIC
// const debouncedMouseEnter = debounce(handleMouseEnter);
// const debouncedMouseLeave = debounce(handleMouseLeave);

// LISTEN TO MOUSEENTER EVENT TO DISPLAY TOOLTIP
// -----------------------------------------------------------------------------
b.addEventListener('mouseenter', handleMouseEnter, true);

// LISTEN TO MOUSELEAVE EVENT TO HIDE TOOLTIP
// -----------------------------------------------------------------------------
b.addEventListener('mouseleave', handleMouseLeave, true);

// ON CLICK › HIDE TOOLTIP
b.addEventListener('click', hideTooltip, true);

// ON MAIN WINDOW SCROLL › HIDE TOOLTIP
d.addEventListener(
	'wheel',
	() => {
		if (targetPosition !== 'fixed') hideTooltip();
	},
	true
);

function handleMouseEnter(e: MouseEvent) {
	const target: Element = e.target as Element;

	// TARGET HAS 'data-tooltip' ATTRIBUTE
	if (target.hasAttribute('data-tooltip')) {
		visibleTarget = target;

		// TEST TARGET CSS POSITION
		targetPosition = w.getComputedStyle(target).getPropertyValue('position');

		// HIDE TIMEOUT SET › CLEAR IT
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			hideTimeout = null;
		}

		// TOOLTIP NOT VISIBLE › FADEIN AFTER TIMEOUT
		if (!visible)
			showTimeout = setTimeout(() => {
				ts.visibility = 'visible';
				visible = true;
			}, timeoutDelay);

		// GET THE TEXT FOR THE TOOLTIP FROM THE 'data-tooltip' ATTRIBUTE
		span.innerHTML = target.getAttribute('data-tooltip') as string;

		// GET SIZE AND POSITION OF THE TOOLTIP ELEMENT
		const tooltipSize: DOMRect = tooltip.getBoundingClientRect();

		// GET SIZE AND POSITION OF THE TARGET ELEMENT
		const targetSize: DOMRect = target.getBoundingClientRect();

		// CALCULATE CENTER OF TARGET
		const center: number = Math.round(targetSize.left + targetSize.width / 2);

		// POSITION TOOLTIP
		// -----------------------------------------------------------------
		let tooltipTop: number = targetSize.bottom + 3;
		let tooltipLeft: number = Math.round(center - tooltipSize.width / 2);
		let tooltipAlign: 'center' | 'left' | 'right' = 'center';
		let arrowLeft: number = Math.round(tooltipSize.width / 2 - arrowCenterOffset);
		let arrowRotation: 45 | -135 = 45;

		// IF TOOLTIP OFF BOTTOM OF SCREEN › POSITION ABOVE TARGET
		if (targetSize.bottom + tooltipSize.height > w.innerHeight) {
			tooltipTop = targetSize.top - tooltipSize.height - 3;
			arrowRotation = -135;
		}

		// IF TOOLTIP OFF LEFT SIDE OF SCREEN › SHIFT RIGHT ONTO SCREEN
		if (tooltipSize.width / 2 > center - viewportMargin) {
			tooltipLeft = viewportMargin;
			tooltipAlign = 'left';
			arrowLeft = center - viewportMargin - arrowCenterOffset;
		}

		// IF OFF RIGHT SIDE OF SCREEN › SHIFT LEFT ONTO SCREEN
		if (center + tooltipSize.width / 2 > w.innerWidth - viewportMargin) {
			tooltipLeft = w.innerWidth - tooltipSize.width - viewportMargin;
			tooltipAlign = 'right';
			arrowLeft = center - tooltipLeft - arrowCenterOffset;
		}

		// FOR WHATEVER MINOR PERFORMANCE IMPROVEMENT THIS MAY PROVIDE
		w.requestAnimationFrame(() => {
			// APPLY POSITION TO TOOLTIP
			ts.transform = `translate( ${tooltipLeft}px, ${tooltipTop}px )`;
			ts.textAlign = tooltipAlign;

			// APPLY POSITION TO ARROW
			as.transform = `rotate(${arrowRotation}deg)`;
			as.inset =
				arrowRotation > 0
					? `-5px auto auto ${arrowLeft}px`
					: `auto auto -5px ${arrowLeft}px`;
		});
	}
}

function handleMouseLeave(e: MouseEvent) {
	// DONT HIDE TOOLTIP IF WE'RE STILL INSIDE THE TARGET ELEMENT
	if (e.relatedTarget instanceof Node && visibleTarget?.contains(e.relatedTarget)) return;

	// IF A SHOW TIMEOUT IS SET CLEAR IT
	if (showTimeout) clearTimeout(showTimeout);

	// IF A TOOLTIP IS VISIBLE & NO TIMEOUT › SET TIMEOUT
	if (visible && !hideTimeout) hideTimeout = setTimeout(hideTooltip, timeoutDelay);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce(callback: (...params: any[]) => void, duration = 0) {
	let timeoutId: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (...args: any) => {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			callback(...args);
		}, duration);
	};
}
