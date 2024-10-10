import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Basket } from '../features/modules/Basket';

type StoreContextValue = {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quanity: number) => void;
};

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export function useStoreContext() {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error('we are not inside a provider');
  }

  return context;
}

export function StoreProvider({ children }: PropsWithChildren) {
  const [basket, setBasket] = useState<Basket | null>(null);

  function removeItem(productId: number, quanity: number) {
    if (!basket) {
      return;
    }

    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId == productId);

    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quanity;

      if (items[itemIndex].quantity === 0) {
        items.splice(itemIndex, 1);
      }

      setBasket((prev) => {
        return { ...prev!, items };
      });
    }
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
