/**
 @type {import('gatsby').GatsbyNode['createPages']}
 */

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
  query Posts {
    allMarkdownRemark {
    nodes {
      frontmatter {
        title
      }
    }
  }
}`)
  data.allMarkdownRemark.nodes.forEach(node => {
    const { title } = node.frontmatter
    actions.createPage({
      path: `/${title}`,
      component: path.resolve('./src/templates/single-post.js'),
      context: {title}
    })
  })
}
