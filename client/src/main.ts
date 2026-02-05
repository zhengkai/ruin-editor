import './style/index.scss'
import { htmlNew } from './util/html.ts';
import { loadAsset } from './config.ts';
import { tilesetInit, tilesetComponent } from './component/tileset.ts';
import { mapInit, mapComponent } from './component/map.ts';
import { opComponent, bindHotKey } from './component/op.ts';
import { setAllDrag } from './effect/drag.ts';

(async () => {

	const app = document.getElementById('app');
	if (!app) {
		return;
	}

	const a = await loadAsset();
	console.log('asset manifest', a);

	const box = htmlNew('div', 'map-box');
	app.appendChild(box);

	await tilesetInit(a.tileset);

	const panel = htmlNew('div', 'panel');
	document.body.appendChild(panel);

	const op = opComponent(a.map, (idx: number) => {
		mapInit(a.map[idx]);
		box.replaceChildren(mapComponent());
	});
	panel.appendChild(op);

	const ht = await tilesetComponent();
	panel.appendChild(ht);

	bindHotKey(panel);

	setAllDrag('.tile');
})();
