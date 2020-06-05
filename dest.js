// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.continent',
   layoutMode: 'fitRows'
})
// filter functions
var filterFns = {

};

// bind filter on select change
$('.filters-select').on( 'change', function() {
  // get filter value from option value
  var filterValue = this.value;
 
  $grid.isotope({ filter: filterValue });
});
