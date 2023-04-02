import { Price } from "./price-model";


export const createNewTable = async () => {
  try {
    const prices = new Price({
      original: {
        essential: {
          USD: "49.99"
        },
        advanced: {
          USD: "80.99"
        },
        vpn_addon: {
          USD: "19.99"
        }
      },
      offers: {
        essential: {
          USD: "29.99"
        },
        advanced: {
          USD: "69.99"
        },
        vpn_addon: {
          USD: "19.99"
        }
      }
    });

    await prices.save();
    console.log('Prices saved successfully.');
  } catch (err) {
    console.error('Error saving prices:', err);
  }
}

