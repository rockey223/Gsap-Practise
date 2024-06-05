import "./App.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable, TextPlugin } from "gsap/all";
import Lenis from "lenis";


const data = ["apple", "ball", "cat", "dog", "fish", "lion"];

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger, Draggable, TextPlugin);

function App1() {


  useEffect(()=>{
    const lenis = new Lenis()

    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
  },[])

  var tl = gsap.timeline();
  tl.pause();
  // useGSAP(() => {
  //   tl.addLabel("step1", 2)
  //     .to(".box1", { rotation: 360, duration: 3 }, "step1")
  //     .to(".box2", { rotation: 360, duration: 3 }, "step1+=3")
  //     .to(".box3", { rotation: 360, duration: 3 }, "step1+=1");

  //   tl.seek("step1");
  // });

  // function changeShape() {
  //   tl.addLabel("changeShape", 1);
  //   tl.to(".clickbox", { borderRadius: "50%" }, "changeShape")
  //     .to(".clickbox", { x: 600, duration: 3 }, "changeShape+=1")
  //     .to(".clickbox", { borderRadius: 0, duration: 2 }, "changeShape+=1.5");
  //   tl.seek("changeShape");
  //   // gsap.to(".clickbox",{borderRadius: "50%"})
  // }
  const div2 = useRef();
  const div2box = useRef();
  const list = useRef();

  // tl.to(".hellobye", {display: "none",y: "35px",duration: 0.1,})
  //   .to(".hellobtn", { scale: 1, duration: 0.1 }, "<")
  //   .to(".hellotext", {
  //     display: "block",
  //     y: "0",
  //     duration: 1,
  //     ease: "elastic.out",
  //   });

  const itemstoScroll = useRef();
  function getScrollAmount() {
    let itemstoScrollWidth = itemstoScroll.current.scrollWidth;
    return -(itemstoScrollWidth - window.innerWidth);
  }

  useGSAP(() => {
    let chars = document.querySelector(".tyied").textContent.split("");

    document.querySelector(".tyied").innerHTML = chars
      .map((char) => `<p class='char'>${char}</p>`)
      .join("");
    gsap.from(".char", {
      yPercent: 350,
      duration: 0.5,
      stagger: 0.2,
      opacity: 0,
    });

    tl.to(".hellotext", {
      display: "none",
      y: "-35px",
      duration: 0.2,
      ease: "power3.out",
    })
      .to(".hellobtn", { scale: 1.2, duration: 0.2 }, "<")
      .to(".hellobye", {
        display: "block",
        y: 0,
        duration: 0.2,
        ease: "power3.out",
      });

    gsap.fromTo(
      ".list",
      { x: 0, opacity: 0 },
      { opacity: 1, x: 20, stagger: 0.1 }
    );
    gsap.to(".list1", {
      ease: "bounce.out",
      stagger: 0.2,
      opacity: 1,
      x: 200,
      scrollTrigger: {
        trigger: ".list1",
        start: "top center",
        markers: true,
        duration: 3,
        // scrub: true,
        // duration: 2,
      },
    });
    gsap.to(div2box.current, {
      scrollTrigger: {
        trigger: div2box.current,
        start: "top bottom",
        end: "bottom top",
        markers: true,
        scrub: 3,
        // toggleActions: "play pause reverse none",
        // pin: true,
      },
      //  opacity: 1,
      x: "300%",
      rotation: 360,
    });

    Draggable.create(".clickbox", {
      bounds: ".div1",
    });

    gsap.to("#mine", {
      duration: 3,
      text: {
        value: "Hello welcome to my page. Thank you",
        // delimiter: " ",
        newClass: "newClass",
      },
    });

    gsap.to(".box", {
      x: 150,
      stagger: 1,
      scrollTrigger: {
        trigger: ".box",
        start: "bottom 80%",
        end: "top 20%",
        scrub: 3,
      },
    });

    gsap.to(itemstoScroll.current, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
      scrollTrigger: {
        trigger: ".div5",
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true,
      },
    });

    gsap.from(".listcenter>li", {
      x: -60,
      y: 90,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".listcenter>li",
        markers: true,
        start: "top bottom ",
        end: "bottom center",
        scrub: 1,
      },
    });
    // let debounceTimer
    //     gsap.to(".cards", {
    //       scrollTrigger: {
    //         trigger: ".cards",
    //         start: "top center",
    //         end: 'bottom, center',
    //         onUpdate: (self) => {
    //           const velocity = self.getVelocity();
    //           console.log(velocity);
    //           gsap.to(".cards", { skewY: velocity / 300 });
    //         },

    //       },
    //     });
    //     clearTimeout(debounceTimer);
    //       debounceTimer = setTimeout(() => {
    //         gsap.to(".cards", { skewY: 0, duration: 0.2 });
    //       }, 100); // Adjust the timeout duration as needed

    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter(".cards", "skewY", "deg"), // fast
      clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    // make the right edge "stick" to the scroll bar. force3D: true improves performance
    gsap.set(".cards", { force3D: true });

    // Cleanup function to remove ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

    // curve
  });

  const svgref = useRef();
  var path = "M 10 100 Q 300 100 990 100";
  // var chaingingPath = "M 10 50 Q 300 50 300 50";
  // const [chaingingPath, setChangingPath] = useState("M 10 50 Q 300 50 990 50");
  function mouseIn(e) {
    // console.log(svgref.current.getBoundingClientRect());
    // setChangingPath(`M 10 50 Q 300 ${e.clientY} 300 50`)
    const rect = svgref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    console.log(y);
    gsap.to(".svg svg path", {
      attr: { d: `M 10 100 Q ${x} ${y} 990 100` },
      duration: 0.3,
      ease: "power3.out",
    });
  }
  function mouseOut(e) {
    // console.log(e);
    // setChangingPath(`M 10 50 Q 300 ${e.clientY} 300 50`)

    gsap.to(".svg svg path", {
      attr: { d: path },
      duration: 1.5,
      ease: "elastic.out(1,0.2)",
    });
  }

  return (
    <>
      <div className="div1">
        {/* <button onMouseEnter={changeShape}>hello click me</button> */}
        <button
          className="hellobtn"
          onMouseEnter={() => tl.play()}
          onMouseLeave={() => tl.reverse()}
        >
          <span className="hellotext">Hello</span>
          <span className="hellobye">Bye</span>
        </button>
        <div className="clickbox"></div>
        <p className="text" id="mine">
          asd
        </p>
        {/* <div className="box box1"></div>
      <div className="box box2"></div>
      <div className="box box3"></div> */}
        <p className="try">
          <p className="tyied">Hello</p>
        </p>
        <ul>
          {data.map((d) => {
            return (
              <>
                <li className="list">{d}</li>
              </>
            );
          })}
        </ul>
      </div>
      <div className="div2" ref={div2}>
        <ul>
          {data.map((d) => {
            return (
              <>
                <li className="list1" ref={list}>
                  {d}
                </li>
              </>
            );
          })}
        </ul>

        <div className="div2box" ref={div2box}></div>
      </div>
      <div className="div3">
        <div className="box">box</div>
        <div className="box">box</div>
        <div className="box">box</div>
        <div className="box">box</div>
        <div className="box">box</div>
      </div>
      <div className="div5">
        <div className="itemstoScroll" ref={itemstoScroll}>
          <img
            src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg"
            alt=""
          />
          <img
            src="https://d150u0abw3r906.cloudfront.net/wp-content/uploads/2021/10/image2-2.png"
            alt=""
          />
          <img
            src="https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png"
            alt=""
          />
          <img
            src="https://as2.ftcdn.net/v2/jpg/00/90/88/99/1000_F_90889923_N4xU9nmDeTydUZmqoNsttgqZiUbvtwR7.jpg"
            alt=""
          />
          <img
            src="https://www.dpreview.com/files/p/articles/7961724650/Lesson-4-Yarra-Ranges-Road-Black-Spur-Mountain-Ash.jpeg"
            alt=""
          />
        </div>
      </div>
      <div className="div6">
        <ul className="listcenter">
          {data.map((ele) => {
            return <li>{ele}</li>;
          })}
        </ul>
      </div>
      <div className="div7">
        <div className="cards"></div>
        <div className="cards"></div>
        <div className="cards"></div>
        <div className="cards"></div>
        <div className="cards"></div>
      </div>
      <div className="div8">
        <div className="svg">
          <svg
            onMouseMove={mouseIn}
            onMouseLeave={mouseOut}
            width="1000"
            height="200"
            ref={svgref}
          >
            <path
              d="M 10 100 Q 300 100 990 100"
              stroke="red"
              fill="transparent"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default App1;
