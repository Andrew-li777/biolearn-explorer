import {defineConfig} from 'vite';
import tailwind from '@tailwindcss/vite';
import {execFileSync} from 'node:child_process';
let commit='unavailable',dirty=false;
try{commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();dirty=!!execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim()}catch{}
export default defineConfig({plugins:[tailwind()],base:process.env.WEB_BASE||'/',define:{__BUILD_INFO__:JSON.stringify({commit,dirty,builtAt:new Date().toISOString()})}});
