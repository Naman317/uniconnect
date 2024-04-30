# Exported from Render on 2024-04-30T18:44:40Z
services:
- type: web
  name: uniconnect
  runtime: node
  repo: https://github.com/Naman317/uniconnect
  plan: free
  envVars:
  - key: PORT
    sync: false
  region: oregon
  buildCommand: npm install
  startCommand: node index.js
  rootDir: backend
version: "1"
