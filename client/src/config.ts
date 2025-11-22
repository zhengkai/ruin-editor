import { pb } from './pb';

export async function loadAsset(): Promise<pb.AssetManifest> {

	let re = {};
	try {
		re = await (await fetch('asset/manifest.json')).json();
	} catch (_) {
	}

	return pb.AssetManifest.fromObject(re);
};
