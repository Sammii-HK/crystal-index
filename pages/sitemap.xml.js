const BASE_URL = process.env.SITE_URL;
const CRYSTALS_DATA_URL = `${BASE_URL}/api/crystal/allCrystals`;


function generateSiteMap(allCrystals) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}</loc>
      </url>
      ${allCrystals
        .map(({ id }) => {
          return `
        <url>
            <loc>${`${BASE_URL}/crystals/${id}`}</loc>
        </url>
      `;
        })
        .join('')}
    </urlset>
  `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(CRYSTALS_DATA_URL);
  const allCrystals = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(allCrystals.crystals);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
