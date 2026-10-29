const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 3,
  timeout: 30000,
  reporter: [['list'], ['html', {open:'never'}]],
  use: {baseURL:'http://127.0.0.1:4174',channel:'chrome',reducedMotion:'reduce',trace:'retain-on-failure',screenshot:'only-on-failure'},
  projects: [
    {name:'desktop',use:{viewport:{width:1440,height:1000}}},
    {name:'mobile',use:{viewport:{width:390,height:844},isMobile:true,hasTouch:true}},
  ],
  webServer: {command:'npm run build && npm run preview -- --port 4174 --strictPort',url:'http://127.0.0.1:4174',reuseExistingServer:false,timeout:60000},
});
