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
                <h1 className="teamName">{team}</h1>
                <div className="teamPage">
                <div className="teamImg">
                    <GatsbyImage image={img} alt={{ team } + ' logo'} />
                </div>
                <div className="teamInfo">
                    <h3>Country: {country}</h3>
                    <h3>Количество кубков: {cupsCount}</h3>
                </div>
                <div className="teamText" dangerouslySetInnerHTML={{__html: html}}/>
            </div>
            </div>
        </Layout>
    )
}

export const Head = ({ data }) => {
  const { team } = data.markdownRemark.frontmatter
  return (
    <Seo title={team} />

  )
}

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
            gatsbyImageData(height: 300)
          }
        }
      }
    }
  }`