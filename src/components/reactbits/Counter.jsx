/* eslint-disable no-unused-vars */
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

function Number({ mv, number, height, place }) {
  // get digit from animated value
  const y = useTransform(mv, (latest) => {
    const digit = Math.floor(latest / place) % 10;
    // smooth rolling offset
    const offset = (10 + number - digit) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return memo;
  });

  return (
    <motion.span
      style={{
        y,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {number}
    </motion.span>
  );
}

function Digit({ place, fullValue, height, digitStyle }) {
  return (
    <div
      style={{
        height,
        position: "relative",
        width: "1ch",
        fontVariantNumeric: "tabular-nums",
        overflow: "hidden",
        ...digitStyle,
      }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Number
          key={i}
          mv={fullValue}
          number={i}
          height={height}
          place={place}
        />
      ))}
    </div>
  );
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places = [100, 10, 1],
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = "white",
  fontWeight = "bold",
}) {
  const height = fontSize + padding;

  // single shared spring for all digits
  const fullValue = useSpring(0, {
    stiffness: 60,
    damping: 12,
    mass: 0.6,
  });

  useEffect(() => {
    fullValue.set(value);
  }, [value, fullValue]);

  return (
    <div
      style={{
        display: "flex",
        gap,
        overflow: "hidden",
        borderRadius,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        lineHeight: 1,
        color: textColor,
        fontWeight,
        fontSize,
      }}
    >
      {places.map((place) => (
        <Digit
          key={place}
          place={place}
          fullValue={fullValue}
          height={height}
        />
      ))}
    </div>
  );
}
