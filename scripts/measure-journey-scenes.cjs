// Production preview on 4176; run without other browser tests/builds.
const {chromium}=require('playwright-core');
const fs=require('node:fs');
const output='/tmp/ptd-journey-scenes';
(async()=>{
 fs.mkdirSync(output,{recursive:true});
 const browser=await chromium.launch({channel:'chrome',headless:true}),records=[];
 try{
  for(const width of[1440,390]){
   const context=await browser.newContext({viewport:{width,height:900},isMobile:width===390,hasTouch:width===390,reducedMotion:'no-preference'});
   await context.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   const client=await context.newCDPSession(page);
   await client.send('Emulation.setCPUThrottlingRate',{rate:width===390?4:1});
   await client.send('Network.enable');
   await client.send('Network.emulateNetworkConditions',{offline:false,latency:40,downloadThroughput:10*1024*1024/8,uploadThroughput:2*1024*1024/8});
   await page.goto('http://127.0.0.1:4176/personal');await page.evaluate(()=>document.fonts.ready);
   const positions=await page.locator('[data-chapter]').evaluateAll(nodes=>({start:nodes[0].getBoundingClientRect().top+scrollY-innerHeight*.85,end:nodes.at(-1).getBoundingClientRect().bottom+scrollY-innerHeight*.65}));
   await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),positions.start);await page.waitForTimeout(500);
   for(const direction of['forward','backward']){
    await page.evaluate(()=>{window.sceneGaps=[];window.sceneSampling=true;let previous;function tick(t){if(previous)sceneGaps.push(t-previous);previous=t;if(sceneSampling)window.sceneFrame=requestAnimationFrame(tick)}window.sceneFrame=requestAnimationFrame(tick)});
    await client.send('Input.synthesizeScrollGesture',{x:Math.floor(width*.65),y:650,yDistance:(positions.end-positions.start)*(direction==='forward'?-1:1),speed:900,gestureSourceType:'mouse'});
    await page.waitForTimeout(1100);
    const result=await page.evaluate(()=>{sceneSampling=false;cancelAnimationFrame(window.sceneFrame);const values=sceneGaps.sort((a,b)=>a-b);return{samples:values.length,median:values[Math.floor(values.length*.5)],p95:values[Math.floor(values.length*.95)],max:values.at(-1),over25ms:values.filter(n=>n>25).length,overflow:document.documentElement.scrollWidth>innerWidth+1,active:document.querySelector('.life-chapter.is-active')?.id};});
    records.push({width,cpu:width===390?4:1,direction,...result,errors:[...errors]});console.log(JSON.stringify(records.at(-1)));
   }
   for(let index=0;index<3;index++){
    await page.locator('[data-chapter]').nth(index).evaluate(node=>scrollTo({top:node.getBoundingClientRect().top+scrollY-innerHeight*.3,behavior:'instant'}));
    await page.waitForTimeout(1200);
    await page.screenshot({path:`${output}/${width}-chapter-${index}.png`});
   }
   await context.close();
  }
  fs.writeFileSync(`${output}/performance.json`,JSON.stringify({browser:browser.version(),network:{latencyMs:40,downloadMbps:10,uploadMbps:2},note:'One native scroll in each direction through all three chapters; rAF timing is a lab proxy, not GPU presentation FPS or field Web Vitals.',records},null,2));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
