import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"


const IndexPage = ({ data }) => {
  const { nodes } = data.allMarkdownRemark;
  return (
    <Layout>
      <div className={styles.textCenter}>
        <h1>
          Победители <b>Лиги Чемпионов УЕФА</b>
        </h1>
      </div>
      <div className="posts">
        {nodes.map(post => {
          const { country, team, title, image, cupsCount} = post.frontmatter
          const img = getImage(image)
          return (
            <div  key={post.id} className="post">
              <div className="i">
              <GatsbyImage image={img} alt={{team} + ' logo'} />
              </div>
              <div className="t">
              <Link to={`/${title}`}>{team}</Link>
              </div>
              <div className="c">
                 Количество кубков: {cupsCount}
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
query MainPage{
  allMarkdownRemark (sort: {frontmatter: {cupsCount: DESC}}) {
    nodes {
      frontmatter {
        country
        team
        title
        cupsCount
        image {
          childImageSharp {
            gatsbyImageData(height: 100, formats: AUTO, placeholder: BLURRED)
          }
        }
      }
      id
    }
  }
}
`
