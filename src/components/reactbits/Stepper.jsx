/* eslint-disable no-unused-vars */
import { useState, Children, useRef, useLayoutEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GREEN_COLOR } from "@/config";

/**
 * Robust Stepper component using framer-motion.
 * Keeps final step visible after completion.
 */
export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  beforeNextStep,
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}) {
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;

  // clamp initial
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const [currentStep, setCurrentStep] = useState(
    clamp(Math.floor(initialStep), 1, totalSteps)
  );
  const [direction, setDirection] = useState(0); // 1 forward, -1 back

  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep) => {
    const clamped = clamp(newStep, 1, totalSteps);
    setCurrentStep(clamped);
    onStepChange(clamped);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (beforeNextStep && !beforeNextStep(currentStep)) return;

    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // ✅ Trigger final step completion but do NOT close or hide
    onFinalStepCompleted(currentStep);
  };

  return (
    <div
      className="flex min-h-full flex-1 flex-col items-center justify-center p-2 sm:p-4 md:p-6"
      {...rest}
    >
      <div
        className={`w-full rounded-2xl shadow-xl bg-white${stepCircleContainerClassName}`}
      >
        {/* Step Indicators */}
        <div
          className={`${stepContainerClassName} flex w-full items-center justify-center p-6 sm:p-8`}
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        <StepContentWrapper
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 w-full px-6 sm:px-10 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {/* Footer */}
        <div className={`w-full px-4 sm:px-10 pb-8 ${footerClassName}`}>
          <div
            className={`mt-8 flex ${
              currentStep !== 1 ? "justify-between" : "justify-end"
            }`}
          >
            {currentStep !== 1 && (
              <button
                onClick={handleBack}
                className={`duration-350 rounded px-2 py-1 transition ${
                  currentStep === 1
                    ? "pointer-events-none opacity-50 text-neutral-400"
                    : "text-neutral-400 hover:text-neutral-700"
                }`}
                {...backButtonProps}
              >
                {backButtonText}
              </button>
            )}
            <button
              onClick={isLastStep ? handleComplete : handleNext}
              className="duration-350 flex items-center justify-center rounded-full bg-green-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-green-600 active:bg-green-700"
              {...nextButtonProps}
            >
              {isLastStep ? "Complete" : nextButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Content wrapper ---------- */
function StepContentWrapper({ currentStep, direction, children, className }) {
  const containerRef = useRef(null);
  const [parentHeight, setParentHeight] = useState("auto");

  useLayoutEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setParentHeight(Math.ceil(rect.height));
    }
  }, [children]);

  return (
    <motion.div
      ref={containerRef}
      animate={{ height: parentHeight }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`${className} overflow-visible`}
      style={{ position: "relative" }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <SlideTransition
          key={`step-${currentStep}`}
          direction={direction}
          onHeightReady={(h) => setParentHeight(h)}
        >
          {children}
        </SlideTransition>
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- SlideTransition ---------- */
function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      onHeightReady(Math.ceil(rect.height));
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.36, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}

const slideVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? -40 : 40,
    opacity: 0,
    scale: 0.995,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir) => ({
    x: dir >= 0 ? 30 : -30,
    opacity: 0,
    scale: 0.995,
  }),
};

/* ---------- Step wrapper ---------- */
export function Step({ children }) {
  return <div className="px-8">{children}</div>;
}

/* ---------- Step indicator ---------- */
function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <motion.div
      className="relative outline-none focus:outline-none"
      initial={false}
      animate={status}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#e6e8eb", color: "#9ca3af" },
          active: { scale: 1, backgroundColor: GREEN_COLOR, color: "#ffffff" },
          complete: {
            scale: 1,
            backgroundColor: GREEN_COLOR,
            color: "#ffffff",
          },
        }}
        transition={{ duration: 0.25 }}
        className="flex h-9 w-9 items-center justify-center rounded-full font-semibold"
        style={{
          boxShadow:
            status === "active" || status === "complete"
              ? "0 6px 20px rgba(16,185,129,0.12)"
              : "none",
        }}
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4 text-white" />
        ) : status === "active" ? (
          <div className="h-3 w-3 rounded-full bg-white" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Connector ---------- */
function StepConnector({ isComplete }) {
  return (
    <div className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded bg-neutral-200">
      <motion.div
        className="absolute left-0 top-0 h-full"
        initial={false}
        animate={{
          width: isComplete ? "100%" : "0%",
          backgroundColor: isComplete ? GREEN_COLOR : "transparent",
        }}
        transition={{ duration: 0.35 }}
      />
    </div>
  );
}

/* ---------- Check icon ---------- */
function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.05,
          type: "tween",
          ease: "easeOut",
          duration: 0.28,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
