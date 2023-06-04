'use client';


import MockupWindow from "../../components/MockupWindow"
import { useTranslation } from 'next-i18next'
import { Swiper, SwiperSlide } from 'swiper/react';



import 'swiper/swiper.min.css'
export default function HomeClients () {

  const { t } = useTranslation('home')

  return (
    <>
      <div className="w-full flex flex-col space-y-10">
        <h2 className="text-3xl font-bold text-center">{ t('clients_title') }</h2>
        <div className="flex justify-center ">
          <div className="max-w-[1240px] w-full border grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
            <MockupWindow className="w-full text-black">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
              >
                <SwiperSlide className="bg-red-400 rounded-b-2xl">
                  <img src="/cases/glidrr/glidrr_home.png" alt="Glidrr Home" className="object-cover rounded-b-2xl"/>
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
              </Swiper>
            </MockupWindow>
            {/* <MockupWindow className="w-full" />
            <MockupWindow className="w-full" /> */}
          </div>
        </div>
      </div>
    </>
  )
}