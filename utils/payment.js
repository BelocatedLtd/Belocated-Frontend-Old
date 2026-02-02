import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const makePayment = (amount, email, phone, fullname, title, desc) => {
    const config = {
        public_key: import.meta.env.VITE_FLUTTER_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: email,
          phone_number: phone,
          name: fullname,
        },
        customizations: {
          title: title,
          description: desc,
        },
      };

      const fwConfig = {
        ...config,
        text: 'Fund wallet',
        callback: (response) => {
           //console.log(response);
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
      };
    
     useFlutterwave(config)
}

export default makePayment