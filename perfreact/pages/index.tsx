import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

type Product = {
  id: number;
  price: number;
  title: string;
  priceFormatted: string;
}

type Result = {
  totalPrice: number;
  products: Product[];
};

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Result>({
    totalPrice: 0,
    products: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();
    console.log(data);

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product: Product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((total: number, product: Product) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, products });
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <>
      <Head>
        <title>PerfReact</title>
      </Head>
      <div>
        <h1>Search</h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        <SearchResults
          results={results.products}
          totalPrice={results.totalPrice}
          onAddToWishlist={addToWishlist}
        />
      </div>
    </>
  );
};

export default Home;
