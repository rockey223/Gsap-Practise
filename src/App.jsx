import React, { useEffect } from "react";
import "./App.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const App = () => {
  const trigger = {
    trigger: ".content",
    start: "top center",
    end: "bottom top",
    scrub: 1,
  };
  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, []);

  useGSAP(() => {
    gsap.to(".bgText", {
      y: "-7%",
      scrollTrigger: trigger,
    });

    gsap.to(".textcontent", {
      y: "85%",
      scrollTrigger: trigger,
    });

    gsap.to(".image1", {
      y: "-55%",

      scrollTrigger: {
        trigger: ".content",
        start: "top center",
        end: "top -125%",
        scrub: 1,
      },
    });

    gsap.to("body", {
      backgroundColor: "#3bd350",
      // ease: "Power3.in",
      scrollTrigger: {
        trigger: ".content",
        start: "top 10%",
        end: "top -10%",
        scrub: 1,
        // markers: true,
      },
    });
    gsap.to("body", {
      backgroundColor: "#ffffff",
      // ease: "Power3.out",
      scrollTrigger: {
        trigger: ".spacer2",
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
        // markers: true,
      },
    });

    gsap.to(".image2", {
      y: "-10%",
      scrollTrigger: {
        trigger: ".content",
        start: "top bottom",
        end: "bottom -200%",
        scrub: 1,
      },
    });
    gsap.to(".image3", {
      y: "-90%",
      scrollTrigger: {
        trigger: ".content",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });



    gsap.to('.spacer4',{
      y: '0%',
      ease: 'power3.out',
      scrollTrigger:{
        trigger: '.spacer3',
        start: 'top 30%',
        end: 'bottom top',
        scrub: 1,
        markers: true
      }
    })


  });

  return (
    <>
      <section className="spacer"></section>

      <section className="content">
        <img src='https://i.postimg.cc/ncGPchcY/1.jpg' alt="" loading="lazy" className="image image1" />
        <img src='https://i.postimg.cc/ncGPchcY/1.jpg' alt="" loading="lazy" className="image image2" />
        <img src='https://i.postimg.cc/ncGPchcY/1.jpg' alt="" loading="lazy" className="image image3" />
        <div className="textcontent">Hello</div>
        <div className="bgText">World</div>
      </section>

      <section className="spacer2"></section>
      <section className="spacer spacer3"></section>
      <section className="spacer spacer4"></section>
    </>
  );
};

export default App;
