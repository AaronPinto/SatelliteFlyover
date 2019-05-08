const czml = require('czml-writer');
const writeFile = require('fs').writeFile;

let tle = `SKYSAT-1
1 39418U 13066C   19126.18813839  .00000529  00000-0  48503-4 0  9991
2 39418  97.6534 208.8335 0023229 128.9473 231.3825 14.98826113298121`;
let orbit = new czml.orbit.fromTle(tle);
orbit.settings.duration = 60 * 60 * 24 * 5;
const timeRange = new Date(new Date('2019-04-21').setUTCHours(0, 0, 0, 0));
orbit.setEpoch(Math.round(timeRange.getTime() / 1000.0));

writeFile('orbitJS.czml', JSON.stringify(orbit.czml()), err => console.log(err ? err : 'success'));
