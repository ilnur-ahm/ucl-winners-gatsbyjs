import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const SinglePost = ({ data }) => {

    const {html} = data.markdownRemark
    const { team, title, country, image, cupsCount} = data.markdownRemark.frontmatter
    const img = getImage(image)

    return (
        <Layout>
            <div>
                <h1>{team}</h1>
                <div>
                    <GatsbyImage image={img} alt={{ team } + ' logo'} />
                </div>
                <div>
                    {country}
                </div>
                <div>
                    {cupsCount}
                </div>
                <div dangerouslySetInnerHTML={{__html: html}}/>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="Seo title" />

export default SinglePost

export const query = graphql `
query PostQuery($title: String) {
    markdownRemark(frontmatter: {liga: {}, title: {eq: $title}}) {
      html
      frontmatter {
        team
        title
        country
        cupsCount
        image {
          childImageSharp {
            gatsbyImageData(width: 150)
          }
        }
      }
    }
  }`