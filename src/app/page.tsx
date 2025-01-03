"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

type Phase = "inhale" | "hold" | "exhale";

interface PhaseConfig {
  duration: number;
  nextPhase: Phase;
}

const phaseConfigs: Record<Phase, PhaseConfig> = {
  inhale: { duration: 4, nextPhase: "hold" },
  hold: { duration: 7, nextPhase: "exhale" },
  exhale: { duration: 8, nextPhase: "inhale" },
};

const BreathingExercise: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("inhale");
  const [counter, setCounter] = useState(phaseConfigs.inhale.duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      setPhase("inhale");
      setCounter(phaseConfigs.inhale.duration);
    }
  }, [isActive]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            const nextPhase = phaseConfigs[phase].nextPhase;
            setPhase(nextPhase);
            return phaseConfigs[nextPhase].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase]);

  const getAnimationClass = (): string => {
    if (!isActive) return "";
    switch (phase) {
      case "inhale":
        return styles.inhaleAnimation;
      case "hold":
        return styles.holdAnimation;
      case "exhale":
        return styles.exhaleAnimation;
      default:
        return "";
    }
  };

  return (
    <div onClick={() => setIsActive((prev) => !prev)}>
      {isActive ? (
        <div className={styles.container}>
          <div className={styles.counter}>
            <div className={styles.number}>{counter}</div>
            <div className={styles.phaseText}>{phase}</div>
          </div>
          <div className={`${styles.circle} ${getAnimationClass()}`} />
        </div>
      ) : (
        <div className={styles.intro}>
          <h1 className={styles.title}>478 </h1>
          <p className={styles.description}>
            a breathing exercise to reduce anxiety <br /> <br />- inhale through
            your nose for <b>4s</b> <br />- hold your breath for <b>7s</b>{" "}
            <br />- exhale through your mouth for <b>8s</b>
          </p>
          <br /> <br />
          <p className={styles.instruction}>tap to begin</p>
        </div>
      )}
    </div>
  );
};

export default BreathingExercise;
