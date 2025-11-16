'use client';

import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function ImageWithLightbox({ src, alt }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img src={src} alt={alt} className="cursor-pointer" onClick={() => setOpen(true)} />
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

const sharedComponents = {
  Image,
  Location, // ✅ 确保这里注册了
  img: (props) => <ImageWithLightbox {...props} />,
};

const useMDXComponent = (code) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const MDXContent = ({ code, components, ...props }) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} {...props} />;
};

export default MDXContent;
