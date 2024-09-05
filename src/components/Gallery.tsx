'use client';

import { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';

import Image from "next/image";
import QuestionIconImage from "@/assets/question-icon.png";
import MenuIconImage from "@/assets/menu.png";
import PlusIconImage from "@/assets/plus-icon.png";
import LeftArrowImage from "@/assets/left-arrow.png";
import RightArrowImage from "@/assets/right-arrow.png";
import AboutImage from "@/assets/about.png";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Gallery = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = () => {
        axios.get('/api/gallery-images')
            .then((response) => {
                if (response?.status === 200) {
                    setGalleryImages(response?.data);
                }
            })
            .catch((err: any) => {
                console.log(err);
            })
    };

    const addNewImage = async (e: any) => {
        e.preventDefault();

        const form = e.target;

        const image = form?.newimage.files[0];

        if (!image) {
            return toast.error("Select An Image File!");
        }

        const formData = new FormData();

        formData.append('image', image);

        const img_hosting_url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_img_hosting_token}`;

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(async (imgResponse) => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;

                    const response = await axios.post('/api/gallery-images', {
                        imageUrl: imgURL
                    });

                    console.log(response);

                    if (response?.status === 201) {
                        console.log('New Image Uploaded!');
                        toast.success("New Image Added Successfully!");
                        getImages();
                        setIsImageModalOpen(false);
                    }
                }
            })
    }

    return (
        <>
            <section className="bg-[#363C43] w-[720px] h-[330px] flex gap-[17px] relative rounded-[18.89px]">
                <div className="absolute top-5 left-3 flex flex-col justify-start items-start gap-[105px]">
                    <Image src={QuestionIconImage} alt="Question Icon" width={24} height={24} />
                    <Image src={MenuIconImage} alt="Menu Icon" width={20} height={30.69} />
                </div>
                <div className="w-full flex flex-col gap-[45px]">
                    <div className="w-full flex gap-[181px] items-center pl-[51px] pr-[63px] pt-[17px]">
                        <div className="w-fit px-[38px] py-4 rounded-[20px] font-medium text-xl leading-[30px] text-[#FFFFFF] bg-[#171717] gallery-inner-shadow">
                            Gallery
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <button onClick={() => setIsImageModalOpen(true)} className="w-[131.32px] h-[46px] flex justify-center gap-2 items-center bg-[#FFFFFF08] rounded-[104px] add-image-shadow plus-jakarta-sans font-bold text-[12px] leading-[6.29px] text-[#FFFFFF]">
                                <Image src={PlusIconImage} alt="Plus Icon" width={9.58} height={9.58} />
                                <span className="plus-jakarta-sans">ADD IMAGE</span>
                            </button>
                            <div className="flex justify-center items-center gap-[18px]">
                                <button onClick={() => swiperRef.current?.slidePrev()} className="flex justify-center items-center w-[45px] h-[45px] arrow-background arrow-shadow rounded-full">
                                    <Image src={LeftArrowImage} alt="Left Arrow" width={14.19} height={14} />
                                </button>
                                <button onClick={() => swiperRef.current?.slideNext()} className="flex justify-center items-center w-[45px] h-[45px] arrow-background arrow-shadow rounded-full">
                                    <Image src={RightArrowImage} alt="Left Arrow" width={14.19} height={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pl-[51px] pr-[57px] pb-[27px]">
                        <Swiper
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }} // Attach swiper instance
                            slidesPerView={3}
                            spaceBetween={21}
                            modules={[Navigation]}
                            className="w-full flex justify-start"
                        >
                            {
                                galleryImages?.length === 0 ? (
                                    ''
                                ) : (
                                    galleryImages?.map((galleryImage: any) => (
                                        <SwiperSlide key={galleryImage?._id} className="!w-[190px] !h-[179px]">
                                            <div className="relative w-full h-full">
                                                <Image fill={true} src={galleryImage?.imageUrl} alt="Gallery" className="w-full h-full object-cover rounded-3xl" />
                                                <div className="absolute inset-0 rounded-3xl bg-[#00000033]"></div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                )
                            }

                        </Swiper>
                    </div>
                </div>
            </section>
            {
                isImageModalOpen && (
                    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 border-2 border-slate-500 w-[600px] h-[350px] bg-[#363C43] rounded add-image-shadow">
                        <form onSubmit={addNewImage} className="w-full h-full flex flex-col justify-center items-center">
                            <label htmlFor="newimage" className="">
                                <input id="newimage" name="newimage" type="file" className="border-2 bg-white rounded" />
                            </label>
                            <div className="pt-10">
                                <input type="submit" value="Add Image" className="bg-black px-12 py-3 text-white text-xl font-medium rounded border border-slate-500 cursor-pointer" />
                            </div>
                        </form>
                        <button onClick={() => setIsImageModalOpen(false)} className="absolute top-3 right-3 bg-red-600 text-white font-semibold px-3 py-1 rounded">X</button>
                    </div>
                )
            }
        </>
    )
}

export default Gallery;