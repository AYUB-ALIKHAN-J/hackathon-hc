
import Product from "../models/Product.js";

export const searchProducts = async (req, res) => {
    const searchQuery = req.query.query || "";
    console.log("Searching for products with query:", searchQuery); // Debugging log
  
    try {
      const products = await Product.find({
        productName: { $regex: searchQuery, $options: "i" },
      });
  
      console.log("Found products:", products); // Debugging log
      res.json(products);
    } catch (error) {
      console.error("Error while searching products:", error);
      res.status(500).json({ message: "Failed to search products", error });
    }
  };
  