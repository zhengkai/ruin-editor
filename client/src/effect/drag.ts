let ghost: HTMLElement | null = null;
let currentHover: HTMLElement | null = null;

function updateGhostPos(e: MouseEvent) {
	if (ghost) {
		ghost.style.left = `${e.clientX}px`;
		ghost.style.top = `${e.clientY}px`;
	}
}

export const setAllDrag = (selector: string, targetSelector: string = ".map > div") => {

	const getDropTarget = (x: number, y: number): HTMLElement | null => {
		const el = document.elementFromPoint(x, y);
		if (!el) return null;
		return el.closest(targetSelector) as HTMLElement | null;
	}

	const pointerMove = (ev: PointerEvent) => {
		updateGhostPos(ev as unknown as MouseEvent);
		const target = getDropTarget(ev.clientX, ev.clientY);
		if (target !== currentHover) {
			currentHover?.classList.remove('hover');
			target?.classList.add('hover');
			currentHover = target;
		}
	};

	document.querySelectorAll<HTMLElement>(selector).forEach(el => {
		el.addEventListener('pointerdown', (ev: PointerEvent) => {
			const d = el.dataset

			ghost = el.cloneNode(true) as HTMLElement;
			ghost.style.opacity = '0.5';
			ghost.style.position = 'fixed';
			ghost.style.pointerEvents = 'none';
			ghost.style.transform = 'translate(-50%, -50%)';
			ghost.style.zIndex = '9999';
			document.body.appendChild(ghost);
			updateGhostPos(ev as unknown as MouseEvent);

			// 捕获 pointer，让移动和抬起事件不会丢失
			(el as HTMLElement).setPointerCapture(ev.pointerId);

			const pointerUp = (ev: PointerEvent) => {
				(el as HTMLElement).releasePointerCapture(ev.pointerId);
				el.removeEventListener('pointermove', pointerMove);
				el.removeEventListener('pointerup', pointerUp);

				if (currentHover) {
					console.log(`Dropped: ${d.name}.${d.id} on `, currentHover);
				}

				currentHover?.classList.remove('hover');
				currentHover = null;
				ghost?.remove();
				ghost = null;
			};

			el.addEventListener('pointermove', pointerMove);
			el.addEventListener('pointerup', pointerUp);
		});
	});
}
