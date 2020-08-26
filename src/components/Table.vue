<template>
  <div>
    <table class="currencies">
      <thead>
        <tr>
          <th>#</th>
          <th>Šifra valute</th>
          <th>Valuta</th>
          <th>Država</th>
          <th>Jedinica</th>
          <th>Kupovni za devize</th>
          <th>Prodajni za devize</th>
          <th>Srednji za devize</th>
          <th>Datum primjene</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(item, index) in currencyData">
          <td>{{ index + 1 }}</td>
          <td>{{ item['Šifra valute'] }}</td>
          <td>{{ item.Valuta }}</td>
          <td>{{ item.Država }}</td>
          <td>{{ item.Jedinica }}</td>
          <td>{{ item['Kupovni za devize'] }}</td>
          <td>{{ item['Prodajni za devize'] }}</td>
          <td>{{ item['Srednji za devize'] }}</td>
          <td>{{ item['Datum primjene'] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  computed: {
    currencyData() {
      return this.$store.getters.currencyData;
    },
  },
  mounted() {
    this.$store.dispatch('getCurrencyData');
  },
};
</script>

<style scoped>
.currencies {
  border-collapse: collapse;
  width: 100%;
}

.currencies td,
.currencies th {
  border: 1px solid #ddd;
  padding: 8px;
}

.currencies tr:nth-child(even) {
  background-color: #f2f2f2;
}

.currencies tr:hover {
  background-color: #ddd;
}

.currencies th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #35495e;
  color: white;
}
</style>
