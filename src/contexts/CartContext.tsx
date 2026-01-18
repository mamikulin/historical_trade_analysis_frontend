import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartInfo {
  request_id: number;
  entries_count: number;
}

type CartContextValue = {
  cart: CartInfo;
  refresh: () => Promise<CartInfo>;
  fetchOnPageEnter: () => Promise<CartInfo>;
  fetchOnClick: () => Promise<CartInfo>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartInfo>({ request_id: 0, entries_count: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchCartInfo = async (): Promise<CartInfo> => {
    try {
      const response = await fetch('/api/trade-analysis/cart', {
        mode: 'cors'
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn('[API] error fetching cart info:', response.status, errorText);
        return { request_id: 0, entries_count: 0 };
      }

      const data: CartInfo = await response.json();
      return data;
    } catch (err) {
      console.warn('[API] error fetching cart info', err);
      return { request_id: 0, entries_count: 0 };
    }
  };

  // Загружаем корзину только один раз при монтировании
  useEffect(() => {
    if (!isInitialized) {
      fetchCartInfo().then((info) => {
        setCart(info);
        setIsInitialized(true);
      });
    }
  }, [isInitialized]);

  // Защита от одновременных запросов
  let currentFetch: Promise<CartInfo> | null = null;

  const doFetch = (): Promise<CartInfo> => {
    if (currentFetch) {
      return currentFetch;
    }

    currentFetch = (async () => {
      const info = await fetchCartInfo();
      setCart(info);
      return info;
    })();

    currentFetch.then(() => {
      currentFetch = null;
    });

    return currentFetch;
  };

  const refresh = async () => {
    return await doFetch();
  };

  const fetchOnPageEnter = async () => {
    return await doFetch();
  };

  const fetchOnClick = async () => {
    return await doFetch();
  };

  return (
    <CartContext.Provider value={{ cart, refresh, fetchOnPageEnter, fetchOnClick }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

export default CartContext;
