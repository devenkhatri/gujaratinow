import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'

export default class IndexPage extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { nodes: posts } = data.allWordpressPost

    return (
      <Layout>
        <PostList posts={posts} title="Latest posts" />
        <Pagination pageContext={pageContext} pathPrefix="/" />
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }),
}

export const pageQuery = graphql`
  query IndexQuery($limit: Int!, $skip: Int!) {
    allWordpressPost(
      sort: {date: DESC},
      limit: $limit,
      skip: $skip
    ) {
      nodes {
        id
        title
        excerpt
        author {
          node {
            name
            slug
            avatar {
              url
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        slug
      }
    }
  }
`
