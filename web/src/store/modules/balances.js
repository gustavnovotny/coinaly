import axios from '../../axios'
import pickBy from 'lodash/pickBy'
import numeral from 'numeral'

function filterFilledCurrencies (currencies) {
  return pickBy(currencies, (currency, currencyName) => {
    return currency.total > 0
  })
}

export default {
  namespaced: true,
  state: {
    currencies: [],
    isLoading: false,
    hasError: false,
    worth: []
  },
  mutations: {
    addAll (state, items) {
      delete items.info
      state.currencies = items
    },
    startLoading (state) {
      state.isLoading = true
    },
    stopLoading (state) {
      state.isLoading = false
    },
    setError (state) {
      state.hasError = true
    },
    removeError (state) {
      state.hasError = false
    },
    setWorth (state, payload) {
      state.worth = payload
    }
  },
  getters: {
    allWorth: state => {
      return state.worth
    },
    totalWorth: state => {
      const worths = Object.values(state.worth)
      if (worths.length) {
        const total = worths.reduce((total, worth) => total + worth.usd, 0).toFixed(2)
        return numeral(total).format('$0,0.00')
      } else {
        return null
      }
    },
    allCurrencies: state => {
      return state.currencies
    },
    allCurrenciesTotal: state => {
      return Object.keys(state.currencies).length
    },
    allFilledCurrencies: state => {
      return filterFilledCurrencies(state.currencies)
    },
    allFilledCurrenciesTotal: state => {
      return Object.keys(filterFilledCurrencies(state.currencies)).length
    },
    isLoading: state => {
      return state.isLoading
    }
  },
  actions: {
    getAll (context) {
      context.commit('startLoading')
      return axios.get(`balances`)
      .then(response => {
        context.commit('addAll', response.data)
      })
      .finally(() => {
        context.commit('stopLoading')
      })
    }
  }
}
