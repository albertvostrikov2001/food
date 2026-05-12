// Simple gh-pages deploy without the npm package (network-independent)
import { execSync } from 'child_process'
import { existsSync } from 'fs'

if (!existsSync('dist')) {
  console.error('dist/ not found — run npm run build first')
  process.exit(1)
}

const run = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: 'dist' })

run('git init -q')
run('git checkout -b gh-pages')
run('git add .')
run('git config user.email "albertvostrikov2001@gmail.com"')
run('git config user.name "albertvostrikov2001"')
run('git commit -m "Deploy to GitHub Pages"')
run('git remote add origin https://github.com/albertvostrikov2001/food.git')
run('git push -f origin gh-pages')
console.log('\n✅ Deployed to https://albertvostrikov2001.github.io/food/')
