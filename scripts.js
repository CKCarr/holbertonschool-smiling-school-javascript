/** Your Javascript must be executed only when the document is loaded  */

$(document).ready(function() {
    /** Carousel QUOTES loader*/
    loadQuotes();
    /** Carousel Video Loader */
    loadVideos();

});

/** Carousel QUOTES loader*/
function loadQuotes() {
    const carouselInner = $('#carouselExampleControls .carousel-inner .loadItems');
    $('.loader').show();

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
        dataType: 'json',
        success: function(quotes) {
            $('.loader').hide();
            carouselInner.empty();

            $.each(quotes, function(index, quote) {
                const isActive = index === 0 ? ' active' : '';
                const carouselItem = $(`
                    <div class="carousel-item${isActive}">
                        <div class="row mx-auto align-items-center">
                            <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                                <img src="${quote.pic_url}" class="d-block align-self-center" alt="${quote.name}">
                            </div>
                            <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                                <div class="quote-text">
                                    <p class="text-white">« ${quote.text}</p>
                                    <h4 class="text-white font-weight-bold">${quote.name}</h4>
                                    <span class="text-white">${quote.title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                carouselInner.append(carouselItem);
            });

        },
        error: function(error) {
            console.error('Error: ', error);
            $('.loader').hide();
        }
    });
}



/** Carousel VIDEO Loader */
/*
function loadVideos() {
    // Display the loader while data is being fetched
    $('.loader2').show();

    // Make an AJAX request to fetch the JSON data
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/popular-tutorials',
        method: 'GET',
        dataType: 'json',
        success: function (videoItem) {
        // Hide the loader when data is loaded
        $('.loader2').hide();

        // Check if data is available and not empty
        if (videoItem && videoItem.length > 0) {
            // Get the carousel inner element
            let carouselInner = $('#carouselExampleControls2 .carousel-inner .loadItems2');
            // clear the carousel inner element
            carouselInner.empty();

            // Create the row element for cards
            let cardRow = $('<div>').addClass('row align-items-center mx-auto');

            // Loop through the data items
            $.each(videoItem, function (index, videoData) {
                // Create a card element
                let cardCol = $('<div>').addClass('col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center');

                let card = `
                    <div class="card">
                    <img src="${videoData.thumb_url}" class="card-img-top" alt="Video thumbnail" />
                    <div class="card-img-overlay text-center">
                        <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">${videoData.title}</h5>
                        <p class="card-text text-muted">${videoData['sub-title']}</p>
                        <div class="creator d-flex align-items-center">
                        <img src="${videoData.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                        <h6 class="pl-3 m-0 main-color">${videoData.author}</h6>
                        </div>
                        <div class="info pt-3 d-flex justify-content-between">
                        <div class="rating">
                            <!-- Add star rating here -->
                        </div>
                        <span class="main-color">${videoData.duration}</span>
                        </div>
                    </div>
                    </div>
                `;
                // Append the card to the column
                cardCol.html(card);

                // Append the card column element to the row
                cardRow.append(cardCol);

                // add the row to the carousel inner after every 4 cards
                if ((index + 1 ) % 4 === 0) {
                    let carouselItem = $('<div>').addClass('carousel-item');
                    carouselItem.append(cardRow);
                    carouselInner.append(carouselItem);

                    // Reset the row element
                    cardRow = $('<div>').addClass('row align-items-center mx-auto');
                }
            });
            // check if there are any remaining cards in the row and append them to the last carousel item
            if (cardRow.children().length > 0) {
                let carouselItem = $('<div>').addClass('carousel-item');
                carouselItem.append(cardRow);
                carouselInner.append(carouselItem);
            }
            // Activate the first carousel item
            $('#carouselExampleControls2 .carousel-inner .carousel-item:first').addClass('active');

            // Activate the carousel
            $('#carouselExampleControls2').carousel();
        }
    },
    error: function (error) {
        console.log('Error fetching data:', error);
        },
    });
}
*/

/* function to load video carousel
with cards 4 columns in the row at a time
looping trough 7 items from a json get request
shows a loading spinner while fetching data
*/

function loadVideos() {
    // Display the loader while data is being fetched
    $('.loader2').show();

    // Make an AJAX request to fetch the JSON data
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/popular-tutorials',
        method: 'GET',
        dataType: 'json',
        success: function (videoData) {
            // Hide the loader when data is loaded
            $('.loader2').hide();

            // Check if data is available and not empty
            if (videoData && videoData.length > 0) {
                // Get the carousel inner element
                let carouselInner = $('#carouselExampleControls2 .carousel-inner .loadItems2');
                carouselInner.empty(); // Clear existing content

                // Calculate the number of slides required based on 4 cards per slide
                let numSlides = Math.ceil(videoData.length / 4);

                // Loop through each slide
                for (let slideIndex = 0; slideIndex < numSlides; slideIndex++) {
                    // Create a new carousel item
                    let carouselItem = $('<div>')
                        .addClass('carousel-item')
                        .appendTo(carouselInner);

                    // Create the row element for cards
                    let cardRow = $('<div>').addClass('row align-items-center mx-auto');

                    // Loop through the data items for the current slide
                    for (let cardIndex = 0; cardIndex < 4; cardIndex++) {
                        let dataIndex = slideIndex * 4 + cardIndex;
                        if (dataIndex < videoData.length) {
                            let video = videoData[dataIndex];

                            // Create a card element
                            let cardCol = $('<div>').addClass('col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center');

                            // create star rating element
                            let stars = '';
                            for (let i = 0; i < 5; i++) {
                                if (i < video.star) {
                                    stars += '<img src="images/star_on.png" alt="Star On" width="15px" />';
                                } else {
                                    stars += '<img src="images/star_off.png" alt="Star Off" width="15px" />';
                                }
                            }

                            // create card html
                            let cardHtml = `
                                <div class="card">
                                    <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail" />
                                    <div class="card-img-overlay text-center">
                                        <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title font-weight-bold">${video.title}</h5>
                                        <p class="card-text text-muted">${video['sub-title']}</p>
                                        <div class="creator d-flex align-items-center">
                                            <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                                            <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                                        </div>
                                        <div class="info pt-3 d-flex justify-content-between">
                                            <div class="rating">${video.star > 0 ? stars : ''}
                                            </div>
                                            <span class="main-color">${video.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                            cardCol.html(cardHtml);

                            // if row is more than 4 cards, add it to the carousel item
                            if (cardRow.children().length > 4) {
                                carouselItem.append(cardRow);
                            }

                            // Append the card column element to the row
                            cardRow.append(cardCol);

                            }
                    }

                    // Append the row to the carousel item
                    carouselItem.append(cardRow);

                    // Add the 'active' class to the first item
                    if (slideIndex === 0) {
                        carouselItem.addClass('active');
                    }
                }

                // Initialize the carousel
                $('#carouselExampleControls2').carousel();
            }
        },
        error: function (error) {
            console.log('Error fetching data:', error);
        },
    });
}
