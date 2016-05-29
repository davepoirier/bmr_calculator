new Vue({
  el: '#app',
  data: {
    bmr: 1468,
    weight: 150,
    gender: 'male',
    age: 34,
    height: 60,
    activity: [
      { name:'sedentary',
        value: 1200
      },
      { name: 'light',
        value: 1375
      },
      {
        name: 'moderate',
        value: 1550
      },
      {
        name: 'active',
        value: 1725
      },
      {
        name: 'super active',
        value: 1900
      }
    ],
    selectedActivity: 2
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
      if(this.weight && this.feet && this.age) {
        if(this.gender === 'male') {
          this.bmr = (4.5359 * parseFloat(this.weight)) + (15.875 * parseFloat(this.height)) - (5.0 * parseFloat(this.age)) + 5.0;
        } else {
          this.bmr = (4.5359 * parseFloat(this.weight)) + ( 15.875 * parseFloat(this.height)) - ( 5.0 * parseFloat(this.age)) - 161.0;
        }
      } else {
        this.bmr = 0;
      }
      return this.bmr = Math.round(this.bmr);
    },
    setGender: function(el) {
      this.gender = el.currentTarget.className.includes('female') ? 'female' : 'male';
      console.log(this.gender);
      this.calcBmr();
      return this.gender;
    }

  }
});