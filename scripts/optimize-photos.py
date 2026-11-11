# Optional authoring tool: python3 scripts/optimize-photos.py (requires Pillow).
from PIL import Image
from pathlib import Path
import json
out=Path('public/media');out.mkdir(exist_ok=True)
manifest={}
for p in Path('public/anh').glob('*.jpg'):
 im=Image.open(p).convert('RGB'); sizes=[]
 for width in sorted(set([min(640,im.width),min(1280,im.width)])):
  copy=im.copy();copy.thumbnail((width,99999));name=f'{p.stem}-{width}.webp';copy.save(out/name,'WEBP',quality=84,method=6);sizes.append((f'/media/{name}',copy.width))
 manifest['/anh/'+p.name]={'src':sizes[-1][0],'srcSet':', '.join(f'{src} {width}w' for src,width in sizes),'width':im.width,'height':im.height}
Path('src/content/imageManifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print('Optimized',len(manifest),'images; originals preserved')
