import Image from 'next/image'
import React from 'react'
import profileCharacter from "../../../public/character.png"

const AboutCoverSection = () => {
  return (
    <section className='w-full md:h-[75vh] border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light'>
        <div className='w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center'> 
            <Image src={profileCharacter} alt="CodeBucks" 
            className='w-4/5  xs:w-3/4 md:w-full h-full object-contain object-center'
            priority
            sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
            />
        </div>

        <div className='w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16'>
            <h2 className='font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left'>
            Dream Big, Work Hard, Achieve More!敢于梦想，努力奋斗，成就更多！
            </h2>
            <p className='font-medium capitalize mt-4 text-base'>
            这句箴言驱动着我作为自由职业者的热情。我将创新科技与永恒设计融合，创造引人入胜的数字体验。受自然与文学启发，我始终保持学习者的姿态，勇于迎接挑战。每一个项目，我都力求留下持久的影响——一像素一积累。
            </p>
        </div>
    </section>
  )
}

export default AboutCoverSection