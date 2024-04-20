import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


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
          const { country, team, title, image, cupsCount } = post.frontmatter
          const img = getImage(image)
          return (
            <div>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image= {image.childImageSharp.images.fallback.src}
                    alt={{ team } + ' logo'}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {team}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to={`/${title}`}>{team}</Link>
                  </Button>
                </CardActions>
              </Card>
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
  allMarkdownRemark {
    nodes {
      frontmatter {
        country
        team
        title
        cupsCount
        image {
          childImageSharp {
            gatsbyImageData(formats: AUTO)
          }
        }
      }
      id
    }
  }
}
`
