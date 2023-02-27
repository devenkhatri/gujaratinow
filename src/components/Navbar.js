import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(limit: 5, sort: {id: ASC}) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <nav className="navbar is-transparent">
        <div className="container">
          <div className="navbar-start">
            {data.allWordpressPage.edges.map((edge, i) => (
              <React.Fragment key={edge.node.slug}>
                <Link
                  className="navbar-item"
                  to={`/${edge.node.slug}`}
                >
                  {edge.node.title}
                </Link>
                {i !== data.allWordpressPage.edges.length - 1 && <> · </>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>
    )}
  />
)

export default Navbar
