import React from "react";
import close from "../assets/close.svg";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import {
  fundUserWallet,
  getUserWallet,
  selectUserWallet,
} from "../redux/slices/walletSlice";
import { useEffect } from "react";
import {
  createNewAdvert,
  selectIsLoading,
  selectIsSuccess,
  selectIsError,
} from "../redux/slices/advertSlice";
import io from "socket.io-client";
import { BACKEND_URL } from "../../utils/globalConfig";
import { createAdvert } from "../services/advertService";
import { toast } from "react-hot-toast";

const socket = io.connect(`${BACKEND_URL}`);

const PaymentMethod = ({ togglePaymentSelect, formData, captionArray }) => {
  const dispatch = useDispatch();
  const [canPay, setCanPay] = useState(false); 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const wallet = useSelector(selectUserWallet);

  const getWallet = async () => {
    await dispatch(getUserWallet());
  };

  useEffect(() => {
    getWallet();
  }, [dispatch]);

  const {
    platform,
    service,
    adTitle,
    desiredROI,
    costPerTask,
    earnPerTask,
    gender,
    state,
    lga,
    imageArray,
    socialPageLink,
    expBudget,
  } = formData;

  useEffect(() => {
    if (wallet?.value >= expBudget) {
      setCanPay(true);
    } else if (wallet?.value < expBudget) {
      setCanPay(false);
    }
  }, [wallet, expBudget]);

  const title = `Buy ${desiredROI} ${platform} ${service}`;

  //Append and prepare form data for transport
  const paymentFormData = new FormData();

  for (let i = 0; i < imageArray?.length; i++) {
    paymentFormData.append("images", imageArray[i]);
  }
  paymentFormData.append("platform", platform);
  paymentFormData.append("service", service);
  paymentFormData.append("adTitle", adTitle);
  paymentFormData.append("desiredROI", desiredROI);
  paymentFormData.append("gender", gender);
  paymentFormData.append("state", state);
  paymentFormData.append("lga", lga);
  paymentFormData.append("userId", user.id);
  paymentFormData.append("costPerTask", costPerTask);
  paymentFormData.append("earnPerTask", earnPerTask);
  paymentFormData.append("socialPageLink", socialPageLink);
  // Loop through captionArray and append each caption
  captionArray.forEach((caption, index) => {
    paymentFormData.append(`caption[${index}]`, caption);
  });
  paymentFormData.append("adAmount", expBudget);

  //make payment from available wallet fund
  const handlePayment = async (e) => {
    e.preventDefault();

    // for (var pair of paymentFormData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1])
    // }
    // return

    if (canPay) {
      //const response = await dispatch(createNewAdvert(adFormData))

      setIsLoading(true);
      const response = await createAdvert(paymentFormData);
      //console.log(response);
      setIsLoading(false);

      if (response) {
        //Emit socket io event to the backend
        const emitData = {
          userId: user?.id,
          action: `@${user?.username} just created an Ad for ${platform}`,
        };

        //Emit Socket event to update activity feed
        socket.emit("sendActivity", emitData);

        navigate("/dashboard/campaign-stats");
      }
      if (!response) {
        toast.error("Error creating advert, failed to make payment");
        navigate("/dashboard/campaign-stats");
        togglePaymentSelect();
      }
    } else {
      toast.error("Insufficient fund, fund your wallet");
    }
  };

  // Fund wallet using flutterwave
  const config = {
    public_key: import.meta.env.VITE_FLUTTER_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: expBudget,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user.email,
      phone_number: user.phone,
      name: user.fullname,
    },
    customizations: {
      title: title,
      description: "Advert creation",
    },
  };

  // const handleclick = () => {
  //     console.log(payment__key )
  // }

  const fwConfig = {
    ...config,
    text: "Fund Wallet",
    callback: async (response) => {
      const trxData = {
        userId: user.id,
        email: response?.customer?.email,
        date: response.created_at,
        chargedAmount: response.charged_amount,
        trxId: response.transaction_id,
        paymentRef: response.flw_ref,
        status: response.charge_response_message,
      };

      await dispatch(fundUserWallet(trxData));

      closePaymentModal();
    },
    onClose: () => {
      navigate(-1);
    },
  };

  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="relative modal w-[85%] h-fit md:w-[600px] md:h-[550px] bg-primary">
        <img
          src={close}
          alt="close"
          onClick={togglePaymentSelect}
          size={40}
          className="absolute top-[-1rem] right-[-1rem] text-tertiary"
        />
        <div className="w-full px-[2rem] py-[1.5rem] md:px-[3rem] md:py-[4rem]">
          <h1 className="font-bold mb-3 text-xl">Hello Payment Method</h1>
          <div className="mb-5 border-b border-gray-200 pb-6">
            <h3 className="font-bold mb-2 text-lg text-gray-700">
              100% Secure, Reliable & Fast Payment{" "}
            </h3>
            <small className="text-gray-700">
              Pay through our highly secured online payment partner using your
              masterCard/VISA/Verve card. Bank transfer via USSD or internet
              bank transfer. You can select your preferred online payment method
              on the payment checkout page that comes up.
            </small>
          </div>

          <div className=" flex flex-col">
            <h3 className="font-bold text-lg text-gray-700">
              Pay with your Wallet{" "}
            </h3>
            <small className="font-bold mt-2">
              Wallet Balance: ₦{wallet?.value}
            </small>

            {!canPay && (
              <div className="flex flex-col justify-center">
                <p className="bg-red-400 text-primary p-5 my-3">
                  Your wallet is insufficient to perform this transaction. Click
                  the button below to fund your wallet now
                </p>
                <FlutterWaveButton
                  {...fwConfig}
                  className="px-6 py-2 bg-secondary text-primary"
                />
                {/* <button onClick={handleclick}>Pay</button> */}
              </div>
            )}
            {canPay && (
              <div className="flex flex-col justify-center">
                <p className="bg-secondary text-primary p-5 my-3">
                  Pay for this advert with the funds in your wallet. Click the
                  button below to pay
                </p>
                <button
                  onClick={handlePayment}
                  className="px-6 py-2 bg-red-400 text-primary text-center"
                >
                  {!isLoading && `Pay ₦${expBudget}`}
                  {isLoading && "Creating Ad..."}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("backdrop")
  );
};

export default PaymentMethod;
