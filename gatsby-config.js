require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `GujaratiNow`,
    description: `Headless Wordpress with Frontend by Gatsby and Reactjs`,
    author: `@devenkhatri`,
    siteUrl: `https://gujaratinow.netlify.app/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url:
          // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
          process.env.WPGRAPHQL_URL ||
          `https://wpgatsbydemo.wpengine.com/graphql` ||
          `https://localhost/graphql`,
        schema: {
          typePrefix: `Wordpress`,
        },
        develop: {
          hardCacheMediaFiles: true,
        },
        html: {
          createStaticFiles: false,
          useGatsbyImage: false,
        },
        type: {
          MediaItem: {
            createFileNodes: false,
            excludeFieldNames: [
              "contentNodes",
              "seo",
              "ancestors",
              "author",
              "template",
              "lastEditedBy",
              "authorDatabaseId",
              "authorId",
              "contentTypeName",
              "dateGmt",
              "desiredSlug",
              "enclosure",
              "isContentNode",
              "isTermNode",
              "modified",
              "modifiedGmt",
              "parentDatabaseId",
              "parentId",
              "srcSet",
              "parent",
              "children"
            ],
          },
        },
        production: {
          hardCacheMediaFiles: true,
          allow404Images: true,
          allow401Images: true,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gujaratinow`,
        short_name: `gujaratinow`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
