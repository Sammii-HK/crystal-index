const EXTERNAL_DATA_URL = 'https://www.crystalindex.co.uk/crystals';

function generateSiteMap(crystals) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.crystalindex.co.uk/</loc>
      </url>
      ${crystals
        .map(({ id }) => {
          return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
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
  const request = await fetch(EXTERNAL_DATA_URL);
  const crystals = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(crystals);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
