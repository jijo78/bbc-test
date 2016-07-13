(function () {
  /**
   * This is the ProgrammeFinder constructor
   * @constructor
   * @this {ProgrammeFinder}
   */

   'use strict';

    function ProgrammeFinder() {
      var _this = this;

      //global elements.
      this.searchForm = document.querySelector( '.search' );
      this.searchValue = document.querySelector('.search__input');
      this.queryResults = document.querySelector( '.output' );
      this.error = document.querySelector('.search__error-msg');
      this.errorMsg = 'Sorry, no results found.';

      //call the addEvent method
      this.addEvent( this.searchForm, 'submit', this.getQuery.bind(_this) );
      this.addEvent( this.searchForm, 'keyup', this.getQuery.bind(_this) );

    }

    /**
     * getQuery make the ajax call to /programme a-z feed.
     */
    ProgrammeFinder.prototype.getQuery = function () {
        var _this = this,
            searchValue = _this.searchValue.value,
            queryEndPoint = 'http://www.bbc.co.uk/radio/programmes/a-z/by/'+ searchValue +'/current.json?page=1&limit=10';

        if( searchValue === ''){
          _this.queryResults.innerHTML = '';
          return;
        }

        _this.searchValue.classList.add('search__input--spinner');

        clearTimeout(this.timeout);

        this.timeout = window.setTimeout(function () {
          $.ajax( {
              type: 'GET',
              crossDomain: true,
              url: queryEndPoint,
              cache: true,
              dataType: 'json',
              success: function ( data ) {
                dataSuccess(data);
                _this.searchValue.classList.remove('search__input--spinner');

              },
              error: function ( error ) {
                dataError( error );
              }

          });

          function dataSuccess(data){

            if(!data){
              return;
            }

            //lets store the feed in an array so we can let the
            var items = [],
                template = Handlebars.compile( $( '#output-results' ).html() ),
                context = {
                  'programmes': items
                },
                html;

            data.atoz.tleo_titles.forEach( function( programme ) {
              items.push(programme.programme);
            });

            //Handlebars to update the view
            html = template( context );
            _this.queryResults.innerHTML = html;
            _this.error.innerHTML = '';
          }
        }, 1000);

        function dataError( error ){
          _this.error.innerHTML = _this.errorMsg;
          _this.searchValue.classList.remove('search__input--spinner');
        }
    };

    /**
     * addEvent is an helper function that addEventListener to an element
     * @param  {[type]}   el          HTMLelement
     * @param  {[type]}   typeOfevent Event
     * @param  {Function} fn          Function
     */
    ProgrammeFinder.prototype.addEvent = function ( el, typeOfevent ,fn ) {

      el.addEventListener( typeOfevent, function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        fn();
      });

    };


    return new ProgrammeFinder();
} )();
