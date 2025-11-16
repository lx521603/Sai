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

// ✅ 保留你原来的所有组件，只在这里新增 img
const sharedComponents = {
  Image,
  Location,        // 你之前注册的 Location 功能
  // 其它你原来有的组件都写在这里，比如：
  // VideoPlayer,
  // Map,
  // CustomButton,
  img: (props) => <ImageWithLightbox {...props} />, // 新增的图片放大功能
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
