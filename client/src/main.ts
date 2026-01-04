import './style/index.scss'
import { htmlNew } from './util/html.ts';
import { loadAsset } from './config.ts';
import { tilesetInit, tilesetComponent } from './component/tileset.ts';
import { mapInit, mapComponent } from './component/map.ts';
import { opComponent } from './component/op.ts';
import { setAllDrag } from './effect/drag.ts';

(async () => {

	const a = await loadAsset();
	console.log('asset manifest', a);

	const box = htmlNew('div', 'map-box');
	document.body.appendChild(box);

	await tilesetInit(a.tileset);

	const ht = await tilesetComponent();
	document.body.appendChild(ht);

	const op = opComponent(a.map, (idx: number) => {
		mapInit(a.map[idx]);
		box.replaceChildren(mapComponent());
	});
	ht.appendChild(op);

	setAllDrag('.tile');
})();
