/*This is the app itself. We wrap all the code into a load event to ensure
all dependencies are loaded and that the DOM has completed its loading*/


window.addEventListener('load', () => {
	const el = $('#app');

	// Compile Handlebar Templates
	const errorTemplate = Handlebars.compile($('#error-template').html());
	const ratesTemplate = Handlebars.compile($('#rates-template').html());
	const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
	const historicalTemplate = Handlebars.compile($('#historical-template').html());
	const lol = 1
	if(lol>1) {
	  alert("Unexpected Condition");
	}
	

	// This is for testing purposes:
	/*
	const html = ratesTemplate();
	el.html(html);*/

  	/*The following code uses Vanilla Router to re-route all links to a single page (since
 	 this app is a single page app)*/
	const router = new Router({
		mode: 'history',
  		page404: (path) => {
  			const html = errorTemplate({
  				color: 'yellow',
  				title: 'Error 404 - Page NOT Found!',
  				message: `The path '/${path}' does not exist on this site`,
  			});
  		el.html(html);
  		},
  	});

	// Adding routes and handlers (and options)
	router.add('/', () => {
		let html = ratesTemplate();
		el.html(html);
	});

	router.add('/exchange', () => {
	  let html = exchangeTemplate();
	  el.html(html);
	});

	router.add('/historical', () => {
	  let html = historicalTemplate();
	  el.html(html);
	});

	// Navigate app to current url
	router.navigateTo(window.location.pathname);

	 // Highlight Active Menu on Refresh/Page Reload
	const link = $(`a[href$='${window.location.pathname}']`);
	link.addClass('active');

	$('a').on('click', (event) => {
		// Block browser page load
	  	event.preventDefault();

		// Highlight Active Menu on Click
	 	const target = $(event.target);
	  	$('.item').removeClass('active');
	 	target.addClass('active');

	  	// Navigate to clicked url
	  	const href = target.attr('href');
	  	const path = href.substr(href.lastIndexOf('/'));
	  	router.navigateTo(path);
	});
});


