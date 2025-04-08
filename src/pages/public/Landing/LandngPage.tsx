import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../../components/common/icon/icon.component";
import { generateUserImages } from "../../../utils/GenerateUserImages";
import LanguageSwitcher from "../../../utils/LanguageSwitcher";
import sections from "./Setions";
import DynamicTimeline from "./TimeLineStage";
import { loginUser } from "../../../services/mock-services/LoginService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const LandingPage = () => {
  gsap.registerPlugin(ScrollTrigger);
  const { t } = useTranslation();
  const usersSponsor = generateUserImages(0);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const sectionsArray = sections();

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const mockupWindowRef = useRef<HTMLDivElement>(null);
  const rotateAnimation = useRef<gsap.core.Animation | null>(null);
  const lastScrollTop = useRef(0);

  // State
  const [scrollYProgress, setScrollYProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isSection5End, setIsSection5End] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const scaleValue = useCallback((value: number, from: number[], to: number[]) => {
    const scale = (to[1] - to[0]) / (from[1] - from[0]);
    const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return capped * scale + to[0];
  }, []);

  const handleLiveDemo = useCallback(() => {
    loginUser();
    setIsAuthenticated(true);
    navigate("/me");
  }, [navigate, setIsAuthenticated]);

  // Scroll handler with debounce
  useLayoutEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (!heroRef.current) return;

        const scrollTop = window.scrollY;
        const newIsScrollingUp = scrollTop < lastScrollTop.current;

        if (newIsScrollingUp !== isScrollingUp) {
          setIsScrollingUp(newIsScrollingUp);
        }

        lastScrollTop.current = scrollTop;

        const { offsetTop, clientHeight } = heroRef.current;
        const progress = (scrollTop - offsetTop) / clientHeight;
        setScrollYProgress(Math.max(0, Math.min(100, progress * 100)));
      }, 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isScrollingUp]);

  // Animation setup
  useLayoutEffect(() => {
    const mockupWindow = mockupWindowRef.current;
    if (!mockupWindow) return;

    // Cleanup previous animations
    if (rotateAnimation.current) {
      rotateAnimation.current.kill();
    }

    // Initial state
    gsap.set(mockupWindow, {
      rotateX: 20,
      rotateZ: -20,
      skewY: 8,
      transformPerspective: 1000,
      immediateRender: true
    });

    const createRotationAnimation = (target: HTMLElement) => gsap.to(target, {
      rotateX: 0,
      rotateZ: 0,
      skewY: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    const createReverseRotationAnimation = (target: HTMLElement) => gsap.to(target, {
      rotateX: 20,
      rotateZ: -20,
      skewY: 8,
      duration: 0.5,
      ease: "power2.in"
    });

    // Initial rotation animation
    rotateAnimation.current = gsap.to(mockupWindow, {
      rotateX: 0,
      rotateZ: 0,
      skewY: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".section-0",
        start: "top top",
        end: "bottom center",
        scrub: 0.5,
        toggleActions: "play reverse play reverse",
        onEnter: () => createRotationAnimation(mockupWindow),
        onLeaveBack: () => createReverseRotationAnimation(mockupWindow)
      }
    });

    // Section triggers
    const sectionTriggers = sectionsArray.map((_, index) =>
      ScrollTrigger.create({
        trigger: `.section-${index}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveSectionIndex(index);
          if (index === 1) {
            createRotationAnimation(mockupWindow);
          } else if (index === 4) {
            rotateAnimation.current?.scrollTrigger?.kill();
            gsap.set(mockupWindow, { clearProps: "all" });
          }
        },
        onEnterBack: () => {
          setActiveSectionIndex(index);
          if (index === 0) {
            createReverseRotationAnimation(mockupWindow);
          } else if (index === 3) {
            rotateAnimation.current?.scrollTrigger?.enable();
          }
        }
      })
    );

    // Final section trigger
    const section5Trigger = ScrollTrigger.create({
      trigger: ".section-4",
      start: "top 25%",
      end: "bottom bottom",
      onUpdate: ({ progress }) => {
        if (progress > 0.75 && !isSection5End) {
          setIsSection5End(true);
          setActiveSectionIndex(4);
        } else if (progress <= 0.75 && isSection5End) {
          setIsSection5End(false);
        }
      }
    });

    // Sponsors section trigger
    const sponsorsTrigger = ScrollTrigger.create({
      trigger: ".sponsors-section",
      start: "top 75%",
      end: "top top",
      onEnter: () => {
        setIsSection5End(true);
        setActiveSectionIndex(4);
        gsap.set(mockupWindow, { clearProps: "all" });
      },
      onLeaveBack: () => {
        setIsSection5End(false);
        setActiveSectionIndex(4);
      }
    });

    // Cleanup
    return () => {
      rotateAnimation.current?.kill();
      [...sectionTriggers, section5Trigger, sponsorsTrigger].forEach(trigger => trigger.kill());
    };
  }, [isScrollingUp, sectionsArray.length, isSection5End]);

  // Height adjustment
  useEffect(() => {
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        minHeight: isSection5End ? "100vh" : "500vh",
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  }, [isSection5End]);

  const getRightColumnStyle = useCallback(() => {
    const baseStyle = {
      transition: 'all 0.3s ease-out',
      willChange: 'transform, opacity'
    };

    if (isSection5End) {
      return {
        ...baseStyle,
        transform: 'none',
        opacity: isScrollingUp ? 1 : scaleValue(scrollYProgress, [75, 85], [1, 0]),
        pointerEvents: scrollYProgress > 85 ? 'none' as const : 'auto' as const,
        position: 'relative' as const
      };
    }

    return {
      ...baseStyle,
      transform: `translateY(${scaleValue(scrollYProgress, [17, 35], [120, 0])}%)`,
      opacity: 1,
      pointerEvents: 'auto' as const,
      position: 'fixed' as const
    };
  }, [isSection5End, isScrollingUp, scrollYProgress, scaleValue]);

  return (
    <div className="w-full">
      <div className="flex w-full h-fit justify-center items-center py-4 fixed bg-base-100 z-50">
        <div className="flex justify-between items-center max-w-8/10 w-full">
          <div className="flex items-center gap-2">
            <Icon name={"logo"} className="text-primary text-5xl" />
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold">Time Master</h1>
              <span className="text-gray-500 font-light">
                {t("projectManagement")}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <LanguageSwitcher />

            <button
              className="btn btn-soft btn-warning rounded-lg"
              onClick={handleLiveDemo}
            >
              <span className="status status-error size-2 animate-ping"></span>
              {t("bookDemo")}
            </button>
            <button className="btn btn-soft rounded-lg">{t("signIn")}</button>
          </div>
        </div>
      </div>

      <div
        ref={heroRef}
        className="flex min-h-[500vh] max-w-8/10 mx-auto flex-col items-center justify-start xl:flex-row xl:items-start xl:justify-between overflow-auto"
      >
        {/* Left Column */}
        <div ref={leftColumnRef} className="shrink xl:w-1/2">
          {sectionsArray.map((section, index) => (
            <div
              key={section.id}
              className={`section-${index} flex min-h-[calc(100vh-4rem)] items-center justify-center px-2 py-10 text-center xl:justify-start xl:pe-0 xl:ps-10 xl:text-start`}
            >
              {section.leftContent}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div
          ref={rightColumnRef}
          className={`${isSection5End ? "relative" : "fixed"
            } bottom-4 right-4 flex xl:w-1/2 shrink will-change-transform xl:visible xl:-end-32 xl:bottom-auto xl:top-16 xl:!transform-none xl:bg-transparent xl:pb-16 xl:pt-16`}
          style={getRightColumnStyle()}
        >
          <div
            ref={mockupWindowRef}
            className="mockup mockup-window rotate-x-3 bg-base-200/90 xl:bg-base-200 origin-top overflow-visible pb-4 backdrop-blur will-change-auto [--rtl-reverse:1] rtl:[--rtl-reverse:-1] max-[1279px]:![transform:translate3d(0,0,0)] xl:-end-20 xl:-me-10 xl:h-[32rem] xl:w-[50rem] xl:rounded-e-none xl:pe-4 xl:shadow-[-0.05rem_0.1rem_0rem_#00000014] xl:backdrop-blur-0"
          >
            <div className="overflow-y-auto" style={{ maxHeight: "30rem" }}>
              <div className="p-6">
                {sectionsArray[activeSectionIndex].rightContent}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsors */}
      <div className="sponsors-section flex flex-col min-h-[200px] gap-6 items-center w-full max-w-8/10 mx-auto mb-16 p-6">
        <img src="heart-on-fire.webp" alt="" />
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none">
          Sponsors and backers <br />
        </h2>

        <div className="my-14">
          <DynamicTimeline />
        </div>

        {/* Conditional rendering for sponsors */}
        {usersSponsor.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {usersSponsor.map((user) => (
              <div key={user.id} className="avatar">
                <div className="mask mask-squircle w-12">
                  <img src={user.src} alt={user.alt} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 rounded-lg  w-full max-w-md">
            <Icon name="happyemoji" className="text-3xl" />
            <p className="text-lg font-medium text-gray-400">
              Unfortunately, no one has supported me on this journey yet. 💔
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Be the first to support and help this project grow!
            </p>
          </div>
        )}

        <button className="btn btn-primary rounded-lg mt-6">
          <Icon name="heart" className="text-primary me-2" /> Become a Sponsor
        </button>
      </div>

      {/* Processing Project */}
      <div className="flex flex-col min-h-[50px] gap-6 items-center w-full max-w-8/10 mx-auto mb-16 p-6"></div>
    </div>
  );
};

export default LandingPage;
