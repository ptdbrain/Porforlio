// Production preview on 4176. Run serially after the browser test suite.
const {chromium}=require('playwright-core');
const fs=require('node:fs');
const output='/tmp/ptd-redesign';

(async()=>{
  fs.mkdirSync(output,{recursive:true});
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const records=[];
  try{
    for(const width of [1440,390]){
      const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'no-preference',isMobile:width===390,hasTouch:width===390});
      await context.addInitScript(()=>{
        localStorage.setItem('ptd-motion','full');sessionStorage.setItem('ptd-neural-intro-v2-seen','1');
      });
      const page=await context.newPage(),errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      const client=await context.newCDPSession(page);
      await client.send('Emulation.setCPUThrottlingRate',{rate:width===390?4:1});
      await client.send('Network.enable');
      await client.send('Network.emulateNetworkConditions',{offline:false,latency:40,downloadThroughput:10*1024*1024/8,uploadThroughput:2*1024*1024/8});
      const load=async route=>{
        await page.goto('http://127.0.0.1:4176'+route);
        await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(850);
      };
      async function sample(flow,action){
        await page.evaluate(()=>{
          window.journeyGaps=[];window.journeySampling=true;
          let last;
          function tick(now){
            if(last)journeyGaps.push(now-last);
            last=now;if(journeySampling)requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
        await action();
        const record=await page.evaluate(()=>{
          journeySampling=false;
          const values=journeyGaps.sort((a,b)=>a-b);
          return {samples:values.length,median:values[Math.floor(values.length*.5)],p95:values[Math.floor(values.length*.95)],max:values.at(-1),over25ms:values.filter(value=>value>25).length};
        });
        records.push({width,flow,...record,errors:[...errors]});
        console.log(JSON.stringify(records.at(-1)));
      }
      await load('/');
      await sample('Home → Work → Personal → Home',async()=>{
        for(const href of ['/work','/personal','/']){
          await page.evaluate(href=>document.querySelector(href==='/'?'.wordmark':`.main-nav a[href="${href}"]`).click(),href);
          await page.waitForFunction(()=>!document.documentElement.dataset.routeMotion);
          await page.waitForTimeout(180);
        }
      });
      await load('/work');
      await page.getByRole('tablist').scrollIntoViewIfNeeded();await page.waitForTimeout(700);
      await sample('Capability selection ×4',async()=>{
        for(let index=0;index<4;index++){
          await page.getByRole('tab').nth(index).focus();await page.keyboard.press('ArrowDown');
          await page.waitForTimeout(520);
        }
      });
      await load('/personal');
      await page.locator('.sport-gallery .photo-button').first().click();await page.waitForTimeout(500);
      await sample('Decoded gallery transitions ×6',async()=>{
        for(let index=0;index<6;index++){
          await page.getByRole('button',{name:'Ảnh tiếp theo'}).click();
          await page.waitForFunction(()=>document.querySelector('.gallery-stage')?.getAttribute('aria-busy')==='false');
          await page.waitForTimeout(720);
        }
      });
      await context.close();
    }
    fs.writeFileSync(`${output}/journey-interactions.json`,JSON.stringify(records,null,2));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
