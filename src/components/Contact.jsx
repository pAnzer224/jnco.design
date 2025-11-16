import React from "react";

export default function Contact() {
  return (
    <section className="min-h-screen pt-[120px] px-[60px] pb-[60px] max-md:px-[30px] max-md:pt-[100px]">
      <div className="max-w-[800px] mx-auto">
        <h2 className="contact-title text-[clamp(40px,6vw,80px)] font-light mb-[60px] tracking-[-2px] text-[#003049]">
          Let's work together
        </h2>
        <div className="flex flex-col gap-[40px]">
          <div className="border-b border-[#669bbc] pb-[30px]">
            <div className="text-[12px] text-[#669bbc] tracking-[2px] uppercase mb-[12px]">
              Email
            </div>
            <a
              href="mailto:hello@jnco.design"
              className="text-[28px] font-light text-[#003049] no-underline transition-colors duration-300 hover:text-[#c1121f] max-md:text-[20px] max-md:break-words"
            >
              hello@jnco.design
            </a>
          </div>
          <div className="border-b border-[#669bbc] pb-[30px]">
            <div className="text-[12px] text-[#669bbc] tracking-[2px] uppercase mb-[12px]">
              Social
            </div>
            <div className="flex gap-[30px] mt-[20px]">
              {["IG", "BE", "IN", "DR"].map((social) => (
                <a
                  key={social}
                  href="facebook.com"
                  className="w-[50px] h-[50px] border border-[#669bbc] rounded-full flex items-center justify-center text-[#669bbc] no-underline transition-all duration-300 text-[18px] hover:border-[#c1121f] hover:text-[#c1121f] hover:-translate-y-[5px]"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div className="border-b border-[#669bbc] pb-[30px]">
            <div className="text-[12px] text-[#669bbc] tracking-[2px] uppercase mb-[12px]">
              Location
            </div>
            <div className="text-[28px] font-light text-[#003049] max-md:text-[20px] max-md:break-words">
              Cagayan de Oro, Philippines
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
