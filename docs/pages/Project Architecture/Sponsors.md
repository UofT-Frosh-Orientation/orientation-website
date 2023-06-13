---
layout: default
title: Sponsors
parent: Frontend
nav_order: 1
---

# Sponsors

All our F!rosh sponsors are located in `./client/src/util/sponsors.jsx/`. As seen below, each sponsor listed has 5 fields: website, image, scale, rank, and label.

```jsx
export const sponsors = [
  {
    website: 'https://alumni.engineering.utoronto.ca/engineering-alumni-network/',
    image: EngineeringAlumniNetwork, // the sponsor image displayed on homepage (from "./client/src/assets/sponsors")
    scale: 0.82, // can be used to display each image at a different size
    rank: 'diamond', // rank of sponsor, can be used to display border
    label: 'Diamond sponsor: Engineering Alumni Network', // the label seen when a user hovers on image in 'View All' state
  },
]
```

- Website

The 'website' field includes a link to the sponsor's website. This is the link that a user is sent to when they press on a sponsor's image, as seen in `./client/src/components/ImageCarousel/ImageCarousel.jsx` for carousel view, and `./client/src/pages/Home/Home.jsx` for complete view.

- Image

The 'image' field decides which image to display on the homepage. This is also used in `./client/src/components/ImageCarousel/ImageCarousel.jsx` for carousel view, and `./client/src/pages/Home/Home.jsx` for complete view. The images can be seen or changed in `./client/src/assets/sponsors/`.

- Scale

The 'scale' field can be used to control the sponsor's image sizing. This can be edited in `./client/src/components/ImageCarousel/ImageCarousel.jsx`.

- Rank

The 'rank' field allows us to display coloured borders on our homepage, which can be seen or changed in `./client/src/components/ImageCarousel/ImageCarousel.jsx`. The mesh gradients in `backgroundImage` can be found in `./client/src/util/sponsors.jsx/`, where we list our theme colours.

```jsx
<div
    className="carousel-slide-border"
    style={{
    backgroundImage:
        currentLabel === index ? `var(--sponsor-border-${item.rank})` : 'none',
    }}
>
    <img className="carousel-slide" src={item.image} alt={item.name} />
</div>
```

- Label

The 'label' field is used to display a short description to users when they hover on an image in the 'View All' state. This can be seen or changed in `./client/src/components/Home/Home.jsx` and `./client/src/components/Home/Home.scss`.

```SCSS
p {
    opacity: 0;
    transition: opacity 500ms, transform 500ms;
    background-color: var(--sponsor-container);
    padding: 10px 20px;
    display: inline-block;
    border-radius: 8px;
}

&:hover p {
    transform: translateY(calc(-100% + -10px));
    opacity: 1;
}
```
