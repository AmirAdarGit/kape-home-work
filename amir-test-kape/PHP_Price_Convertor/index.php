<?php
class PriceConverter
{
    private $currency;
    private $price;
    private $supportedCurrencies = array(
        'USD', 'JPY', 'GBP', 'EUR', 'CAD', 'AUD', 'SEK', 'SGD', 'MXN',
        'NZD', 'DKK', 'BRL', 'NOK', 'HKD', 'CLP', 'THB', 'ZAR', 'INR', 'COP'
    );

    public function __construct($price, $currency)
    {
        $this->price = $price;
        $this->currency = strtoupper($currency);
    }

    public function convert()
    {
        if (!in_array($this->currency, $this->supportedCurrencies)) {
            return $this->formatPrice($this->price, 'USD');
        }

        $url = "https://api.apilayer.com/exchangerates_data/convert?to={$this->currency}&from=USD&amount={$this->price}";

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_URL, $url); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  

        $headers = [
            'Content-Type: application/json',
            'apikey: p7gEfkBKzHzUzsFl43sNp03FUcLVC5b2'
        ];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        curl_close($ch);
        $array = json_decode($response, true);
        $convertAmount = $array['result'];

        if ($convertAmount >= 10 && $convertAmount < 1000) {
            $finalNumber = ceil($convertAmount) - 0.01;
        } else if ($convertAmount >= 1000 && $convertAmount < 10000) {
            $finalNumber = (floor($convertAmount / 10) * 10) + 10;
        } else {
            $finalNumber = (floor($convertAmount / 100) * 100) + 100;
        }
        return $this->formatPrice($finalNumber, $this->currency);
    }

    private function formatPrice($price, $currency)
    {
        $symbol = '';
        switch ($currency) {
            case 'USD':
                $symbol = '$';
                break;
            case 'JPY':
                $symbol = '¥';
                break;
            case 'GBP':
                $symbol = '£';
                break;
            case 'EUR':
                $symbol = '€';
                break;
            case 'CAD':
            case 'AUD':
            case 'MXN':
            case 'NZD':
            case 'SGD':
            case 'HKD':
            case 'USD':
                $symbol = '$';
                $price = number_format($price, 2, '.', '');
                break;
            case 'SEK':
            case 'DKK':
            case 'NOK':
            case 'THB':
                $symbol = 'kr';
                $price = number_format($price, 2, '.', '');
                break;
            case 'BRL':
                $symbol = 'R$';
                $price = number_format($price, 2, '.', '');
                break;
            case 'CLP':
            case 'COP':
                $symbol = '$';
                $price = number_format($price, 0, '', '.');
                break;
            case 'ZAR':
                $symbol = 'R';
                $price = number_format($price, 0, '', '');
                break;
            case 'INR':
                $symbol = '₹';
                $price = number_format($price, 0, '', '');
                break;

        }
        return $symbol . $price;
    }
}

$priceConverter = new PriceConverter(2933, 'ZAR');
echo $priceConverter->convert();
?>
