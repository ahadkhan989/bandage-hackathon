

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client"; // Make sure this path is correct
import { urlFor } from "@/sanity/lib/image"; // Make sure this path is correct

interface Products {
  _id: string;
  title: string;
  _type: "product";
  imageUrl: string;
  price: number;
  description?: string;
}

export default function HeroCards() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Products[] = await client.fetch(`*[_type=="product"] {
          _id,
          title,
          price,
          "imageUrl": productImage.asset._ref
        }`);

        const productsWithImageUrls = fetchedProducts.map((product) => {
          if (product.imageUrl) {
            const imageUrl = urlFor(product.imageUrl).url();
            return { ...product, imageUrl };
          }
          return product; // Return product if it has no Image
        });

        setProducts(productsWithImageUrls);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error, e.g., display a message to the user
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <div className="md:mx-auto py-10 lg:py-0 px-10 lg:px-0 w-full h-auto lg:h-[1252px] md:max-w-[1124px] flex flex-col items-center justify-between sm:gap-20 md:gap-48 lg:gap-0">
        <div className="w-[300px] md:w-full flex flex-col items-center text-center gap-4 mb-14">
          <h4 className="text-xl text-[#737373] font-[400]">Featured Products</h4>
          <h3 className="text-2xl text-[#252B42] font-[700]">BESTSELLER PRODUCTS</h3>
          <p className="text-[#737373] text-sm">
            Problems trying to resolve the conflict between
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Added grid */}
            {products.map((product) => (
              <div key={product._id} className="border p-4 rounded"> {/* Added border and padding */}
                {product.imageUrl && (
                  <div className="relative h-64 w-full mb-2"> {/* Added relative wrapper for Image */}
                    <Image
                      src={product.imageUrl}
                      alt={product.title || "product_image"}
                      fill // Use fill for responsive images in container
                      style={{ objectFit: "cover" }} // Use objectFit to control image scaling
                    />
                  </div>
                )}
                <h4 className="text-lg font-semibold">{product.title}</h4>
                <p className="text-gray-600">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
