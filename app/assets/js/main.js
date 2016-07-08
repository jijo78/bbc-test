(function () {
  /**
   * This is the TextReader constructor
   * @constructor
   * @this {TextReader}
   */
    function TextReader() {
      var _this = this;

      //global elements.
      this.textArea = document.querySelector('#paragraph-input');
      this.formContainer = document.querySelector('.form-container');
      this.tableContainer = document.querySelector('.output-table');
      this.tBody = document.querySelector('.output-text-container');
      this.outputContainerHeader = document.querySelector('.output-header');
      this.resetBtn = document.querySelector('.btn-rst');
      this.inputBtn = document.querySelector('.btn-submit');

      //function calls
      this.validateAndSubmit();
      this.resetBtn.addEventListener('click',_this.resetForm.bind(this), false);
    }

    TextReader.prototype.resetForm = function (){
      var _this = this;

      if(_this.outputContainerHeader || this.tBody){
        _this.outputContainerHeader.innerHTML = '';
        _this.tBody.innerHTML = '';
      }

      _this.formContainer.reset();
      _this.inputBtn.disabled = false;
    };

    /**
     * textAreaValue function .
     */
    TextReader.prototype.output = function () {
      var _this = this,
          textAreaValue =  this.textArea.value,
          sortAlphabetically = textAreaValue.split(' ').sort(),
          i = 0,
          j = 0,
          initial = ['a','b','c','d'],
          row = this.tBody.insertRow(0),
          count = {};

          // item      = sortAlphabetically[ i ],
          // firstChar = item.charAt( 0 ),
          // outputContainerHeaderTh = document.createElement('th');
          sortAlphabetically.forEach(function(i){
            count[i] = (count[i]||0)+1;
          });
          for (var key in count){
            console.log(key, count[key], key.length);
            row.insertCell(0).innerHTML = key + '' +count[key].toString();
            _this.appendContent(_this.tBody, row);
          }
    };

    /**
     * validateAndSubmit form element based on two type of validation.
     * validateInput function check if we enter only letters.
     * validateWordCount function
     */
    TextReader.prototype.validateAndSubmit = function(){
      var _this = this,
          error = document.querySelector('.error'),
          errorMsg = 'Please make sure you enter only alpha characters and at least 5 words.';

      //form submit upon checking if input it is valid.
      _this.formContainer.addEventListener('submit',validateInput,false);


      function validateInput(e){
        e.preventDefault();
         var isValid;
         //lets test that only alpha characters are entered.
         var regex=/^[a-z]/gi;
         if (_this.textArea.value.match(regex)){
              validateWordCount();
              //error.innerHTML = ' ';
              isValid = true;
          }else{
            error.innerHTML = errorMsg;
            isValid = false;
          }
        return isValid;
      }

      function validateWordCount(){
          var input = _this.textArea.value;
              // remove all extra spaces (double spaces etc)
              input = input.replace(/(^\s*)|(\s*$)/gi,'');
              // if two words together count as one
              input = input.replace(/[ ]{2,}/gi,'' );
              input = input.replace(/\n /,'\n');
              let specChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;

          if (input.split(' ').length+1 <= 5 || input ==='') {
              error.innerHTML = errorMsg;
          }else if (input.split(' ').length >= 500 ) {
              error.innerHTML = 'Please make sure you enter no more than 500 words.';
          }else {
            _this.output();
            _this.inputBtn.disabled = true;

            // var specCharsCount = input.match(specChars);
            //
            // var counts = {};
            // specCharsCount.forEach(function(x) {
            //   counts[x] = (counts[x] || 0)+1;
            // });
            // specCharsCount.forEach(function(word, i,a,v) {
            //   console.log(a[i].length);
            // });
          }
      }
    };

    /**
     * Append HTMLelement.
     * @param {object} parent - HTMLElement to be appended to.
     * @param {object} content - HTMLElement to be appended parent.
     */
    TextReader.prototype.appendContent = function ( parent, content ) {
        return parent.appendChild( content );
    };

    /**
     * remove HTMLelement.
     * @param {object} parent - HTMLElement parent of the element to be removed.
     */
    TextReader.prototype.removeContent = function ( parent ) {
      for(var i =0; i< parent.childNodes.length; i++){
        parent.childNodes[i].remove();
      }
    };

    return  new TextReader();
} )();
