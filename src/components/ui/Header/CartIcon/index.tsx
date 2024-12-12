import { CartIcon as Icon } from "../../../../../public/icons";

interface CartIconProps {
  iconClassName?: string;
  quantity?: number;
}

const CartIcon = (props: CartIconProps) => {
  const { iconClassName, quantity } = props;

  const renderContent = () => {
    if (!quantity) return <></>;

    if (quantity === 0) return <></>;

    return (
      <div className="px-1 py-0 rounded-full bg-red-60 text-white font-bold text-xs absolute right-0 top-0 flex items-center justify-center">
        {quantity}
      </div>
    );
  };

  return (
    <div className="relative">
      {renderContent()}
      <Icon className={iconClassName} />
    </div>
  );
};

export default CartIcon;
