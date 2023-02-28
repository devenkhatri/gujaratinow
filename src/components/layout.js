/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout.css"
import Navbar from "./Navbar"

const Layout = ({ children, title, description }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      wordpress {
        generalSettings {
          title
          description
        }
      }
      allWordpressPage {
        nodes {
          title
          slug
        }
      }
      allWordpressCategory {
        nodes {
          name
          slug
          posts {
            nodes {
              title
            }
          }
        }
      }
    }
  `)

  const allPages = data.allWordpressPage?.nodes;
  const allCategories = data.allWordpressCategory?.nodes;

  const siteTitle = data.wordpress?.generalSettings?.title || data.site.siteMetadata?.title || `Title`;
  const siteDescription = data.wordpress?.generalSettings?.description || data.site.siteMetadata?.description
  return (
    <>
      <Header siteTitle={siteTitle} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <div style={{ paddingBottom: "3rem" }}>
          <div style={{ fontSize: "2rem" }}><b>{siteTitle}</b></div>
          <div>{siteDescription}</div>
        </div>
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          © {new Date().getFullYear()} &middot; Built with Gatsby
          {/* <Navbar /> */}
          <div style={{display: "flex"}}>
            <div style={{padding: "1rem"}}>
              <div style={{ fontSize: "1rem" }}><b>Pages</b></div>
              {allPages && allPages.map(page => (
                <div key={page.slug}><Link to={page.slug}>{page.title}</Link></div>
              ))}              
            </div>
            <div style={{padding: "1rem"}}>
              <div style={{ fontSize: "1rem" }}><b>Categories</b></div>
              {allCategories && allCategories.map(category => (
                <div key={category.slug}><Link to={`/categories/${category.slug}`}>{category.name}</Link> - ({category.posts?.nodes?.length || 0})</div>
              ))}    
            </div>
          </div>
          
        </footer>
      </div>
    </>
  )
}

export default Layout
