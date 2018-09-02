/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const input = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const exec = require('child_process').execSync;

const help = `
Usage: release.js <version>
  -b    Branch name to push. 
`;

if (input['help'] || input['h']) {
  console.log(help);
  process.exit(0);
}

const version = input._[0];
const branch = input['b'] || 'master';

if (!version) {
  console.log('Please provide a version.', "\n", help);
  process.exit(1);
}

console.log(`>> Replace version to ${version}`);

const pjson = require('../package.json');

pjson.version = version;

fs.writeFileSync(__dirname + '/../package.json', JSON.stringify(pjson, null, 2));

console.log('>> Push to git');

exec(`git checkout ${branch}`);
exec(`git commit -am "Prepare ${version} release."`, () => {});
exec(`git tag ${version} -f`);
exec(`git push origin ${branch}`);
exec(`git push origin --tags -f`);
exec(`git checkout master`);

console.log('>> Publish to npm');

exec(`npm publish`);
