'use client';

import Image from "next/image"
import QuestionIconImage from "@/assets/question-icon.png";
import MenuIconImage from "@/assets/menu.png";
import { useState } from "react";

const ToggleBar = () => {
  const [isAboutMe, setIsAboutMe] = useState(true);
  const [isExperience, setIsExperience] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);

  return (
    <section className="bg-[#363C43] w-[720px] flex gap-[17px] relative rounded-[18.89px]">
      <div className="absolute top-5 left-3 flex flex-col justify-start items-start gap-[105px]">
        <Image src={QuestionIconImage} alt="Question Icon" width={24} height={24} />
        <Image src={MenuIconImage} alt="Menu Icon" width={20} height={30.69} />
      </div>
      <div className="flex flex-col gap-[35px]">
        <div className="bg-[#171717] w-[614px] rounded-[23px] flex justify-start mx-[53px] mt-[17px]">
          <div onClick={() => { setIsAboutMe(true); setIsExperience(false); setIsRecommended(false) }} className={`w-[195px] h-[49px] m-[6px] mb-[7px] text-[#FFFFFF] flex justify-center items-center font-medium leading-[16.12px] hover:bg-[#28292F] rounded-2xl custom-hover cursor-pointer ${isAboutMe && 'bg-[#28292F] custom-hover-effect'}`}>
            About Me
          </div>
          <div onClick={() => { setIsAboutMe(false); setIsExperience(true); setIsRecommended(false) }} className={`w-[195px] h-[49px] m-[6px] mb-[7px] text-[#FFFFFF] flex justify-center items-center font-medium leading-[16.12px] hover:bg-[#28292F] rounded-2xl custom-hover cursor-pointer ${isExperience && 'bg-[#28292F] custom-hover-effect'}`}>
            Experiences
          </div>
          <div onClick={() => { setIsAboutMe(false); setIsExperience(false); setIsRecommended(true) }} className={`w-[195px] h-[49px] m-[6px] mb-[7px] text-[#FFFFFF] flex justify-center items-center font-medium leading-[16.12px] hover:bg-[#28292F] rounded-2xl custom-hover cursor-pointer ${isRecommended && 'bg-[#28292F] custom-hover-effect'}`}>
            Recommended
          </div>
        </div>

        {
          isAboutMe && (
            <div className="ml-[53px] mr-[13px] mb-[27px] text-[#969696] h-[175px]">
              <div className="scroll-container">
                <div className="scroll-content">
                  <p className="pb-4 text-[20px] leading-[25.2px] max-w-[611px]">
                    Hello! I’m Dave, your sales rep here from Salesforce. I’ve been working at this awesome company for 3 years now.
                  </p>
                  <p className="font-normal text-[20px] leading-[25.2px] max-w-[611px] plus-jakarta-sans">
                    I was born and raised in Albany, NY& have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9-10 AM. This is a...
                  </p>
                </div>
              </div>
            </div>
          )
        }

        {
          isExperience && (
            <div className="ml-[53px] mr-[13px] mb-[27px] text-[#969696] max-w-[611px] h-[175px]">
              <ol className="list-decimal list-inside flex flex-col items-start pl-4 gap-5 text-[20px] leading-[25.2px] plus-jakarta-sans">
                <li className="list-item">Senior Sales Rep - XYZ Company</li>
                <li className="list-item">Junior Sales Rep - XYZ Company</li>
                <li className="list-item">Intern Sales Rep - XYZ Company</li>
              </ol>
            </div>
          )
        }

        {
          isRecommended && (
            <div className="ml-[53px] mr-[13px] mb-[27px] text-[#969696] max-w-[611px] h-[175px]">
              <ul className="list-inside flex flex-col items-start pl-4 gap-5 text-[20px] leading-[25.2px] plus-jakarta-sans">
                <li className="list-item">
                  John Doe: He is a great mate. We are colleague at work, he helped me a lot
                </li>
                <li className="list-item">
                  Henry Man: He worked under me as an intern. His work ethics are great.
                </li>
              </ul>
            </div>
          )
        }
      </div>
    </section>
  )
}

export default ToggleBar