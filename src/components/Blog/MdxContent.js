'use client';

import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

// 自定义图片点击放大组件
function ImageWithLightbox({ src, alt }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <img
        src={src}
        alt={alt}
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Lightbox
          mainSrc={src}
          onCloseRequest={() => setOpen(false)}
          imageCaption={alt}
        />
      )}
    </>
  )
}

// 保留 next/image，同时覆盖 img 为 Lightbox
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

const MDXContent = ({ code, components, ...props }) => {
  const Component = useMDXComponent(code)
  return (
    <Component
      components={{ ...sharedComponents, ...components }}
      {...props}
    />
  )
}

export default MDXContent
