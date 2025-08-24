import type { HistoricalPlace } from "../types/HistoricalPlace";

export const sampleHistoricalPlaces: HistoricalPlace[] = [
  {
    id: 1,
    name: "Shwedagon Pagoda",
    image: "/images/shwedagon.jpg",
    description: "A gilded stupa located in Yangon, Myanmar. It is the most sacred Buddhist pagoda in Myanmar, as it is believed to contain relics of the four previous Buddhas.",
    location: "Yangon, Myanmar",
    year: 585,
    visited: false
  },
  {
    id: 2,
    name: "Bagan",
    image: "/images/bagan.jpg",
    description: "An ancient city and a UNESCO World Heritage Site located in the Mandalay Region of Myanmar. From the 9th to 13th centuries, the city was the capital of the Pagan Kingdom, the first kingdom to unify the regions that would later constitute modern Myanmar.",
    location: "Mandalay Region, Myanmar",
    year: 1044,
    visited: false
  },
  {
    id: 3,
    name: "Kyaiktiyo Pagoda",
    image: "/images/kyitehteeyoe.jpg",
    description: "A well-known Buddhist pilgrimage site in Mon State, Myanmar. It is a small pagoda built on the top of a granite boulder covered with gold leaves, precariously balanced on the edge of a cliff.",
    location: "Mon State, Myanmar",
    year: 585,
    visited: false
  },
  {
    id: 4,
    name: "Inle Lake",
    image: "/images/innlay.jpeg",
    description: "A freshwater lake located in the Nyaungshwe Township of Shan State, part of Shan Hills in Myanmar. It is the second-largest lake in Myanmar with an estimated surface area of 44.9 square miles.",
    location: "Shan State, Myanmar",
    year: 1100, // Approximate start of lake culture
    visited: false
  },
  {
    id: 5,
    name: "Mahamuni Buddha Temple",
    image: "/images/mahamuni.jpeg",
    description: "A Buddhist temple and major pilgrimage site, located southwest of Mandalay, Myanmar. The Mahamuni Buddha image is the most highly revered Buddha image in Myanmar.",
    location: "Mandalay, Myanmar",
    year: 1785,
    visited: false
  },
  {
    id: 6,
    name: "Sule Pagoda",
    image: "/images/sule_pagoda.jpg",
    description: "A Burmese stupa located in the heart of downtown Yangon, occupying the centre of a roundabout. According to legend, it was built before the Shwedagon Pagoda during the time of the Buddha.",
    location: "Yangon, Myanmar",
    year: -300, // Legendary construction
    visited: false
  },
  {
    id: 7,
    name: "Mrauk U",
    image: "/images/mrauk_u.jpg",
    description: "An archaeological town in northern Rakhine State, Myanmar. It was the capital of the Mrauk-U Kingdom from 1430 until 1785, and its temples and pagodas are known for their unique stone construction.",
    location: "Rakhine State, Myanmar",
    year: 1430,
    visited: false
  },
  {
    id: 8,
    name: "Ngapali Beach",
    image: "/images/ngapali.jpg",
    description: "Myanmar's premier beach resort, known for its pristine white sands and clear waters. While primarily a tourist destination, the local Thandwe area has historical significance.",
    location: "Rakhine State, Myanmar",
    year: 1900, // Focus on modern historical significance as a resort
    visited: false
  },
  {
    id: 9,
    name: "Golden Rock (Kyaiktiyo)",
    image: "/images/kyaiktiyo.avif",
    description: "A well-known Buddhist pilgrimage site in Mon State, Myanmar. It is a small pagoda built on the top of a granite boulder covered with gold leaves, precariously balanced on the edge of a cliff.",
    location: "Mon State, Myanmar",
    year: 585,
    visited: false
  },
  {
    id: 10,
    name: "U Bein Bridge",
    image: "/images/u_bein_bridge.jpeg",
    description: "A 1.2-kilometre (0.75 mi) bridge built around 1850, is believed to be the oldest and longest teakwood bridge in the world.",
    location: "Mandalay, Myanmar",
    year: 1850,
    visited: false
  },
  {
    id: 11,
    name: "Hsinbyume Pagoda",
    image: "/images/hsinbyume.jpg",
    description: "A large, white pagoda built in 1816 by Prince Bagyidaw in memory of his first consort, Princess Hsinbyume (Lady of the White Elephant).",
    location: "Mingun, Myanmar",
    year: 1816,
    visited: false
  },
  {
    id: 12,
    name: "Shwesandaw Pagoda (Bagan)",
    image: "/images/shwesandaw.jpg",
    description: "One of the tallest pagodas in Bagan, offering panoramic views of the ancient city's temples and the Ayeyarwady River.",
    location: "Bagan, Myanmar",
    year: 1057,
    visited: false
  }

];

export const fetchHistoricalPlaces = (): Promise<HistoricalPlace[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(sampleHistoricalPlaces); // Always resolve with data
    }, 1000);
  });
};
