"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
  finalPrice: () => number;
  handleApproveOrderPaypal: () => void;
}
export const Paypal = (props: Props) => {
  const { finalPrice, handleApproveOrderPaypal } = props;

  return (
    <div>
      <PayPalButtons
        key={finalPrice()}
        style={{ layout: "horizontal" }}
        createOrder={(data: any, actions: any) => {
          console.log(data);
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: finalPrice(),
                  currency_code: "USD",
                },
                description: "Hình thức thanh toán",
              },
            ],
          });
        }}
        onApprove={async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log(order);
          handleApproveOrderPaypal();
        }}
        onError={(err: any) => {
          console.log(err);
        }}
      />
    </div>
  );
};
