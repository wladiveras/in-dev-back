import { register } from 'node:module'

register('ts-node/esm', import.meta.url)

await import('./bin/console.js')