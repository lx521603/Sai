import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

// 自定义图片预览组件
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

// 注册共享组件：覆盖 img，保留 next/image
const sharedComponents = {
  Image,
  img: (props) => <ImageWithLightbox {...props} />,
};

const useMDXComponent = (code) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const MDXContent = ({ code, components, ...props }) => {
  const Component = useMDXComponent(code);
  return (
    <Component components={{ ...sharedComponents, ...components }} {...props} />
  );
};

export default MDXContent;
