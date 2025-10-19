/* eslint-disable no-unused-vars */
import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-4 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] bg-white box-border origin-center will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 10,
  stackPosition = "50%", // stack in middle
  scaleEndPosition = "60%", // end slightly below middle
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPosPx = parsePercentage(stackPosition, containerHeight);
    const totalCards = cardsRef.current.length;

    // Iterate each card — bottom card moves first, top card moves last
    cardsRef.current.forEach((card, i) => {
      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - containerHeight * 0.8; // when it enters
      const triggerEnd = cardTop - stackPosPx; // when it reaches middle

      const progress = calculateProgress(scrollTop, triggerStart, triggerEnd);

      // As scroll goes on, translateY goes from normal → stacked position
      const baseY = i * itemStackDistance; // initial separation
      const stackedY = -(i * itemStackDistance * 0.5); // stack convergence

      const translateY = baseY - progress * (baseY + stackedY);
      const scale = 1 - progress * (1 - (baseScale + i * itemScale));
      const opacity = Math.min(1, progress + 0.3);

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = i + 1;
    });

    // After all stacked, shift the whole stack up smoothly
    const lastCard = cardsRef.current[totalCards - 1];
    const lastCardTop = getElementOffset(lastCard);
    const exitStart = lastCardTop - stackPosPx + containerHeight * 0.2;
    const exitEnd = exitStart + containerHeight * 0.6; // shorter distance

    const exitProgress = calculateProgress(scrollTop, exitStart, exitEnd);
    if (exitProgress > 0) {
      const offset = exitProgress * containerHeight * 0.8; // smaller lift
      cardsRef.current.forEach((card) => {
        card.style.transform += ` translateY(-${offset}px)`;
      });
    }

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    baseScale,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    cardsRef.current = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scroller.querySelectorAll(".scroll-stack-card")
    );

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    lenis.on("scroll", handleScroll);
    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    updateCardTransforms();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
    };
  }, [useWindowScroll, handleScroll, updateCardTransforms]);

  return (
    <div
      className={`relative w-full ${
        useWindowScroll ? "" : "h-full overflow-y-auto"
      } ${className}`}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner px-20">
        {children}
        <div className="scroll-stack-end w-full h-[10vh]" />{" "}
        {/* small spacer */}
      </div>
    </div>
  );
};

export default ScrollStack;
