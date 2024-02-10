import React from "react";
import ReactDOM from "react-dom";


export const ContBotonPago = ({price = 0}) => {
  /*const [price, setPrice] = useState(0);

  useEffect(() => {
      setPrice(price);
  }, [price]);*/
  if (typeof window !== "undefined") {
    // Importa PayPalButton solo en un entorno de navegador
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  }
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price
          }
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture(handlePay());
  };

  function handlePay() {
    alert("el pago ha sido exitoso desde la web");
    console.log("el pago ha sido exitoso desde la web");
    //window.location.href = "https://portfolio-arcodez.vercel.app";
  }

  return (
    <center>
        <h1>Total a pagar: ${price}</h1>
        <br />
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
    </center>
  );
}