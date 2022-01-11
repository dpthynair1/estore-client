import axios from 'axios'

// Create Product
export const createProduct = async (product,authtoken) =>
await axios.post(`${process.env.REACT_APP_API}/product`, product,{
    headers: {
        authtoken
    }
})

// List Products by count  
export const getProductsByCount = async (count) =>
await axios.get(`${process.env.REACT_APP_API}/products/${count}`)

// Remove product
export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

// List a product 
export const getProduct = async (slug) =>
await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)


// Update product
export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

  // List product and sort

  // export const getProducts = async (sort,order,limit) =>
  // await axios.post(`${process.env.REACT_APP_API}/products`, {
  //   sort,
  //   order,
  //   limit
  // })

  export const getProducts = async (sort,order,page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page
  })


  
  // get total products
  export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`)

  //Product Rating

  export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

  // Get related products
  export const getRelatedProducts = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

  // Get products by search

  export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);


