

"use client";
import  { useEffect, useState } from "react";

import { client } from "@/sanity/lib/client"; // Make sure this path is correct
import { urlFor } from "@/sanity/lib/image"; // Make sure this path is correct



import React from "react";
import Image from "next/image";
interface Products {
  _id: string;
  title: string;
  _type: "product";
  imageUrl: string;
  price: number;
  description?: string;
}
export default function Cards() {

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
          <div className="md:mx-auto py-10 lg:py-0 px-10 lg:px-0 w-full h-auto lg:h-[1052px] md:max-w-[1124px] flex flex-col items-center justify-between sm:gap-20 md:gap-48 lg:gap-0">
            <div className="w-[300px] md:w-full flex flex-col items-center text-center gap-4 mb-14">
             
    
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
  // return (
  //   <>
  //     {/* conatiner  */}
  //     <div className="px-10 lg:px-0 mx-auto max-w-[1124px] h-auto xl:h-[1778px] flex flex-col py-12 gap-12">
  //       {/* cards container 1 */}
  //       <div className="lg:max-w-[1048px] md:max-w-[950px] h-auto xl:h-[488px] flex flex-wrap justify-center gap-[30px]">
  //         {/* card 1 */}


  //         {products.map((product)=>(          <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={product.imageUrl}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">{product.title}</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //         ))}

  //         {/* card 2 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product2.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //         {/* card 3 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product3.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //         {/* card 4 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product4.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //       </div>
  //       {/* cards container 2  */}
  //       <div className="lg:max-w-[1048px] md:max-w-[950px] h-auto xl:h-[488px] flex flex-wrap justify-center gap-[30px]">
  //         {/* card 1 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product5.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //         {/* card 2 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product6.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //         {/* card 3 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product7.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //         {/* card 4 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product8.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //       </div>
  //       {/* cards container 3  */}
  //       <div className="lg:max-w-[1048px] md:max-w-[950px] h-auto xl:h-[488px] flex flex-wrap justify-center gap-[30px]">
  //         {/* card 1 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product9.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //         {/* card 2 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product10.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //         {/* card 3 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product11.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //         {/* card 4 */}
  //         <div className="w-[238px] h-[488px]">
  //           <div className="relative">
  //             <Image
  //               src={"/Images/product12.jpeg"}
  //               alt="model"
  //               width={230}
  //               height={300}
  //               className="w-[239px] h-[300px]"
  //             />
  //           </div>
  //           <div className=" flex flex-col items-center justify-center gap-4 h-[188px]">
  //             <h3 className="text-[#252B42] font-[700]">Graphic Design</h3>
  //             <h4 className="text-[#737373] text-sm font-[700]">
  //               English Department
  //             </h4>
  //             <p>
  //               <span className="text-[#BDBDBD] font-[700]">$16.6</span>{" "}
  //               <span className="text-[#23856D] font-[700]">$6.48</span>
  //             </p>
  //             <Circles />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
