import './style/index.scss'
import { pb } from './pb';
import { loadAsset } from './config.ts';
import { tilesetComponent } from './component/tileset.ts';

(async () => {
	const a = await loadAsset();
	console.log(a);

	const ht = await tilesetComponent(a.tileset.map(t => pb.Tileset.create(t)));
	document.body.appendChild(ht);
})();
