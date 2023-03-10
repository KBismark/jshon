module.exports = function (JSERVE, HTMLEscape, PAGEDATA, INSERTABLE) {
  return `<!DOCTYPE html> <html id="${
    JSERVE.id
  }" lang="en"> <head> <meta charset="UTF-8"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>${HTMLEscape(
    INSERTABLE.title
  )}</title> <meta name="description" content="${HTMLEscape(
    INSERTABLE.meta.description
  )}"/> <link rel="canonical" href="${HTMLEscape(
    INSERTABLE.meta.canonical
  )}"/> <meta property="og:url" content="${HTMLEscape(
    INSERTABLE.meta.site_url
  )}"/> <meta property="og:title" content="${HTMLEscape(
    INSERTABLE.meta.title
  )}"/> <meta property="og:description" content="${HTMLEscape(
    INSERTABLE.meta.description
  )}"/> <meta property="og:image" content="${HTMLEscape(
    INSERTABLE.meta.image_url
  )}"/> <meta property="og:site_name" content="FLATNOSC.COM"/> <meta property="og:type" content="website"/> <meta name="twitter:card" content="summary"> <meta name="twitter:site" content="@FLATNOSC.COM"/> <meta name="twitter:title" content="${HTMLEscape(
    INSERTABLE.meta.title
  )}"/> <meta name="twitter:description" content="${HTMLEscape(
    INSERTABLE.meta.description
  )}"/> <meta name="twitter:image" content="${HTMLEscape(
    INSERTABLE.meta.image_url
  )}"/> <meta name="application-name" content="FLATNOSC.COM"/> <meta name="apple-mobile-web-app-status-bar-style" content="#f2f6ff"/> <meta name="apple-mobile-web-app-capable" content="yes"/> <meta name="mobile-web-app-capable" content="yes"/> <link rel="apple-touch-icon" sizes="57x57" href="${HTMLEscape(
    INSERTABLE.meta.apple_icon_url
  )}-57x57.png"/> <link rel="apple-touch-icon" sizes="60x60" href="${HTMLEscape(
    INSERTABLE.meta.apple_icon_url
  )}-60x60.png"/> <link rel="apple-touch-icon" sizes="72x72" href="${HTMLEscape(
    INSERTABLE.meta.apple_icon_url
  )}-72x72.png"/> <link rel="apple-touch-icon" sizes="76x76" href="${HTMLEscape(
    INSERTABLE.meta.apple_icon_url
  )}-76x76.png"/> <link rel="apple-touch-icon" sizes="114x114" href="${HTMLEscape(
    INSERTABLE.meta.apple_icon_url
  )}-114x114.png"/> <link rel="apple-touch-icon" sizes="120x120" href="${HTMLEscape(
    INSERTABLE.meta.apple_icon_url
  )}-120x120.png"/> <link rel="apple-touch-icon" sizes="144x144" href="${HTMLEscape(
    INSERTABLE.meta.apple_icon_url
  )}-144x144.png"/> <link rel="apple-touch-icon" sizes="152x152" href="${HTMLEscape(
    INSERTABLE.meta.apple_icon_url
  )}-152x152.png"/> <link rel="apple-touch-icon" sizes="180x180" href="${HTMLEscape(
    INSERTABLE.meta.apple_icon_url
  )}-180x180.png"/> <link rel="icon" type="image/png" sizes="192x192" href="${HTMLEscape(
    INSERTABLE.meta.android_icon_url
  )}-192x192.png"/> <link rel="icon" type="image/png" sizes="32x32" href="${HTMLEscape(
    INSERTABLE.meta.favicon_url
  )}-32x32.png"/> <link rel="icon" type="image/png" sizes="96x96" href="${HTMLEscape(
    INSERTABLE.meta.favicon_url
  )}-96x96.png"/> <link rel="icon" type="image/png" sizes="16x16" href="${HTMLEscape(
    INSERTABLE.meta.favicon_url
  )}-16x16.png"/> <link rel="manifest" href="/statics/data/manifest.json"/> <meta name="msapplication-TileColor" content="#f2f6ff"/> <meta name="msapplication-TileImage" content="${HTMLEscape(
    INSERTABLE.meta.ms_icon_url
  )}-144x144.png"/> <meta name="theme-color" content="#f2f6ff"/> <link rel="stylesheet" href="/statics/css/fonts-ti.css"/> <link rel="stylesheet" href="/statics/css/indexx.css"/> <link rel="stylesheet" href="/statics/css/stuff.css"/> <link rel="stylesheet" href="/statics/css/app.css"/> <style id="jsh-dev-app-css"></style> ${
    JSERVE.is_ssr
  } <script src="/statics/js/jshon.dev.v0.0.1.js"></script> <script src="/statics/data/client"></script> </head> <body> <div id="page">${JSERVE.render()}</div> </body> </html> ${
    /* */ ""
  } `;
};
