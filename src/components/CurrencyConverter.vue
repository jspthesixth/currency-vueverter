<template>
  <div class="container">
    <button
      @click="toggleSelection"
      :class="selection === 'hrkToX' ? 'btn selected' : 'btn'"
      id="hrkToX"
    >
      Convert HRK => X
    </button>
    <button
      @click="toggleSelection"
      :class="selection === 'xToHrk' ? 'btn selected' : 'btn'"
      id="xToHrk"
    >
      Convert X => HRK
    </button>
    <div v-if="optionSelected">
      <div v-if="selection === 'hrkToX'">
        <input
          @keyup.enter="convertInput"
          type="number"
          value="inputAmount"
          v-model="inputAmount"
        />
        <select>
          <option disabled selected="HRK">HRK</option>
        </select>
        <input type="number" v-model="outputAmount" disabled />
        <select v-model="selectedCurrency">
          <option :key="option" v-for="option in Object.keys(exchangeRates)">{{
            option
          }}</option>
        </select>
        <input @click="convertInput" type="submit" value="Convert" />
      </div>
      <div v-else>
        <input
          @keyup.enter="convertInput"
          type="number"
          value="inputAmount"
          v-model="inputAmount"
        />
        <select v-model="selectedCurrency">
          <option :key="option" v-for="option in Object.keys(exchangeRates)">{{
            option
          }}</option>
        </select>
        <input type="number" v-model="outputAmount" disabled />
        <select>
          <option disabled selected="HRK">HRK</option>
        </select>
        <input @click="convertInput" type="submit" value="Convert" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionSelected: false,
      selection: null,
      inputAmount: '',
      outputAmount: '',
      exchangeRates: {},
      selectedCurrency: 'EUR' //Default selected currency
    };
  },
  methods: {
    convertInput() {
      if (this.selection === 'hrkToX') {
        const convertedValue = (
          this.inputAmount / this.exchangeRates[this.selectedCurrency]
        ).toFixed(2);
        this.outputAmount = convertedValue;
      } else {
        const convertedValue = (
          this.inputAmount * this.exchangeRates[this.selectedCurrency]
        ).toFixed(2);
        this.outputAmount = convertedValue;
      }
    },
    toggleSelection(e) {
      this.optionSelected = true;
      if (this.selection !== e.target.id) {
        this.inputAmount = '';
        this.outputAmount = '';
      }
      this.selection = e.target.id;
    },
    makeExchangeRates(data) {
      const dataLength = Object.keys(data).length;
      const options = data.map(item => item.Valuta);
      const rates = [];
      for (let i = 0; i < dataLength; i++) {
        if (data[i].Jedinica > 1) {
          const fixedRate = (
            data[i]['Srednji za devize'].replace(',', '.') / data[i].Jedinica
          ).toFixed(6);
          rates.push(fixedRate);
        } else {
          rates.push(data[i]['Srednji za devize'].replace(',', '.'));
        }
      }
      let exchangeRates = {};
      exchangeRates = Object.assign(
        ...options.map((k, i) => ({ [k]: rates[i] }))
      );
      this.exchangeRates = exchangeRates;
    }
  },
  async mounted() {
    await this.$store.dispatch('getCurrencyData');
    const data = this.$store.getters.currencyData;
    this.makeExchangeRates(data);
  }
};
</script>

<style scoped>
.container {
  margin-top: 10px;
}

.btn {
  background-color: #35495e;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.selected {
  background-color: #42b883;
}

input[type='number'] {
  width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select {
  width: 4%;
  padding: 12px 10px;
  margin: 8px 2px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type='submit'] {
  padding: 12px 20px;
  margin: 8px 0;
  cursor: pointer;
}
</style>
