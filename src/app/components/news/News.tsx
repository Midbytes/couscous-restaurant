"use client";
import React, { useState } from "react";
import styles from "./news.module.scss";
import Glider from "react-glider";
import Image from "next/image";
import { GetNewsQuery } from "./getNews.rq.generated";

function News({ data }: { data: GetNewsQuery }) {
  const [arrowPrevious, setArrowPrevious] = useState<HTMLButtonElement | null>(
    null
  );
  const [arrowNext, setArrowNext] = useState<HTMLButtonElement | null>(null);
  const multiNews = data?.newsPosts && data?.newsPosts?.data.length > 1;

  return (
    // Only render when there are news
    data?.newsPosts &&
    data?.newsPosts?.data.length > 0 && (
      <article className={styles.container}>
        {/* Only show carousel when there are multiple news */}
        {multiNews && (
          //TODO: add ARIA accessibility
          <button
            className={`${styles.arrowPrevious} ${styles.carouselArrow}`}
            ref={(ref) => setArrowPrevious(ref)}
            type="button"
          >
            <Image
              src="/assets/arrow_right_white_24dp.svg"
              alt=""
              width={64}
              height={64}
            />
          </button>
        )}
        {multiNews && (
          <button
            className={`${styles.arrowNext} ${styles.carouselArrow}`}
            ref={(ref) => setArrowNext(ref)}
            type="button"
          >
            <Image
              src="/assets/arrow_right_white_24dp.svg"
              alt=""
              width={64}
              height={64}
            />
          </button>
        )}
        <Glider
          draggable={data?.newsPosts ? data.newsPosts.data.length > 1 : false}
          hasDots={data?.newsPosts ? data.newsPosts.data.length > 1 : false}
          hasArrows={data?.newsPosts ? data.newsPosts.data.length > 1 : false}
          rewind={data?.newsPosts ? data.newsPosts.data.length > 1 : false}
          scrollLock
          slidesToShow={1}
          slidesToScroll={1}
          scrollLockDelay={0}
          arrows={{
            prev: arrowPrevious,
            next: arrowNext,
          }}
        >
          {data &&
            data.newsPosts?.data.map((post, id) => (
              <div
                key={id}
                className={styles.carousel}
                style={{
                  backgroundImage: `url(${post.attributes?.backgroundBanner.data?.attributes?.url})`,
                }}
              >
                <div className={styles.newsText}>
                  <h3>{post.attributes?.Title}</h3>
                  <p>{post.attributes?.Description}</p>
                </div>
              </div>
            ))}
        </Glider>
      </article>
    )
  );
}

export default News;
