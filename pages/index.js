import Link from 'next/link'
import Head from 'next/head'

const siteTitle = "Zelda API"

function Index() {
  return (
    <div className="container">
      <Head>
      <link rel="icon" href="/icon.png" />
        <title>The Ultimate Zelda API</title>
        <meta
          name="description"
          content="The ultimate fan made zelda API!"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className='heroBanner'>
        <div className="container">
          <img className='apiLogo' src='https://user-images.githubusercontent.com/47995046/94375902-3ddbdb80-00ed-11eb-9acf-aa6a114af01b.png'/>
          <div className='buttons'>
            <a className='myButton'
              href='https://docs.zelda.fanapis.com/docs'>
              Go to Documentation
            </a>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        .heroBanner {
          height: 100vh;
          background: url(zelda-background.jpg) no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -moz-background-size: cover;
          -moz-background-size: cover;
          background-size: cover;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .apiLogo {
          margin-top: 15%;
          min-width: 350px;
          max-width: 25%;
          height: auto;
        }

        .buttons {
          margin-top: 32px
        }

       a {
         color: white;
         text-decoration: none;
         letter-spacing: 2px;
         font-size: 18px;
         border: 3px solid #020202;
         text-align: center;
         padding: 24px 50px;
         transition: all .35s;
       }

       a:hover {
        color: black;
        border: 3px solid #fff;
        background: #fff
      }
        
      `}</style>
    </div>
  )
}

export default Index
