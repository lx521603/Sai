'use client';

import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'
import { useState, useRef } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

// MDX 渲染组件
const MDXContent = ({ code, components, ...props }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  // 用 useRef 来持久化收集到的图片数组
  const imagesRef = useRef([])

  // 自定义图片组件：收集所有文章图片
  const ImageWithLightbox = ({ src, alt }) => {
    const currentIndex = imagesRef.current.length
    imagesRef.current.push({ src, description: alt })

    return (
      <img
        src={src}
        alt={alt}
        className="cursor-pointer"
        onClick={() => {
          setIndex(currentIndex)
          setOpen(true)
        }}
      />
    )
  }

  // 保留 next/image，同时覆盖 img 为 Lightbox
  const sharedComponents = {
    Image,
    img: (props) => <ImageWithLightbox {...props} />,
  }

  // 编译 MDX
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

  return (
    <>
      <Component components={{ ...sharedComponents, ...components }} {...props} />
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={imagesRef.current}
        plugins={[Thumbnails, Zoom]}
      />
    </>
  )
}

export default MDXContent
