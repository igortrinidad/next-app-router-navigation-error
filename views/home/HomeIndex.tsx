
import React, { useRef, useEffect, useState } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { useSpring, animated } from '@react-spring/web'
import { useRouter } from 'next/router'
import NavBar from './NavBar'
import HomeClients from './HomeClients'
import { useTranslation } from 'next-i18next'
import Lottie from 'react-lottie';
import craetiveThinking from '../../public/animated/creative-thinking.json'

// Little helpers ...
const url = (name: string, wrap = false) =>
`${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
export default function HomeIndex () {

  const router = useRouter()
  const { t } = useTranslation('home')

  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, duration: 5000 },
      to: { opacity: 1 },
    }),
    []
  )
  

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: craetiveThinking,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  
  const parallaxRef = useRef<IParallax>(null!)
  const [rotate, setRotate] = useState(0)
  const [scalePercentage, setScalePercentage] = useState(0)
  const PAGES = 3

  const eventListenerAltArrowDown = (e: any) => {
    if(e.altKey && e.key === 'ArrowDown') {
      const changeTo = router.locale === 'en' ? 'pt' : 'en'
      const { pathname, asPath, query } = router
      router.push({ pathname, query }, asPath, { locale: changeTo })
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', eventListenerAltArrowDown)
    return () => {
      window.removeEventListener('keydown', eventListenerAltArrowDown)
    }
  }, [])
  

  useEffect(() => {
    const handleScroll = (e: any) => {
      const height = parallaxRef.current.space
      const scrollablePages = PAGES - 1 // because you can't scroll past the last page 
      const scrollHeight = height * scrollablePages

      const scrollTop = e.target.scrollTop
      const percentScrolled = (scrollTop) / scrollHeight
      const currentPage = Math.floor(percentScrolled * scrollablePages)
      const currentPageScrollTop = scrollTop - (height * (currentPage))
      const currentPagePercent = currentPageScrollTop / height

      // because the ParallaxLayer below has an `offset` of `0`
      console.log(currentPage, currentPagePercent)
      setRotate(currentPagePercent)
      if (currentPage === 0) {
        setScalePercentage(currentPagePercent)
      } else if (currentPage === 1) {
        setScalePercentage(1)
      }
    }

    const container = parallaxRef.current.container.current
    container.addEventListener('scroll', handleScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
    <div className="hide-scrollbar" style={{ width: '100%', height: '100%', background: '#FAFAFA' }}>
      <Parallax ref={parallaxRef} pages={3} className="bg-gray-900">
        
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#6b7280' }} />
        
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: url('stars', true),
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer sticky={{ start: 0, end: 1 }} speed={0.01} style={{ pointerEvents: 'none' }}>
          <NavBar onClick={(page) => parallaxRef.current.scrollTo(page)} />
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={1}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 pointer-events-auto z-50 px-4 md:px-6 lg:px-12">
            <div className="flex items-center justify-center h-[50vh] md:h-[100vh] p-6">
              <h1 className="mt-6 text-[6vw] text-center md:text-left pointer-events-auto">
                { t('navigation_company_intro') }
              </h1>
            </div>
            <div className="flex items-center block h-[30vh] md:h-[100vh] flex items-center justify-center">
              <div className="w-2/3  aspect-square">
                <Lottie 
                  options={defaultOptions}
                  />
              </div>
            </div>
          </div>
        </ParallaxLayer>
        

        <ParallaxLayer offset={0.99} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={url('satellite4')} style={{ width: '6%', marginLeft: '90%' }} />
        </ParallaxLayer>
      
        <ParallaxLayer
          offset={1.3}
          speed={0.7}
        >
          <HomeClients />
        </ParallaxLayer>
        
        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: url('clients', true),
          }}
        />

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          onClick={() => parallaxRef.current.scrollTo(0)}>
          <img src={url('clients-main')} style={{ width: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.6}
          speed={-0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1
          }}>
          <img src={url('earth')} style={{ width: '60%', transform: `rotate(${rotate * 360}deg)` }} />
        </ParallaxLayer>

      </Parallax>
    </div>
    </>
  )
}