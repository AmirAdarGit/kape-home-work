import { IPlan } from "./interfaces";

export const plans: Array<IPlan> = [
  {
    type: 'Extended',
    buttonNowType: 'filled',
    title: "Extended Protection",
    subTitle: "Online Privacy And Windows PC Antivirus",
    price: null,
    oldPrice: null,
    isBestValue: false,
    discountPercentage: null,
    monthlyPayment: null,
    infoList:
      {
        label: "Extended protection includes",
        moreInfo: [
          {
            infoTitle: "2 years protection",
            moreInfo: "",
            isMarked: false,
            isBold: false
          },
          {
            infoTitle: "Essential Protection Plan",
            moreInfo: "",
            isMarked: true,
            isBold: false
          },
          {
            infoTitle: "Advanced Protection Plan",
            moreInfo: "",
            isMarked: true,
            isBold: false
          }
        ]
      }

  },
  {
    type: 'Advanced',
    buttonNowType: 'empty',
    title: "Advanced Protection",
    subTitle: "Online Privacy Features",
    price: null,
    oldPrice: null,
    isBestValue: false,
    discountPercentage: null,
    monthlyPayment: null,
    infoList:
      {
        label: "Advanced protection includes",
        moreInfo: [
          {
            infoTitle: "Essential Protection Plan",
            moreInfo: "",
            isMarked: true,
            isBold: false
          },
          {
            infoTitle: "Secure Wi-Fi protection:",
            moreInfo: "Secure your connection when connected to public Wi-Fi of low security networks",
            isMarked: false,
            isBold: false
          },
          {
            infoTitle: "Protect your Privacy:",
            moreInfo: "Keep your personal data safe & privet",
            isMarked: false,
            isBold: false
          },
          {
            infoTitle: "Browse without boundaries:",
            moreInfo: "Intego VPN opens up the web for streaming & browsing",
            isMarked: false,
            isBold: false
          }
        ]
      }

  },
  {
    type: 'Essential',
    buttonNowType: 'empty',
    title: "Essential Protection",
    subTitle: "Online Privacy And Windows PC Antivirus",
    price: null,
    oldPrice: null,
    isBestValue: false,
    discountPercentage: null,
    monthlyPayment: null,
    infoList:
      {
        label: "Essential protection includes",
        moreInfo: [
          {
            infoTitle: "Powerful malware engine:",
            moreInfo: "Adaptive, real-time malware engine monitors and eliminates threats before they reach your PC",
            isMarked: false,
            isBold: false
          },
          {
            infoTitle: "Easy to use, easy on your PC:",
            moreInfo: "intuitive and simple UI with light, customizable scans",
            isMarked: false,
            isBold: false
          },
          {
            infoTitle: "100% malware immunity:",
            moreInfo: "Independent lab tests show that Intego eradicates 100% of malware",
            isMarked: false,
            isBold: false
          },
          {
            infoTitle: "Ransomware protection:",
            moreInfo: "Protects your personal data from being hacked and encrypted for a ransom",
            isMarked: false,
            isBold: false
          }
        ]
      }

  }
]
