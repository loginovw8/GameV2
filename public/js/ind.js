let maxWidth = 500;
  let itemsCount = 1;

  console.log(document.documentElement.clientWidth)
  addEventListener('resize', () => {
    if (document.documentElement.clientWidth < 760) {
      document.querySelector(".slider").style.width = "200px"
    }
  })

  const sliders = document.querySelectorAll('[class*="slider__item"]')
  // console.log(sliders)
  sliders.forEach(slider => {
    let currentIndex = 0;
    let currentMargin = 0;
    const sliderWrapper = slider.querySelector(".slider__wrapper")
    const items = sliderWrapper.querySelectorAll('[class*="slider__wrapper"]')

    items.forEach(items => {
      items.style.width = maxWidth / itemsCount + 'px';
    })
    sliderWrapper.style.width = maxWidth / itemsCount + items.length + 'px';

    console.log(items)

    const LeftBtn = document.querySelector(".slider__control--l")
    const RightBtn = document.querySelector(".slider__control--r")
  console.log(LeftBtn)
    RightBtn.addEventListener('click', () => {
      if (currentIndex < 5) {
        console.log("Yes")
        currentIndex++;
        currentMargin = currentMargin - 500;
        sliderWrapper.style.marginLeft = currentMargin + 'px';
      }

    })
    LeftBtn.addEventListener('click', () => {
      console.log("Yes")
      if (currentIndex > 0) {
        currentIndex--;
        currentMargin = currentMargin + 500;
        sliderWrapper.style.marginLeft = currentMargin + 'px';
      }
    })
  })