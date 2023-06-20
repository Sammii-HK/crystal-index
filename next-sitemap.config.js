/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: 'https://crystalindex.co.uk/',
  generateRobotsTxt: true, // (optional)
  exclude: [
    '/admin', 
    '/users', 
    '/crystals/add',
    '/locations/add',
    '/sitemap.xml',
    '/crystalInfos/add'
  ],
}

export default config;
