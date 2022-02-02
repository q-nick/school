let pageLoaded = 1;

const loadImages = async (pageToLoad) => {
  const { value } = document.querySelector('#search-form input');

  const response = await fetch(
    `https://pixabay.com/api/?key=25529740-12422fdd87c2007d29b276c6c&q=${value}&page=${pageToLoad}`,
  );
  pageLoaded = pageToLoad;
  const data = await response.json();

  const liElements = data.hits.map((hit) => {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = hit.largeImageURL;
    a.target = '_blank';

    const img = document.createElement('img');
    img.src = hit.webformatURL;
    img.dataset.source = hit.largeImageURL;
    img.alt = hit.tags;

    a.append(img);
    li.append(a);
    return li;
  });

  const ul = document.querySelector('#search-form-results');
  if (pageToLoad === 1) {
    ul.replaceChildren(...liElements);
  } else {
    ul.append(...liElements);
  }
};

const onSubmit = (event) => {
  event.preventDefault();
  loadImages(1);
};

const onClickImage = (event) => {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();

    // eslint-disable-next-line no-undef
    const instance = basicLightbox.create(
      `<img src="${event.target.dataset.source}"/>`,
    );

    instance.show();
  }
};

document.querySelector('#search-form').addEventListener('submit', onSubmit);

document
  .querySelector('#search-form-results')
  .addEventListener('click', onClickImage);

new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        loadImages(pageLoaded + 1);
      }
    }
  },
  {
    root: null,
    rootMargin: `${window.innerHeight * 2}px`,
  },
).observe(document.querySelector('#loading'));
