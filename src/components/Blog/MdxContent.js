'use client';

import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

// 自定义图片点击放大组件
function ImageWithLightbox({ src, alt }) {
  const [open, setOpen] = useState(false);
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
  );
}

// 只注册 Image 和 img 覆盖；Tag、Location 等由 RenderMdx 传入
const sharedComponents = {
  Image,
  img: (props) => <ImageWithLightbox {...props} />,
};

// 加防御逻辑，避免 undefined.default 报错
const useMDXComponent = (code) => {
  if (!code) {
    return () => <div>⚠️ MDX code missing</div>;
  }
  try {
    const fn = new Function(code);
    const Comp = fn({ ...runtime });
    return Comp?.default || (() => <div>⚠️ Invalid MDX</div>);
  } catch (err) {
    console.error("MDX compile error:", err);
    return () => <div>⚠️ MDX compile error</div>;
  }
};

const MDXContent = ({ code, components, ...props }) => {
  const Component = useMDXComponent(code);
  return (
    <Component
      components={{ ...sharedComponents, ...components }}
      {...props}
    />
  );
};

export default MDXContent;
