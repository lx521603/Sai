'use client';

import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

export default function MDXContent({ code, components, ...props }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  // 用 useMemo 收集所有图片
  const images = useMemo(() => {
    const arr = []
    const ImageWithLightbox = ({ src, alt }) => {
      const i = arr.length
      arr.push({ src, description: alt })
      return (
        <img
          src={src}
          alt={alt}
          className="cursor-pointer"
          onClick={() => {
            setIndex(i)
            setOpen(true)
          }}
        />
      )
    }
    const sharedComponents = {
      Image,
      img: (props) => <ImageWithLightbox {...props} />,
    }
    const useMDXComponent = (code) => {
      if (!code) return () => <div>⚠️ MDX code missing</div>
      try {
        const fn = new Function(code)
        const Comp = fn({ ...runtime })
        return Comp?.default || (() => <div>⚠️ Invalid MDX</div>)
      } catch (err) {
        console.error('MDX compile error:', err)
        return () => <div>⚠️ MDX compile error</div>
      }
    }
    const Component = useMDXComponent(code)
    return { Component, sharedComponents, arr }
  }, [code])

  return (
    <>
      <images.Component
        components={{ ...images.sharedComponents, ...components }}
        {...props}
      />
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={images.arr}
        plugins={[Thumbnails, Zoom]}
      />
    </>
  )
}
