const ghpages = require('gh-pages');
const fs = require('fs');
const path = require('path');

// Build first
console.log('Building project...');
require('child_process').execSync('npm run build', { stdio: 'inherit' });

// Deploy to subfolder
console.log('Deploying to sostainability folder...');
ghpages.publish('out', {
  dest: 'sostainability',
  branch: 'main',
  repo: 'https://github.com/cybercoded/cybercoded.github.io.git',
  dotfiles: true,
  message: 'Deploy to sostainability folder'
}, (err) => {
  if (err) {
    console.error('Deployment error:', err);
  } else {
    console.log('✅ Successfully deployed to https://cybercoded.github.io/sostainability/');
  }
});