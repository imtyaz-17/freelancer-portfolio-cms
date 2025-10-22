/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({ 
  api: { 
    projectId: '3bte25h4', 
    dataset: 'production' 
  },
  deployment: {
    appId: 'cimov20oz436x5mwyb10sit5',
  },
})
