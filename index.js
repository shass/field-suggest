new Vue({
  el: "#app",

  data: () => ({
    name: '',
    showSuggest: true
  }),

  computed: {
    /**
    * Define what part of placeholder to show
    */
    formattedName() {
      let oneWord = /^[A-zА-яёЁ-]+$/;
      let twoWords = /^[A-zА-яёЁ-]+ [A-zА-яёЁ-]+$/;
      //let threeWords = /^(?:[A-zА-яёЁ]+ ){2}[A-zА-яёЁ]+$/;

      let field = this.$el.querySelector('.b-fields__name');
      this.$nextTick(() => {
        this.showSuggest = this.isTextOverflow(field);
      })

      this.name = this.capitalizeFirstLetter(this.name);

      return oneWord.test(this.name) ?
        this.name + ' Имя Отчество' :
        twoWords.test(this.name) ?
          this.name + ' Отчество' :
          this.name ?
            this.name :
            'Фамилия Имя Отчество';
    }
  },

  methods: {
    /**
    * Capitalize first letter of each word
    */
    capitalizeFirstLetter(str) {
      let splitChars = [' ', '-'];
      let normalizedName = str.toLowerCase();

      for (let splitChar of splitChars) {
        normalizedName = normalizedName.split(splitChar);

        for (let i = 0; i < normalizedName.length; i++) {
          normalizedName[i] = normalizedName[i].charAt(0).toUpperCase() + normalizedName[i].substring(1);
        }

        normalizedName = normalizedName.join(splitChar);
      }

      return normalizedName;
    },

    /**
    * Know if entered text is more than input width
    */
    isTextOverflow(field) {
      let fieldWidth = field.clientWidth;
      let fieldPaddingLeft = parseFloat(this.getElementPropertyValue(field, 'padding-left'));
      let fieldPaddingRight = parseFloat(this.getElementPropertyValue(field, 'padding-right'));
      let fieldInnerWidth = fieldWidth - fieldPaddingLeft - fieldPaddingRight;

      let span = this.$refs.calculation;
      let spanWidth = span.offsetWidth;

      return spanWidth <= fieldInnerWidth;
    },

    /**
    * Get any element property value
    */
    getElementPropertyValue(elm, property) {
      return window.getComputedStyle(elm, null).getPropertyValue(property)
    }
  }
})