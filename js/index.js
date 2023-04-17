const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");
const mexicoBtn = document.querySelector('#mexico-btn');

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

mexicoBtn.addEventListener('click', () => {
  // Redirect the user to the linked website when the button is clicked
  window.location.href = 'https://amzn.to/3yu54mY';
});

const productContainer = document.getElementById('products');

const timestamp = new Date().toISOString();

const PRODUCT_ENDPOINT = "your_product_endpoint";
const PRODUCT_PARAMS = {}; // Add your product parameters

const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;

const hash = CryptoJS.HmacSHA256(`${timestamp}\n${PRODUCT_ENDPOINT}\n${JSON.stringify(PRODUCT_PARAMS)}`, SECRET_ACCESS_KEY);
const hashHex = hash.toString(CryptoJS.enc.Hex);

fetch(`${PRODUCT_ENDPOINT}?${new URLSearchParams(PRODUCT_PARAMS)}`, {
	headers: {
		'Content-Type': 'application/json',
		'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
		'X-Amz-Date': timestamp,
		'Authorization': `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY_ID}/${timestamp.substring(0, 8)}/us-east-1/ProductAdvertisingAPI/aws4_request, SignedHeaders=content-type;host;x-amz-date;x-amz-target, Signature=${hashHex}`
	}
})
.then(response => response.json())
.then(data => {
	const items = data.Items;
	items.forEach(item => {
		const productBox = document.createElement('div');
		productBox.classList.add('product-box');

		const productImageWrapper = document.createElement('div');
		productImageWrapper.classList.add('product-image');
		const productImage = document.createElement('img');
		productImage.src = item.Images.Primary.Small.URL;
		productImage.alt = item.ItemInfo.Title.DisplayValue;
		productImageWrapper.appendChild(productImage);
		productBox.appendChild(productImageWrapper);

		const productDetails = document.createElement('div');
		productDetails.classList.add('product-details');

		const productTitle = document.createElement('h3');
		productTitle.classList.add('product-title');
		productTitle.innerText = item.ItemInfo.Title.DisplayValue;
		productDetails.appendChild(productTitle);

		const productPrice = document.createElement('p');
		productPrice.classList.add('product-price');
		productPrice.innerText = `Price: ${item.Offers.Listings[0].Price.DisplayAmount}`;
		productDetails.appendChild(productPrice);

		const productRating = document.createElement('p');
		productRating.classList.add('product-rating');
		productRating.innerText = `Rating: ${item.CustomerReviews.AverageRating}`;
		productDetails.appendChild(productRating);

		productBox.appendChild(productDetails);
		productContainer.appendChild(productBox);
	});
})
.catch(error => {
	console.error(error);
});


function resizeAmazonBanners() {
	const banners = document.querySelectorAll('.amazon-banner');
  
	banners.forEach((banner) => {
	  const width = banner.getAttribute('width');
	  const height = banner.getAttribute('height');
	  const aspectRatio = height / width;
  
	  const containerWidth = banner.parentElement.clientWidth;
	  banner.style.width = containerWidth + 'px';
	  banner.style.height = containerWidth * aspectRatio + 'px';
	});
  }
  
  // Call the resizeAmazonBanners function on window load and resize events
  window.addEventListener('load', resizeAmazonBanners);
  window.addEventListener('resize', resizeAmazonBanners);
  

  // console log the data //
  fetch(`${PRODUCT_ENDPOINT}?${new URLSearchParams(PRODUCT_PARAMS)}`, {
    // ...
})
.then(response => {
    console.log('API response:', response); // Log the raw response
    return response.json();
})
.then(data => {
    console.log('Parsed JSON data:', data); // Log the parsed JSON data
    // ...
})
.catch(error => {
    console.error(error);
});
