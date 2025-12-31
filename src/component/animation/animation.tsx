'use client';
import { useEffect, useState } from "react";
import styles from "@/component/animation/animation.module.css";
import { Typography } from "@mui/material";

function AnimationHello() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true); // trigger animation after 1s
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.container} ${animate ? styles.animate : ""}`}>
      <h1 className={styles.title}>Hello User</h1>
    </div>
    // <Typography>Hello User</Typography>
  );
}

export default AnimationHello;
