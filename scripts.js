/** Your Javascript must be executed only when the document is loaded  */

$(document).ready(function() {
    /** Carousel QUOTES loader*/
    loadQuotes();
    loadVideos();

});

/** Carousel QUOTES loader*/
function loadQuotes() {
    const carouselInner = $('#carouselExampleControls .carousel-inner .loadItems');
    $('.loader').show();

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
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



/** Carousel QUOTES loader*/
function loadVideos() {
    const carouselInner = $('#carouselExampleControls2 .carousel-inner .loadItems2');
    $('.loader2').show();

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
        success: function(quotes) {
            $('.loader2').hide();
            carouselInner.empty();

            $.each(quotes, function(index, video) {
                const isActive = index === 0 ? ' active' : '';
                const videoCard = $(`
                <div class="carousel-item active">
                <div class="row align-items-center mx-auto">
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
                        <div class="card">
                                        <img src="${video.thumb_url}" class="card-img-top" alt="${video.title}" />
                                        <div class="card-img-overlay text-center">
                                            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title font-weight-bold">${video.title}</h5>
                                            <p class="card-text text-muted">${video["sub-title"]}</p>
                                            <div class="creator d-flex align-items-center">
                                                <img src="${video.author_pic_url}" alt="${video.author}" width="30px" class="rounded-circle" />
                                                <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                                            </div>
                                            <div class="info pt-3 d-flex justify-content-between">
                                                <div class="rating">${stars}</div>
                                                <span class="main-color">${video.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                `);
                const carouselItem = $(`
                        <div class="carousel-item${isActive}">
                            <div class="row align-items-center mx-auto">
                            </div>
                        </div>
                    `);
                    carouselItem.append(videoCard);
                carouselInner.append(carouselItem);
            });

        },
        error: function(error) {
            console.error('Error: ', error);
            $('.loader2').hide();
        }
    });
}
