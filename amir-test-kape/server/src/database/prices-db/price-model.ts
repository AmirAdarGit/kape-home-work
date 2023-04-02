import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  original: {
    essential: {
      USD: { type: Number, required: true }
    },
    advanced: {
      USD: { type: Number, required: true }
    },
    vpn_addon: {
      USD: { type: Number, required: true }
    }
  },
  offers: {
    essential: {
      USD: { type: Number, required: true }
    },
    advanced: {
      USD: { type: Number, required: true }
    },
    vpn_addon: {
      USD: { type: Number, required: true }
    }
  }
});

export const Prices = mongoose.model('Prices', priceSchema);