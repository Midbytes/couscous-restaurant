import React from "react";
import Image from "next/image";
import styles from "./gallery.module.scss";

export const Gallery = () => (
  <section className={styles.gallery}>
    <div className={styles.doubled}>
      <div className={styles.imageContainer}>
        <Image
          src="https://res.cloudinary.com/dhbzxhoyp/image/upload/v1699739776/malaoui_bread_94f1a11e7f.jpg"
          alt="Maloui bread"
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="https://res.cloudinary.com/dhbzxhoyp/image/upload/v1699739775/fatma_finger_4bed776558.avif"
          alt="Maloui bread"
          fill
          className={styles.image}
        />
      </div>
    </div>
    <div className={`${styles.doubled} ${styles.right}`}>
      <div className={`${styles.imageContainer} ${styles.left}`}>
        <Image
          src="https://res.cloudinary.com/dhbzxhoyp/image/upload/v1699739776/soup_6d9d3ff2dc.jpg"
          alt="Maloui bread"
          fill
          className={styles.image}
        />
      </div>
    </div>
    <div className={`${styles.imageContainer} ${styles.right}`}>
      <Image
        src="https://res.cloudinary.com/dhbzxhoyp/image/upload/v1699739776/tunisian_plate_3ac8da1d0d.jpg"
        alt="Maloui bread"
        fill
        className={styles.image}
      />
    </div>
    <div className={styles.doubled}>
      <div className={styles.imageContainer}>
        <Image
          src="https://res.cloudinary.com/dhbzxhoyp/image/upload/v1699739776/Ojja_b84c1866f6.jpg"
          alt="Maloui bread"
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="https://res.cloudinary.com/dhbzxhoyp/image/upload/v1699739317/f96e6104_7252_11ee_92e3_269635333e91_cous_cous_royal_34fcb74b4c.jpg"
          alt="Maloui bread"
          fill
          className={styles.image}
        />
      </div>
    </div>
  </section>
);
