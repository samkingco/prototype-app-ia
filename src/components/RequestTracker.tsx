import React from "react";
import styled, { css, keyframes } from "../design-system/styled";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2px;
  width: 100%;
  height: ${(p) => p.theme.space[2]};
  border-radius: ${(p) => p.theme.misc.borderRadius};
  overflow: hidden;
`;

interface StepProps {
  isActive: boolean;
  isPast: boolean;
  isFuture: boolean;
  isCurrentStepBlocked: boolean;
}

const activeStepAnimation = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 1;
  }

  50% {
    transform: translateX(0);
    opacity: 0.75;
  }

  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const Step = styled.div<StepProps>`
  position: relative;
  overflow: hidden;

  ${(p) => {
    if (p.isActive) {
      const background = p.isCurrentStepBlocked
        ? p.theme.colors.orange20
        : p.theme.colors.green20;
      const pipBackground = p.isCurrentStepBlocked
        ? `${background}
            linear-gradient(  
              to right,                        
              ${background},
              ${p.theme.colors.orange20},
              ${p.theme.colors.orange30}
            )`
        : `${background}
            linear-gradient(
              to right,
              ${background},
              ${p.theme.colors.green20},
              ${p.theme.colors.green40}
            )`;

      return css`
        background: ${background};
        &:after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${pipBackground};
          animation: ${activeStepAnimation} 4s ease-out infinite;
        }
      `;
    }
    if (p.isPast) {
      return css`
        background: ${(p) => p.theme.colors.green40};
      `;
    }
    if (p.isFuture) {
      return css`
        background: ${(p) => p.theme.colors.gray10};
      `;
    }
  }}
`;

interface RequestTrackerProps {
  currentStep: number;
  totalSteps?: number;
  isCurrentStepBlocked?: boolean;
}

export function RequestTracker({
  currentStep = 1,
  totalSteps = 5,
  isCurrentStepBlocked = false,
}: RequestTrackerProps) {
  const steps = Array.from(Array(totalSteps)).map((i, index) => index + 1);

  return (
    <Wrapper>
      {steps.map((step) => (
        <Step
          isPast={step < currentStep}
          isActive={step === currentStep}
          isFuture={step > currentStep}
          isCurrentStepBlocked={isCurrentStepBlocked}
        />
      ))}
    </Wrapper>
  );
}
