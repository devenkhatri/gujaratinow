import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Author = props => {
  const { data } = props
  const { posts, name } = data.wordpressUser
  const totalCount =
    (posts && posts.nodes.length) || 0
  const { title: siteTitle } = data.site.siteMetadata
  const title = `${totalCount} post${totalCount === 1 ? '' : 's'} by ${name}`

  return (
    <Layout>
      <Helmet title={`${name} | ${siteTitle}`} />
      <PostList posts={posts.nodes} title={title} />
    </Layout>
  )
}

export default Author

export const pageQuery = graphql`
  query AuthorPage($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wordpressUser(id: { eq: $id }) {
      name
      posts {
        nodes {
          id
          title
          slug
          content
          date(formatString: "MMMM DD, YYYY")
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
      }
    }
  }
`
