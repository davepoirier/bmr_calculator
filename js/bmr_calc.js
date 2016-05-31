new Vue({
  el: '#app',
  data: {
    updating: false,
    bmr: 2018,
    displayBmr: 2018,
    weight: 150,
    gender: 'male',
    age: 34,
    height: 60,
    activity: [
      { name:'sedentary',
        value: 1.2
      },
      { name: 'light',
        value: 1.375
      },
      {
        name: 'moderate',
        value: 1.55
      },
      {
        name: 'active',
        value: 1.725
      },
      {
        name: 'very active',
        value: 1.9
      }
    ],
    selectedActivity: 2
  },
  watch: {
    displayBmr: function(newVal, oldVal) {
      this.updating = (newVal !== this.bmr);
    }
  },
  computed: {
    feet: function() {
      return parseInt(this.height/12);
    },
    inches: function() {
      return parseInt(this.height%12);
    },
    activityLabel: function() {
      return this.activity[this.selectedActivity-1].name;
    },
    isMale: function() {
      return this.gender === 'male';
    }
  },
  methods: {
    calcBmr: function() {
      if(this.gender === 'male') {
        this.bmr = ((4.5359 * parseFloat(this.weight)) + (15.875 * parseFloat(this.height)) - (5.0 * parseFloat(this.age)) + 5.0)
                   * this.activity[this.selectedActivity-1].value;
      } else {
        this.bmr = ((4.5359 * parseFloat(this.weight)) + ( 15.875 * parseFloat(this.height)) - ( 5.0 * parseFloat(this.age)) - 161.0)
                   * this.activity[this.selectedActivity-1].value;
      }
      this.bmr = Math.round(this.bmr);

      var difference = Math.abs(this.bmr - this.displayBmr);

      for(i=0; i < difference; i++) {
        this.updateDisplayBmr(i*0.5);
      }
    },
    updateDisplayBmr: function(speed) {
      var that = this;
      if(this.displayBmr > this.bmr){
        return setTimeout(function(){
          that.displayBmr -= 1
        }, speed);
      } else if(this.displayBmr < this.bmr){
        return setTimeout(function(){
          that.displayBmr += 1
        }, speed);
      }
    },
    setGender: function(el) {
      this.gender = el.currentTarget.className.includes('female') ? 'female' : 'male';
      this.calcBmr();
      return this.gender;
    }
  }
});